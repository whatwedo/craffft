var gulp = require('gulp')
var gulpSequence = require('gulp-sequence')
var config = require('../config')()

var defaultTask = function (cb) {
  var tasks = config._tasks
  gulpSequence(tasks.preprocess, tasks.process, tasks.postprocess, cb)
}

gulp.task('compile', defaultTask)
module.exports = defaultTask
