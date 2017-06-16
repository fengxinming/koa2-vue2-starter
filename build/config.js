'use strict';

const path = require('path');
const cfgConstants = require('../server/utils/cfg-constants');
// const pkg = require('../package');

const staticDir = cfgConstants.staticDir;
const viewsDir = cfgConstants.viewsDir;

module.exports = {
  NODE_ENV: cfgConstants.NODE_ENV,
  publicPath: '/assets/index/',
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
