#! /usr/bin/env node
var shell = require('shelljs')
var path = require('path')
var args = require('yargs').argv
var gulpFile = path.join(__dirname, '../gulpfile.babel.js')
var gulpPath = 'node_modules/gulp/bin/gulp.js'
var gulpFileParameter = '--gulpfile ' + gulpFile

var isBuild = args.prod || args.build || args.productive
var outputLog = args.log || args.outputLog
var command = ''

if (!isBuild) {
  shell.exec('node_modules/gulp/bin/gulp.js watch --gulpfile ' + gulpFile)
  command += gulpPath + ' watch'
} else {
  shell.exec('node_modules/gulp/bin/gulp.js compile --build --gulpfile ' + gulpFile)
  command += gulpPath + ' compile --build'
}

if (outputLog) {
  command += ' --outputLog'
}

command += ' ' + gulpFileParameter

shell.exec(command)
