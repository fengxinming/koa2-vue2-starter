'use strict';

const path = require('path');
const serverConfig = require('../conf/server');
// const pkg = require('../package');

const staticDir = serverConfig.app.staticDir;
const staticPath = serverConfig.app.staticPath;
const viewsDir = serverConfig.app.viewsDir;

module.exports = {
  NODE_ENV: serverConfig.NODE_ENV,
  publicPath: staticPath + '/assets/index/',
  outputPath: path.resolve(staticDir, 'assets/index'),
  outputIndexPath: path.join(staticDir, 'assets/index.html'),
  outputIndexTemplatePath: path.join(viewsDir, 'index.pug'),
  babel: {
    babelrc: false,
    presets: ['vue-app']
  },
  postcss: [
    require('autoprefixer')({
      browsers: ['last 30 versions', 'ie > 8']
    }),
    require('postcss-nested')
  ],
  cssModules: false,
  target: 'web'
};
