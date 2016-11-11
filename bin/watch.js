#! /usr/bin/env node
var args = require('yargs').argv
var craffft = require('../src')

var outputLog = args.log || args.outputLog

craffft('watch', {outputLog: outputLog})
