var gulp = require('gulp')
var config = require('../../config')()
var plumber = require('gulp-plumber')
var stylus = require('gulp-stylus')
var nano = require('gulp-cssnano')
var browserSync = require('browser-sync').create()
var handleErrors = require('../../util/handleErrors')
var helper = require('../../util/helpers')()
var autoprefixer = require('gulp-autoprefixer')

var stylusTask = function () {
  var src, dest, options
  src = config.styles.options.stylus.src
  dest = config.dest

  options = helper.copyLiteral(config.styles.options.stylus)
  delete options.src

  if (config._isBuild) {
    return gulp.src(src, { base: config.src })
      .pipe(plumber())
      .pipe(stylus(options))
      .pipe(autoprefixer(config.styles.options.autoprefixer))
      .pipe(nano())
      .pipe(gulp.dest(dest))
      .pipe(browserSync.stream())
      .on('error', handleErrors)
  }

  return gulp.src(src, { base: config.src })
    .pipe(plumber())
    .pipe(stylus(options))
    .pipe(autoprefixer(config.styles.options.autoprefixer))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream())
    .on('error', handleErrors)
}

gulp.task('styles:stylus', stylusTask)
module.exports = stylusTask
