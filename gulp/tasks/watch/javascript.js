var gulp = require('gulp')
var webpack = require('webpack')
var browserSync = require('browser-sync')
var logger = require('../../util/compileLogger')
var config = require('../../config')
var helper = require('../../util/helpers')()

var javascriptWatchTask = function (callback) {
  var initialCompile = false
  var webpackConfig = helper.getWebpackTaskConfig(config)

  webpack(webpackConfig).watch(200, function (err, stats) {
    /* if (stats.hasErrors || stats.hasWarnings) {
      logger(err, stats)
    } */
    browserSync.reload()
    // On the initial compile, let gulp know the task is done
    if (!initialCompile) {
      initialCompile = true
      callback()
    }
  })
}

gulp.task('watch:javascript', javascriptWatchTask)
module.exports = javascriptWatchTask
