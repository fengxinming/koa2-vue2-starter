'use strict';

const httpProxy = require('http-proxy');
const cfgPath = require('../utils/cfg-constants');
const cfgFactory = require('../utils/cfg-factory');

const REST_PATH = cfgFactory.getConfig('locals').REST_PATH;

const api = cfgFactory.getConfig('server').req.api;

module.exports = (app) => {
  if (cfgPath.NODE_ENV === 'development') {
    const proxy = httpProxy.createProxyServer({});
    // 请求转发前的数据处理
    // proxy.on('proxyReq', (proxyReq, req, res, options) => {});
    return (req, res) => {
      if (req.url.indexOf(REST_PATH) === 0) {
        req.url = req.url.slice(REST_PATH.length);
        proxy.web(req, res, {
          target: api
        });
      } else {
        return app.callback()(req, res);
      }
    };
  } else {
    return app.callback();
  }
};
