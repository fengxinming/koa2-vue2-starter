'use strict';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');
const _ = require('./utils');
const conf = require('../conf/server');

const locals = conf.locals;

module.exports = {
  entry: {
    client: './client/vue/index.js'
  },
  output: {
    path: config.outputPath,
    filename: '[name].js',
    publicPath: config.publicPath
  },
  performance: {
    hints: config.NODE_ENV === 'production' ? 'warning' : false
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {},
    modules: [
      _.cwd('node_modules')
    ]
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loaders: ['vue-loader']
    }, {
      test: /\.js$/,
      loaders: ['babel-loader']
    }, {
      test: /\.es6$/,
      loaders: ['babel-loader']
    }, {
      test: /\.(ico|png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 30000,
        name: 'static/images/[name].[hash:8].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 30000,
        name: 'static/fonts/[name].[hash:8].[ext]'
      }
    }, {
      test: /\.pug$/,
      loaders: 'pug-loader'
    }]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new HtmlWebpackPlugin({
      title: config.title,
      locals: locals,
      template: config.outputIndexTemplatePath,
      filename: config.outputIndexPath,
      chunks: ['manifest', 'vendor', 'client']
    }),
    new webpack.LoaderOptionsPlugin(_.loadersOptions())
  ],
  target: config.target
};
