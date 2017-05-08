'use strict';

const Koa = require('koa');
const slacker = require('koa2-middleware-slacker');
// const memeye = require('memeye');

const app = new Koa();

const router = require('./router');
const config = require('../../conf/server');
const pkg = require('../../package');

const appConfig = config.app;

slacker(app, appConfig);

router(app);

app.name = pkg.name;
app.env = config.NODE_ENV;

// memeye();

module.exports = app;
