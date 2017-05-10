'use strict';

const http = require('http');
const app = require('./server/koa');
const logFactory = require('koa2-middleware-slacker/utils/log-factory');
const proxy = require('./server/koa/proxy');
const cfgFactory = require('./server/utils/cfg-factory');
const cfgPath = require('./server/utils/cfg-constants');

logFactory.setDir(cfgPath.logsDir);
logFactory.configure(cfgPath.logsCfg);

const serverCfg = cfgFactory.getConfig('server');
const appLog = logFactory.getLogger('app');
const port = serverCfg.server.port;
const server = http.createServer(proxy(app));

server.on('error', (error) => {
  appLog.error('服务器异常：', error);
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      appLog.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      appLog.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});
server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  appLog.info('Listening on ' + bind);
  console.log('Listening on ' + bind);
});

server.listen(port);
