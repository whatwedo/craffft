'use strict';
var gulp = require('gulp')
var config = require('../config')

module.exports = build;
function build() {
  gulp.task('build', [
    config._preprocessTask,
    'copy'
  ]);
}