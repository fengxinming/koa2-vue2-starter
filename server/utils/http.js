'use strict';

const request = require('request');
const URLUtil = require('url');
const createError = require('http-errors');
const logFactory = require('koa2-middleware-slacker/utils/log-factory');
const cfgFactory = require('./cfg-factory');

const log = logFactory.getLogger('request');
const errorLog = logFactory.getLogger('error');
const config = cfgFactory.getConfig('server');

const slice = Array.prototype.slice;

// 请求接口相关配置
const cfg = config.req;
const api = cfg.api;

const METHODS = ['get', 'head', 'post', 'put', 'patch', 'del'];

class BaseRequest {

  constructor(url, options) {
    // 兼容object传参
    if (typeof url === 'object') {
      options = url;
      url = options.url;
    }
    // 非http开头的url，自动拼接配置的rest地址
    url = !url.indexOf('http') ? url : api + url;

    this.options = options;
    this.url = url;

    // 设置默认值
    this._setDefaultValues();
  }

  request(resolve, reject) {
    const options = this.options;
    const headers = options.headers = options.headers || {};
    // 设置请求头
    this._setHeaders(headers, reject);
    const url = this.url;
    log.info('请求转发开始：【' + url + '】', JSON.stringify(options));
    const me = this;
    request(url, options, function(error, response, body) {
      var statusCode = response && response.statusCode || 500;
      if (error) {
        me._throwError(statusCode, error, {
          url: url
        }, '网络请求异常：', reject);
        return;
      }
      // 校验数据格式
      if (body) {
        log.info('请求转发成功：【' + url + '】', body);
        // 如果返回的数据是json格式
        if (!(response.headers['content-type'] || '').indexOf('application/json')) {
          if (typeof body === 'string') {
            try {
              body = JSON.parse(body);
            } catch (e) {
              me._throwError(500, body, {
                url: url
              }, '响应数据非json格式：', reject);
              return;
            }
          }
        }
      }
      // 响应正常
      if (statusCode === 200) {
        response.body = body;
        resolve(response);
      } else {
        let err;
        if (typeof body === 'string') {
          err = {
            message: body
          };
        } else {
          body.message = body.message || '服务器打盹了';
          err = body;
        }
        err.url = url;
        me._throwError(statusCode, err, {
          url: url
        }, '请求转发异常：', reject);
      }
    });
  }

  _setHeaders(headers, reject) {
    const options = this.options;
    const url = this.url;
    // 校验token
    if (('SESSION' in headers) && headers['SESSION'] !== false) {
      // token 过期
      this._throwError(500, '微信授权超时，请重新认证', {
        code: 1003,
        url: url
      }, 'token已失效', reject);
    }
    const req = options.req;
    if (req) {
      Object.assign(headers, {
        'x-forwarded-for': req.ips.join(', ') || this._getIp(req),
        'user-agent': req.headers['user-agent']
      });
      delete options.req;
    }
    // 保持跟目标host一致
    headers.host = URLUtil.parse(url).host;
  }

  _setDefaultValues() {
    const options = this;
    // 配置gzip压缩
    const gzip = options.gzip || cfg.gzip;
    if (typeof gzip !== 'undefined') {
      options.gzip = gzip;
    }
    // 默认get方法
    options.method = options.method || 'GET';
  }

  _getIp(req) {
    return req.ips.join(', ') || req.headers['x-real-ip'] || req.socket.remoteAddress || '';
  }

  _throwError(code, message, opts, desc, reject) {
    const options = this.options;
    const httpError = createError(code, message, opts);
    errorLog.error(desc, options, httpError);
    if (reject) {
      reject(httpError);
    } else {
      return httpError;
    }
  }

};

/*
 * @param url [string | object] 请求地址(必填)
 * @param options [object] 请求参数，第一个参数为对象时可以不传(选填)
 */
function httpRequest(url, options) {
  // 创建一个Promise对象
  return new Promise((resolve, reject) => {
    const baseRequest = new BaseRequest(url, options);
    baseRequest.request(resolve, reject);
  });
};

function multiHttp(options, cb) {
  let req = cb || httpRequest;
  return Promise.all(options.map((option) => {
    return req(option);
  }));
};

httpRequest.map = (options) => {
  if (arguments.length > 1) {
    options = slice.call(arguments, 0);
  }
  return multiHttp(options);
};

METHODS.forEach((verb) => {
  var method = verb === 'del' ? 'DELETE' : verb.toUpperCase();
  httpRequest[verb] = (url, options) => {
    if (typeof url === 'object') {
      options = url;
      url = options.url;
    }
    options = options || {};
    options.method || (options.method = method);
    return httpRequest(url, options);
  };
  httpRequest.map[verb] = function(options) {
    if (arguments.length > 1) {
      options = slice.call(arguments, 0);
    }
    return multiHttp(options, httpRequest[verb]);
  };
});

httpRequest.config = cfg;

module.exports = httpRequest;
