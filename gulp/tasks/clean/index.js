/**
 * This folder contains all clean tasks to delete files before or after compiling
 */
var gulp = require('gulp')

var cleanTaskList = function () {
  return ['clean:temporary']
}

gulp.task('clean', cleanTaskList())
module.exports = cleanTaskList()
