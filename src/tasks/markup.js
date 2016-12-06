var gulp = require('gulp')
var config = require('../config')()
var browserSync = require('browser-sync')
var replace = require('gulp-replace')

var markupTask = function() {
  var src = config.markup.src
  var versionPlaceholder = config.versioning.placeholder
  var hasMarkupReplacement = config.versioning.replaceInMarkup

  if (hasMarkupReplacement && versionPlaceholder) {
    return gulp.src(src, { base: config.src })
      .pipe(replace(new RegExp(versionPlaceholder, 'i'), config.versioning.base))
      .pipe(gulp.dest(config.dest))
      .pipe(browserSync.stream())
  }

  return gulp.src(src, { base: config.src })
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream())
}
gulp.task('markup', markupTask)
module.exports = markupTask
