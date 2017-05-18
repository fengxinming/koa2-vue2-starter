'use strict';

const nativePath = require('path');
const logFactory = require('koa2-middleware-slacker/utils/log-factory');
const createError = require('http-errors');
const consolidate = require('consolidate');

const cfgConstants = require('../utils/cfg-constants');

class ServerView {
  constructor() {
    this.viewDefaults = {
      pretty: false,
      debug: false,
      compileDebug: false,
      cache: cfgConstants.NODE_ENV === 'production',
      basedir: cfgConstants.viewsDir
    };
  }

  _renderProperty(n, i) {
    return `<p>【${i}】 ${n}</p>`;
  }

  render(ctx, path, options) {
    const state = Object.assign(options, this.viewDefaults, ctx.state, ctx.state.locals || {});
    delete state.locals;
    // deep copy partials
    state.partials = Object.assign({}, options.partials || {});
    path = nativePath.join(state.basedir, path + '.pug');
    const render = consolidate.pug;
    const err = options.error;
    try {
      return render(path, state);
    } catch (e) {
      const renderP = this._renderProperty;
      return `<h1>【${err.status}】 【${err.code}】</h1><h2>${options.message}</h2>${Object.keys(err).map(renderP).join('')}<pre>${ err.stack }</pre>`;
    }
  }
}

module.exports = (app) => {

  const errorLog = logFactory.getLogger('error');

  const viewer = new ServerView();

  app.use(async function(ctx, next) {
    const locals = ctx.state.locals;
    const CONTEXT_PATH = locals.CONTEXT_PATH;
    const requestUrl = ctx.url;

    try {
      await next();
    } catch (err) {
      const status = err.status || 500;
      ctx.status = status;
      const code = err.code || 500;
      app.emit('error', err, ctx);
      if (ctx.headers['x-requested-with'] === 'XMLHttpRequest') {
        ctx.body = Object.assign({
          message: err.message,
          url: requestUrl
        }, err);
      } else {
        if (code === 1003) {
          ctx.redirect(CONTEXT_PATH + '/wechat/forceauth?backurl=' + CONTEXT_PATH + requestUrl);
        } else {
          ctx.body = await viewer.render(ctx, 'error', {
            status: status,
            code: code,
            url: requestUrl,
            message: err.message,
            backurl: locals.CONTEXT_PATH + '/',
            error: err
          });
        }
      }
    }
    if (ctx.status === 404) {
      const err = createError('找不到页面 -> ' + requestUrl, 404);
      app.emit('error', err, ctx);
      ctx.body = await viewer.render(ctx, 'error', {
        status: 404,
        code: 404,
        url: requestUrl,
        message: err.message,
        backurl: CONTEXT_PATH + '/',
        error: err
      });
    }
  });

  app.on('error', (err, ctx) => {
    const requestUrl = ctx.url;
    const status = err.status || 500;
    if (status === 404) {
      const err = createError('找不到页面 -> ' + requestUrl, 404);
      errorLog.error(err);
    } else {
      errorLog.error('服务器报错了 -> ' + requestUrl, err);
    }
  });

};
