'use strict';

const Koa = require('koa');
const slacker = require('koa2-middleware-slacker');

const cfgFactory = require('../utils/cfg-factory');
// const memeye = require('memeye');
const router = require('./router');
const errorHandling = require('./error-handling');
const localsHandling = require('./locals-handling');

const app = new Koa();

const appConfig = cfgFactory.getConfig('server').app;

localsHandling(app);

errorHandling(app);

slacker(app, appConfig);

router(app);

// memeye();

module.exports = app;
