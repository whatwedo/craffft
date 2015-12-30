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

var gutil = require('gulp-util')
var args = require('yargs').argv
var requireDir = require('require-dir')

// ...
// gutil.log = gutil.noop
// or
// gutil.log = function () { return this }

// Require all tasks in gulp/tasks, including subfolders
requireDir('./tasks', { recurse: true })
