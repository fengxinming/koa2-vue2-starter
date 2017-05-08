'use strict';

const httpProxy = require('http-proxy');
const cfgUtil = require('../../conf/server');

const REST_PATH = cfgUtil.locals.REST_PATH;
const proxy = httpProxy.createProxyServer({});
const api = cfgUtil.req.api;

// 请求转发前的数据处理
proxy.on('proxyReq', (proxyReq, req, res, options) => {});

module.exports = (app) => {
  if (cfgUtil.NODE_ENV === 'development') {
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
