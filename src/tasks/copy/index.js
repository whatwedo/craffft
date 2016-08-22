/**
 * This folder contains all modules that create and run servers
 * for development and testing.
 */

var gulp = require('gulp')

var copyTaskList = function () {
  return ['copy:files']
}

gulp.task('copy', copyTaskList())
module.exports = copyTaskList
