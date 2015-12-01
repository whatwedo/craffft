'use strict';

module.exports = build;
function build(gulp, config) {
  gulp.task('build', [
    config._preprocessTask,
    'copy'
  ]);
}