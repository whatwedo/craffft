/**
 * This folder contains all modules that create and run servers
 * for development and testing.
 */

// var glob = require('glob')

module.exports = copy
function copy (gulp, config) {
  'use strict'

  gulp.task('copy-inventory', function (cb) {
    // TODO: Collect files async
    cb()
  })
  gulp.task('copy-files', [config._preprocessTask, 'copy-inventory'], require('./copy-files')(gulp, config))
  gulp.task('copy', ['copy-inventory', 'copy-files'])
}
