/**
 * Why using gulp-watch and not native gulp.watch()?
 * gulp-watch is usually a better solution because it lets you perform specific actions only on the files that have
 * been modified, while gulp.watch only lets you run complete tasks. For a project of a reasonable size, this will
 * quickly become too slow to be useful.
 */

var gulp = require('gulp')
var gulpSequence = require('gulp-sequence')
// var config = require('../../config')
// var gutil = require('gulp-util')

var watchTaskList = function () {
  return gulpSequence('clean', [ 'watch:default', 'watch:javascript' ])
}

gulp.task('watch', watchTaskList())
module.exports = watchTaskList()
