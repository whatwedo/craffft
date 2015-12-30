'use strict'
var gulp = require('gulp')
var changed = require('gulp-changed')
var imagemin = require('gulp-imagemin')
var helper = require('../util/helpers')
var config = require('../config')

var imageTask = function () {
  var plugins = []
  var src = config.images.src
  var dest = config.dest

  config.images.options.use.forEach(function (plugin) {
    plugins.push(require(plugin)())
  })
  config.images.options.use = plugins

  return gulp.src(src, {base: config.src})
    .pipe(changed(dest)) // Ignore unchanged files
    .pipe(imagemin(config.images.options)) // Optimize
    .pipe(gulp.dest(dest))
}

gulp.task('images', imageTask)
module.exports = imageTask
