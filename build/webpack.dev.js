'use strict';

const webpack = require('webpack');
const base = require('./webpack.base');
const _ = require('./utils');
const FriendlyErrors = require('friendly-errors-webpack-plugin');

const locals = require('../server/utils/cfg-factory').getConfig('locals');

// base.devtool = '#eval-source-map';
// base.devtool = 'source-map';
base.devtool = 'eval';
base.output.publicPath = locals.DYN_JS_PATH;
base.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrors()
);

// push loader for css files
_.cssProcessors.forEach(processor => {
  let loaders;
  if (processor.loader === '') {
    loaders = ['postcss-loader'];
  } else {
    loaders = ['postcss-loader', processor.loader];
  }
  base.module.rules.push({
    test: processor.test,
    loaders: ['style-loader', _.cssLoader].concat(loaders)
  });
});

module.exports = base;
