'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');
const mount = require('koa-mount');
const Router = require('koa-trie-router');
const send = require('koa-send');

// function responseTime(res, start) {
//   const delta = Math.ceil(Date.now() - start);
//   res.setHeader('X-Response-Time', delta + 'ms');
// }

module.exports = (app) => {

  const config = require('../../conf/server');

  const idDev = config.NODE_ENV === 'development';

  const router = new Router();

  const routerPath = path.resolve(__dirname, '../routes');

  const routes = fs.readdirSync(routerPath) || [];

  routes.forEach((file) => {
    const fileNameParser = path.parse(file);
    if (fileNameParser.ext === '.js') {
      const fn = require(path.join(routerPath, file));
      if (util.isFunction(fn)) {
        fn(router);
      }
    }
  });

  // 如果是开发环境就启动热加载
  if (idDev) {
    app.use(mount(config.locals.TEST_PATH, (ctx) => {
      ctx.body = require(path.join(__dirname, '../test-api', ctx.url.replace(ctx.search, '')));
    }));
    require('./webpack-dev')(app, router);
  } else {
    router.get((ctx) => {
      return send(ctx, '/assets/index.html', {
        root: config.app.staticDir
      });
    });
  }
  app.use(router.middleware());
};
