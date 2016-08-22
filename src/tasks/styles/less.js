var gulp = require('gulp')
var config = require('../../config')()
var plumber = require('gulp-plumber')
var less = require('gulp-less')
var nano = require('gulp-cssnano')
var browserSync = require('browser-sync').create()
var handleErrors = require('../../util/handleErrors')
var helper = require('../../util/helpers')()
var autoprefixer = require('gulp-autoprefixer')
// var gutil = require('gulp-util')

var lessTask = function () {
  var src, dest, options
  src = config.styles.options.less.src
  dest = config.dest

  options = helper.copyLiteral(config.styles.options.less)
  delete options.src

  if (config._isBuild) {
    return gulp.src(src, { base: config.src })
      .pipe(plumber())
      .pipe(less(options))
      .pipe(autoprefixer(config.styles.options.autoprefixer))
      .pipe(nano())
      .pipe(gulp.dest(dest))
      .pipe(browserSync.stream())
      .on('error', handleErrors)
  }

  return gulp.src(src, { base: config.src })
    .pipe(plumber())
    .pipe(less(options))
    .pipe(autoprefixer(config.styles.options.autoprefixer))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream())
    .on('error', handleErrors)
}

gulp.task('styles:less', lessTask)
module.exports = lessTask
