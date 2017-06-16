'use strict';

const nativePath = require('path');
const vinylFs = require('vinyl-fs');
const stylus = require('gulp-stylus');
const clean = require('./clean');

const serverConfig = require('../server/utils/cfg-factory').getConfig('server');
const cfgConstants = require('../server/utils/cfg-constants');
const gutil = require('gulp-util');

const stylusConfig = serverConfig.app.stylus;

function packcss(src, dest) {
  return new Promise((resolve, reject) => {
    gutil.log('Starting "packcss" task', src);
    vinylFs.src(src).pipe(stylus({
      'include css': true,
      // compress: true,
      use: stylusConfig.use,
      import: [nativePath.join(require.resolve('nib').slice(0, -3), 'index.styl')].concat(stylusConfig.import.slice(1)),
      // globals: {},
      url: {
        name: 'inline-url',
        limit: 50000,
        paths: [cfgConstants.staticDir]
      }
    })).on('error', (err) => {
      gutil.log('Running "packcss" task but throw a Error', err);
      reject(err);
    }).on('end', () => {
      gutil.log('Finished "packcss" task');
      resolve();
    }).pipe(vinylFs.dest(dest));
  });
};

// 预编译css
clean(['public/css/*']).then(() => {
  packcss([
    'client/css/*.styl'
  ], 'public/css');
});
