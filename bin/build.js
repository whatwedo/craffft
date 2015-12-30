#! /usr/bin/env node
var shell = require('shelljs')

shell.exec('node_modules/gulp/bin/gulp.js compile --silent --env production')
