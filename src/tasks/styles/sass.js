var gulp = require('gulp')
var config = require('../../config')()
var plumber = require('gulp-plumber')
var sass = require('gulp-sass')
var nano = require('gulp-cssnano')
var browserSync = require('browser-sync').create()
var handleErrors = require('../../util/handleErrors')
var helper = require('../../util/helpers')()
var autoprefixer = require('gulp-autoprefixer')

var sassTask = function () {
  var src, dest, options
  src = config.styles.options.sass.src
  dest = config.dest

  options = helper.copyLiteral(config.styles.options.sass)
  delete options.src

  if (config._isBuild) {
    options.outputStyle = 'compressed'
    return gulp.src(src, { base: config.src })
      .pipe(plumber())
      .pipe(sass(options))
      .pipe(autoprefixer(config.styles.options.autoprefixer))
      .pipe(nano())
      .pipe(gulp.dest(dest))
      .pipe(browserSync.stream())
      .on('error', handleErrors)
  }

  return gulp.src(src, { base: config.src })
    .pipe(plumber())
    .pipe(sass(options))
    .pipe(autoprefixer(config.styles.options.autoprefixer))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream())
    .on('error', handleErrors)
}
gulp.task('styles:sass', sassTask)
module.exports = sassTask
