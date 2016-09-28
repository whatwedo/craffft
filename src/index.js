'use strict'
/*
 gulp/index.js
 ===========
 Rather than manage one giant configuration file responsible
 for creating multiple tasks, each task has been broken out into
 its own file in gulp/tasks. Any files in that directory get
 automatically required below.

 To add a new task, simply add a new task file that directory.
 gulp/tasks/default.js specifies the default set of tasks to run
 when you run `gulp`.
 */

var gulp = require('gulp')
var requireDir = require('require-dir')

// ...
// gutil.log = gutil.noop
// or
// gutil.log = function () { return this }

// Require all tasks in gulp/tasks, including subfolders

/**
 * @param {string} Command
 * @param opts.build Build Flag
 * @param opts.outputLog Log Flag
 */
var craffft = function (command, opts) {
  require('./config')(opts)
  requireDir('./tasks', { recurse: true })

  if (command) {
    gulp.start(command)
  }
}

module.exports = craffft
