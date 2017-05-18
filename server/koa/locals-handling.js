'use strict';

const cfgFactory = require('../utils/cfg-factory');
const cfgPath = require('../utils/cfg-constants');
const pkg = require('../../package');

module.exports = (app) => {

  let localsConfig = cfgFactory.getConfig('locals');
  localsConfig = Object.assign({}, localsConfig, {
    NODE_ENV: cfgPath.NODE_ENV,
    VERSION: localsConfig.VERSION.slice(0, 2) + Date.now()
  });

  app.name = pkg.name;
  app.env = cfgPath.NODE_ENV;

  app.use((ctx, next) => {
    // 设置模板的全局属性
    ctx.state.locals = Object.assign({}, ctx.state, localsConfig);
    // 页面不缓存
    ctx.set('Cache-Control', 'no-cache');
    return next();
  });

};
