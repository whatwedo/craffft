'use strict';

var gulp = require('gulp')
var config = require('../config')
var markdown = require('gulp-markdown')
var handleErrors = require('../util/handleErrors')
var helper = require('../util/helpers')

var changelogTask = function () {
  var src = helper().getSrcPath(config, config.changelog.src);
  var dest = config.dest

  return gulp.src(src)
    .pipe(markdown())
    .pipe(gulp.dest(dest))
    .on('error', handleErrors)
}

gulp.task('changelog', changelogTask)
module.exports = changelogTask
