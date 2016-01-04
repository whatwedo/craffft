#! /usr/bin/env node
var shell = require('shelljs')
var path = require('path')
var args = require('yargs').argv
var gulpFile = path.join(__dirname, '../gulpfile.babel.js')

var isBuild = args.prod || args.build || args.productive

if (!isBuild) {
  shell.exec('node_modules/gulp/bin/gulp.js watch --gulpfile ' + gulpFile)
} else {
  shell.exec('node_modules/gulp/bin/gulp.js compile --build --gulpfile ' + gulpFile)
}
