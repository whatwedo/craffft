var gulp = require('gulp')
var gulpSequence = require('gulp-sequence')
var config = require('../config')()

var defaultTask = function (cb) {
  gulpSequence('compile', 'watch', cb)
}

gulp.task('default', defaultTask)
module.exports = defaultTask
