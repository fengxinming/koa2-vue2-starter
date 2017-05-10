'use strict';
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config');
const serverConfig = require('../server/utils/cfg-factory').getConfig('server');
const cfgConstants = require('../server/utils/cfg-constants');

const _ = module.exports = {};

_.cwd = (file) => {
  return path.join(cfgConstants.projectDir, file || '');
};

const cssModuleStr = 'css-loader?-autoprefixer&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]';
_.cssLoader = config.cssModules ? cssModuleStr : 'css-loader?-autoprefixer';

_.cssProcessors = [
  { loader: '', test: /\.css$/ },
  { loader: 'sass-loader?sourceMap', test: /\.scss$/ },
  { loader: 'less-loader?sourceMap', test: /\.less$/ },
  { loader: 'stylus-loader?sourceMap', test: /\.styl$/ },
  { loader: 'sass-loader?indentedSyntax&sourceMap', test: /\.sass$/ },
];

// https://github.com/egoist/vbuild/blob/master/lib/vue-loaders.js
_.loadersOptions = () => {
  const isProd = config.NODE_ENV === 'production';

  function generateLoader(langs) {
    langs.unshift('css-loader?sourceMap&-autoprefixer');
    if (!isProd) {
      return ['vue-style-loader'].concat(langs).join('!');
    }
    return ExtractTextPlugin.extract({
      fallback: 'vue-style-loader',
      use: langs.join('!')
    });
  }

  return {
    minimize: isProd,
    options: {
      // css-loader relies on context
      context: cfgConstants.projectDir,
      // postcss plugins apply to .css files
      postcss: config.postcss,
      babel: config.babel,
      vue: {
        preserveWhitespace: false,
        // postcss plugins apply to css in .vue files
        postcss: config.postcss,
        loaders: {
          css: generateLoader([]),
          sass: generateLoader(['sass-loader?indentedSyntax&sourceMap']),
          scss: generateLoader(['sass-loader?sourceMap']),
          less: generateLoader(['less-loader?sourceMap']),
          stylus: generateLoader(['stylus-loader?sourceMap']),
          js: 'babel-loader'
        }
      },
      stylus: {
        use: serverConfig.app.stylus.use,
        import: serverConfig.app.stylus.import,
        define: Object.assign({
          'inline-url': require('stylus').url({
            paths: [serverConfig.app.staticDir]
          })
        }, serverConfig.app.stylus.define)
      }
    }
  }
}
