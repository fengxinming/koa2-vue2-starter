'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const mount = require('koa-mount');
const Router = require('koa-router');

// function responseTime(res, start) {
//   const delta = Math.ceil(Date.now() - start);
//   res.setHeader('X-Response-Time', delta + 'ms');
// }

module.exports = (app) => {

  const cfgFactory = require('../utils/cfg-factory');

  const localsConfig = cfgFactory.getConfig('locals');

  const cfgPath = require('../utils/cfg-constants');

  const idDev = cfgPath.NODE_ENV === 'development';

  // 加载services服务
  const allServices = require('../services');

  const router = new Router();

  const routerPath = path.resolve(__dirname, '../routes');

  const routes = fs.readdirSync(routerPath) || [];

  routes.forEach((file) => {
    const fileNameParser = path.parse(file);
    if (fileNameParser.ext === '.js') {
      let customRoutes = require(path.join(routerPath, file));
      if (_.isFunction(customRoutes)) {
        customRoutes = customRoutes(allServices);
      }
      if (Array.isArray(customRoutes)) {
        customRoutes.forEach((customRoute) => {
          if (_.isObject(customRoute)) {
            const middlewares = [];
            let useFn = customRoute.use;
            if (useFn && !Array.isArray(useFn)) {
              useFn = [useFn];
            }
            if (useFn && useFn.length) {
              middlewares.push(...useFn);
            }
            const renderFn = customRoute.render;
            if (_.isString(renderFn)) {
              middlewares.push(allServices.common.renderQuickly);
            }
            router[(customRoute.method || 'get')](customRoute.url, ...middlewares);
          }
        });
      }
    }
  });

  const serverConfig = cfgFactory.getConfig('server');
  const assetsFilePath = serverConfig.build.assetsFilePath;
  let webpackAssets;
  if (fs.existsSync(assetsFilePath)) {
    // webpackAssets = require(assetsFilePath); 有缓存
    webpackAssets = JSON.parse(fs.readFileSync(assetsFilePath).toString());
  }

  // 如果是开发环境就启动热加载
  if (idDev) {
    app.use(mount(localsConfig.TEST_PATH, (ctx) => {
      ctx.body = require(path.join(__dirname, '../test-api', ctx.url.replace(ctx.search, '')));
    }));
    require('./webpack-dev')(app, router);
    app.use((ctx, next) => {
      if (!webpackAssets) {
        webpackAssets = JSON.parse(fs.readFileSync(assetsFilePath).toString());
      }
      return next();
    });
  }

  router
    .get(
      '*',
      (ctx) => {
        return ctx.render('index', {
          webpackAssets: webpackAssets || {}
        });
      }
    );

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
