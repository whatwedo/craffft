/**
 * This folder contains all modules that create and run servers
 * for development and testing.
 */

var gulp = require('gulp')
var config = require('../../config')
// var gutil = require('gulp-util')

var serverTaskList = function () {
  var tasks = []

  // Compile stylus if configured
  if (config.server.plugins.indexOf('browsersync') > -1) {
    tasks.unshift('server:browser-sync')
  }
  return tasks
}

gulp.task('server', serverTaskList())
module.exports = serverTaskList()
