'use strict';

const Koa = require('koa');
const slacker = require('koa2-middleware-slacker');
const cfgFactory = require('../utils/cfg-factory');
const cfgPath = require('../utils/cfg-constants');
// const memeye = require('memeye');

const app = new Koa();

const router = require('./router');
const pkg = require('../../package');

const appConfig = cfgFactory.getConfig('server').app;

slacker(app, appConfig);

router(app);

app.name = pkg.name;
app.env = cfgPath.NODE_ENV;

// memeye();

module.exports = app;
