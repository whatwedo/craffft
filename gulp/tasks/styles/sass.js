var gulp = require('gulp')
var config = require('../../config')
var plumber = require('gulp-plumber')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()
var handleErrors = require('../../util/handleErrors')
var helper = require('../../util/helpers')()

var sassTask = function () {
  var src, dest, options
  src = config.styles.options.sass.src
  dest = config.dest

  options = helper.copyLiteral(config.styles.options.sass)
  delete options.src

  return gulp.src(src, { base: config.src })
    .pipe(plumber())
    .pipe(sass(options))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream())
    .on('error', handleErrors)
}
gulp.task('styles:sass', sassTask)
module.exports = sassTask
