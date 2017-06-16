'use strict';

const vinylFs = require('vinyl-fs');
const clean = require('gulp-clean');
const gutil = require('gulp-util');

module.exports = (src) => {
  return new Promise((resolve, reject) => {
    gutil.log('Starting "clean" task', src);
    vinylFs.src(src, {
      read: false
    }).on('error', function(err) {
      gutil.log('Running "clean" task but throw a Error', err);
      reject(err);
    }).on('end', function() {
      gutil.log('Finished "clean" task');
      resolve();
    }).pipe(clean());
  });
};
