'use strict';

module.exports = preprocess;
function preprocess(gulp, config) {
  gulp.task(config._preprocessTask, [
    'javascript',
    'styles',
    'images',
    'markup',
    'changelog',
    'clean'
  ]);
}