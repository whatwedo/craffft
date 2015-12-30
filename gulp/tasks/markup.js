var gulp = require('gulp')
var config = require('../config')
var browserSync = require('browser-sync')
var replace = require('gulp-replace')

var markupTask = function () {
  var src = config.markup.src
  return gulp.src(src, {base: config.src})
    .pipe(replace(/{PKG_VERSION}/g, config.options.version))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream())
}
gulp.task('markup', markupTask)
module.exports = markupTask
