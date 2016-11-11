'use strict'

var gulp = require('gulp')
var config = require('../../config')()
var markdown = require('gulp-markdown')
var rename = require('gulp-rename')
var handleErrors = require('../../util/handleErrors')

var changelogTask = function () {
  var src = config.versioning.changelog.src
  var dest = config.versioning.changelog.output.path
  var filename = config.versioning.changelog.output.filename || 'changelog'

  return gulp.src(src)
    .pipe(markdown())
    .pipe(
      rename({
        basename: filename
      }))
    .pipe(gulp.dest(dest))
    .on('error', handleErrors)
}

gulp.task('versioning:changelog', changelogTask)
module.exports = changelogTask
