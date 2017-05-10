'use strict';

import axios from 'axios';
import qs from 'querystring';
import Loading from './gloading';
import Toast from 'mint-ui/lib/toast';

const G_CFG = window.App.globals;
const REST_PATH = G_CFG.REST_PATH;
const TEST_PATH = G_CFG.TEST_PATH;
const CONTEXT_PATH = G_CFG.CONTEXT_PATH;
const gloading = new Loading({ sync: true });

// 申请一个新的http实例
const instance = axios.create({
  baseURL: CONTEXT_PATH,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  timeout: 60000, // 设置超时时间为1分钟
  validateStatus(status) {
    return status >= 200 && status < 300 || status === 304;
  },
  toastDuration: 3000
});

let nonce = Date.now();
const rts = /([?&])_=[^&]*/;
const rquery = (/\?/);

// 添加请求拦截器
instance.interceptors.request.use((options) => {
  let url = options.url;
  // 遮罩，默认不显示菊花
  if (options.mask) {
    // 这里写菊花转
    gloading.start();
    delete options.mask;
  }
  // 简化类型设置
  const headers = options.headers = options.headers || {};
  if (options.json) {
    headers['Content-Type'] = 'application/json; charset=UTF-8';
    delete options.json;
  }
  //校验post数据格式
  const contentType = headers['Content-Type'];
  if (typeof options.data === 'object' && contentType && contentType.indexOf('application/x-www-form-urlencoded') > -1) {
    options.data = qs.stringify(options.data);
  }
  // 防止页面缓存
  if (!options.cache) {
    url = rts.test(url) ? url.replace(rts, '$1_=' + nonce++) : url + (rquery.test(url) ? '&' : '?') + '_=' + nonce++;
    delete options.cache;
  }
  // 调用测试API
  if (options.testApi) {
    if (url.indexOf(TEST_PATH) === -1) {
      url = TEST_PATH + url;
      delete options.testApi;
    }
  } else {
    // 是否调用本地API
    if (options.api !== false && url.indexOf(REST_PATH) === -1) {
      url = REST_PATH + url;
      delete options.api;
    }
  }
  options.url = url;
  return options;
}, (error) => {
  // 错误了要把菊花停下来
  gloading.stop();
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use((response) => {
  // 成功了要把菊花停下来
  gloading.stop();
  return response;
}, (error) => {
  // 错误了要把菊花停下来
  gloading.stop();
  if (error.response) {
    // 禁用全局错误提示
    if (error.config.toast !== false) {
      const data = error.response.data;
      console.error(error.config.url, JSON.stringify(data));
      const status = error.response.status;
      switch (status) {
        case 500:
          var code = +data.code;
          switch (code) {
            case 1002:
              // 没有权限访问，请联系管理员
              Toast({
                message: '没有权限访问，请联系管理员',
                duration: error.config.toastDuration
              });
              break;
            case 1003:
              // 没有登录
            case 1011:
              // 账号不存在，或者账号异常，请重新登录系统
              return;
            default:
              // 默认情况处理
              Toast({
                message: data.details || data.message || '未知异常',
                duration: error.config.toastDuration
              });
          }
          break;
      }
    }
  } else {
    // 默认放一个空对象避免其他地方报错
    error.response = {};
    console.error(error.config.url, '请求接口超过一分钟无响应');
  }
  return Promise.reject(error);
});

export default instance;
