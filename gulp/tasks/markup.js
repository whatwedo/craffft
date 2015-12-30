var gulp = require('gulp')
var config = require('../config')
var replace = require('gulp-replace')
var helper = require('../util/helpers')

var markupTask = function () {
  var src = config.markup.src
  gulp.task('markup', function () {
    return gulp.src(src, {base: config.src})
    .pipe(replace(/{PKG_VERSION}/g, config.options.version))
    .pipe(gulp.dest(config.dest))
  })
}
gulp.task('markup', markupTask)
module.exports = markupTask
