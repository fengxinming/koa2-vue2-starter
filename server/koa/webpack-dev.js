'use strict';

const webpack = require('webpack');
const koaWebpack = require('koa-webpack');
const cfgConstants = require('../utils/cfg-constants');
const buildConfig = require('../../build/config');
const clientConfig = require('../../build/webpack.dev');
const cfgFactory = require('../utils/cfg-factory');

const serverConfig = cfgFactory.getConfig('server');
const LogPlugin = require('../../build/plugins/dev-log-plugin');

module.exports = function setupDevServer(app, router) {
  clientConfig.entry.client = [
    'webpack-hot-middleware/client?reload=true',
    clientConfig.entry.client
  ];
  clientConfig.plugins.push(new LogPlugin(serverConfig.server.port));

  const clientCompiler = webpack(clientConfig);
  const middleware = koaWebpack({
    compiler: clientCompiler,
    dev: {
      quiet: true,
      stats: {
        colors: true,
        chunks: false
      }
    }
  });
  app.use((ctx, next) => {
    ctx.state.env = cfgConstants.NODE_ENV;
    ctx.state.reload = true;
    return next();
  });
  app.use(middleware);
  const devMiddleWare = middleware.dev;
  const mfs = devMiddleWare.fileSystem;
  const file = buildConfig.outputIndexPath;

  devMiddleWare.waitUntilValid();
  // clientCompiler.plugin('done', () => {
  //   const fs = devMiddleWare.fileSystem;
  //   const filePath = path.join(clientConfig.output.path, '../index.html');
  //   if (fs.existsSync(filePath)) {
  //     const index = fs.readFileSync(filePath, 'utf-8');
  //   }
  // })

  // 加载services服务
  // const allServices = require('../services');
  router.get(
    '*',
    (ctx) => {
      devMiddleWare.waitUntilValid(() => {
        const html = mfs.readFileSync(file);
        ctx.type = 'text/html; charset=utf-8';
        ctx.body = html;
      });
    }
  );
};
