var gulp = require('gulp')
var config = require('../../config')
var plumber = require('gulp-plumber')
var less = require('gulp-less')
var browserSync = require('browser-sync').create()
var handleErrors = require('../../util/handleErrors')
var helper = require('../../util/helpers')()
// var gutil = require('gulp-util')

var lessTask = function () {
  var src, dest, options
  src = config.styles.options.less.src
  dest = config.dest

  options = helper.copyLiteral(config.styles.options.less)
  delete options.src

  return gulp.src(src, { base: config.src })
    .pipe(plumber())
    .pipe(less(options))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream())
    .on('error', handleErrors)
}

gulp.task('styles:less', lessTask)
module.exports = lessTask
