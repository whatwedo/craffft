#! /usr/bin/env node
var shell = require('shelljs')
var path = require('path')
var args = require('yargs').argv
var gulpFile = path.join(__dirname, '../gulpfile.babel.js')
var gulpPath = 'node_modules/gulp/bin/gulp.js'
var gulpFileParameter = '--gulpfile ' + gulpFile

var isBuild = args.prod || args.build || args.productive
var isBumpCommand = args.bump
var outputLog = args.log || args.outputLog
var command = ''

console.log('Running bin/craffft with flags is deprecated since v0.21 and will be removed.')

if (isBumpCommand) {
  command += 'npm run craffft:bump'
} else if (!isBuild) {
  command += 'npm run craffft:watch'
} else {
  command += 'npm run craffft:build'
}

if (outputLog) {
  command += ' -- --outputLog'
}

shell.exec(command)
