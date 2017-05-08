'use strict';
const fs = require('fs');
const log4js = require('log4js');
const koaLog4 = require('koa-log4');

const config = require('../../conf/server').app;

/*
 * 日志对象获取
 */
class Log {
  constructor() {
    this.logs = {};
    // 创建日志文件夹
    const dir = config.logsDir;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    log4js.configure(config.confDir + '/log4js.json');
    this.connectLogger = this.connectLogger.bind(this);
  }
  getLogger(name) {
    const logs = this.logs;
    return !name ? this : (logs[name] || (logs[name] = log4js.getLogger(name)))
  }
  connectLogger(name) {
    return koaLog4.koaLogger(this.getLogger(name), { level: 'auto' });
  }
}

const instance = new Log();
module.exports = instance;
