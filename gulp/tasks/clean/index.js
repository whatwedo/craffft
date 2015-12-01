/**
 * This folder contains all clean tasks to delete files before or after compiling
 */

module.exports = clean;
function clean(gulp, config) {
  'use strict';

  require('./tmp')(gulp, config);

  gulp.task('clean', [
    'clean-temporary'
  ]);
}