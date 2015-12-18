'use strict';
/*
 gulpfile.js
 ===========
 Rather than manage one giant configuration file responsible
 for creating multiple tasks, each task has been broken out into
 its own file in gulp/tasks. Any files in that directory get
 automatically required below.

 To add a new task, simply add a new task file that directory.
 gulp/tasks/default.js specifies the default set of tasks to run
 when you run `gulp`.
 */

//var requireDir = require('require-dir');
//var gutil = require('gulp-util');
//var glob = require('glob');
var path = require('path')
var fs = require('fs')
var mkdirp = require('mkdirp')
var gutil = require('gulp-util')

// Require all tasks in gulp/tasks, including subfolders
module.exports = function (gulp, config) {
  var preprocessTasks, processTasks, postprocessTasks;
  var systemFolder = '.craffft'
  var systemPath = path.join(process.env.PWD, systemFolder)

  try {
    var stats = fs.statSync(systemPath)
    if (!stats.isDirectory()) {
      throw 'Not a folder'
    }
  } catch (e) {
    mkdirp.sync(systemPath)
  }

  // Create final config for this build
  config = require('./gulp/config')();
  config._preprocessTask = 'preprocess';
  gutil.log(JSON.stringify(config))
  fs.writeFileSync(path.join(systemPath, 'config.json'), JSON.stringify(config), 'utf-8');

  processTasks = [
    './gulp/tasks/preprocess',
  ];

  preprocessTasks = [
    './gulp/tasks/build',
    './gulp/tasks/default',
    './gulp/tasks/javascript',
    './gulp/tasks/server',
    './gulp/tasks/bump',
    './gulp/tasks/changelog',
    './gulp/tasks/images',
    './gulp/tasks/markup',
    './gulp/tasks/watch',
    './gulp/tasks/watchify',
    './gulp/tasks/styles',
    './gulp/tasks/clean'
  ];

  postprocessTasks = [
    './gulp/tasks/copy'
  ];

  preprocessTasks.forEach(function (task) {
    require(task)(gulp, config);
  });

  postprocessTasks.forEach(function (task) {
    require(task)(gulp, config);
  });

  processTasks.forEach(function (task) {
    require(task)(gulp, config);
  });

  //gutil.log(gulp);
  return gulp;
};
