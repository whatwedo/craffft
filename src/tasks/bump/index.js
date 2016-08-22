var gulp = require('gulp')
var gulpSequence = require('gulp-sequence')
// var config = require('../../config')()
// var gutil = require('gulp-util')

var bumpTask = function () {
  return gulpSequence('clean', 'bump:version', 'bump:changelog')
}

gulp.task('bump', bumpTask())
module.exports = bumpTask()
