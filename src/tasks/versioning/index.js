var gulp = require('gulp')
var gulpSequence = require('gulp-sequence')
// var config = require('../../config')()
// var gutil = require('gulp-util')

var versioningTask = function () {
  return gulpSequence('clean', 'versioning:bump', 'versioning:changelog')
}

gulp.task('versioning', versioningTask())

module.exports = versioningTask()
