'use strict';

const path = require('path');

const _ = module.exports = {};

_.NODE_ENV = process.env.NODE_ENV || 'development';

const projectDir = _.projectDir = process.cwd();

_.staticPath = '/static';

_.staticDir = path.resolve(projectDir, 'public');

const clientDir = _.clientDir = path.resolve(projectDir, 'client');

_.viewsDir = path.resolve(projectDir, 'server', 'views');

const confDir = _.confDir = path.resolve(projectDir, 'conf');

_.logsDir = path.resolve(projectDir, 'logs');

_.logsCfg = path.join(confDir, '/log4js.json');

_.customStylusUtils = path.join(clientDir, 'css/utils/**/*.styl');
