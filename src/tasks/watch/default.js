'use strict'
/* Notes:
 - gulp/tasks/browserify.js handles js recompiling with watchify
 - gulp/tasks/browserSync.js watches and reloads compiled files
 */

var gulp = require('gulp')
var gutil = require('gulp-util')
var config = require('../../config')()
var watch = require('gulp-watch')

var watchTask = function () {
  var watchableTasks = [
    'styles:less',
    'styles:css',
    'styles:sass',
    'styles:stylus',
    'images',
    'markup',
    'copy'
  ]

  watchableTasks.forEach(function (taskName) {
    // Get configuration for the task
    var task = {}

    // If it's a subtask e.g. styles:sass, get specific configuration
    // The main css task is a subtask, but configured via a main task in the config.
    // Means we rename the task name here if needed.
    // TODO: Look for a better solution than filtering this particular one
    var tree = taskName.split(':')
    if (tree.length > 1 && taskName.indexOf(':css') === -1) {
      task = config[ tree[0]]
      tree.shift() // Delete first. We already have it in the task variable
      tree.forEach(function (branch) {
        task = task.options[ branch ]
      })
    } else {
      task = config[ taskName.replace(':css', '') ]
    }

    var watchOptions = {
      usePolling: config.options.watchPolling
    }

    watchOptions.interval = watchOptions.usePolling && config.options.watchPolling === 'number' ? config.options.watchPolling : 400

    if (task) {
      watch(task.src, watchOptions, function () {
        require('../' + taskName.replace(':', '/'))()
      })
    }
  })
}
gulp.task('watch:default', [ 'server:browser-sync' ], watchTask)
module.exports = watchTask
