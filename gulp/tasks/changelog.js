'use strict'

var gulp = require('gulp')
var config = require('../config')
var markdown = require('gulp-markdown')
var handleErrors = require('../util/handleErrors')

var changelogTask = function () {
  var src = config.changelog.src
  var dest = config.dest

  return gulp.src(src)
    .pipe(markdown())
    .pipe(gulp.dest(dest))
    .on('error', handleErrors)
}

gulp.task('changelog', changelogTask)
module.exports = changelogTask
