var args = require('yargs').argv
var path = require('path')
var fs = require('fs')
var _ = require('lodash')
var gutil = require('gulp-util')
var helper = require('./util/helpers')()

var envArgBuild = args.build
var envArgOutputLog = args.outputLog

/**
 * Gathers informations about the current environment, generates the config out of defaults and user's
 * craffft-config.json, caches the result and returns the new or cached config for the current compilation
 * process.
 * @param opts.build Build flag
 * @param opts.outputLog Log flag
 * @returns {{}} Config
 */
var config = function (opts) {
  var isBuild = opts && opts.build ? opts.build : envArgBuild
  var outputLog = opts && opts.outputLog ? opts.outputLog : envArgOutputLog

  var userConfig = {} // Users own config if exists
  var runConfig = {}  // The final assembled config

  var cwd = process.env.PWD
  var systemFolder = '.craffft'
  var systemPath = path.join(cwd, systemFolder)
  var userConfigFile = 'craffft-config.json'
  var userConfigFullPath = path.join(cwd, userConfigFile)
  var defaultConfig = './' + userConfigFile
  var assembledConfigFullPath = path.join(systemPath, userConfigFile)

  if (outputLog) {
    gutil.log('Process runs in ' + cwd)
  }

  // Set up build temporary folder for storing processing files
  var isSystemFolderCreated = false
  try {
    var sysFolderStats = fs.statSync(systemPath)
    if (!sysFolderStats.isDirectory()) {
      // Some unknown error
      throw new Error('Not a folder')
    } else {
      isSystemFolderCreated = true
    }
  } catch (e) {
    // Folder doesn't exist yet. Create
  }

  try {
    if (!isSystemFolderCreated) {
      fs.mkdirSync(systemPath)
    }
  } catch (e) {
    // Folder couldn't be created
    gutil.log('Couldn\'n create craffft temporary folder.')
  }

  // Returns current assembled config if there is one
  try {
    var configStats = fs.statSync(assembledConfigFullPath)
    if (!configStats.isFile()) {
      // Some unknown error
      throw new Error('Not a file')
    }

    runConfig = require(assembledConfigFullPath)
    if (outputLog) {
      gutil.log('Config:')
      gutil.log(runConfig)
    }
    return runConfig
  } catch (e) {
    // No assembled config. have to be the first task.
    runConfig = require(defaultConfig)
  }

  // Go and check if user have an own craffft-config.json in it's project folder
  try {
    fs.statSync(userConfigFullPath)
    userConfig = require(userConfigFullPath)
    runConfig = _.merge(runConfig, userConfig)
    gutil.log('User config loaded!')
  } catch (e) {
    gutil.log('Error parsing user config: ', e.message)
  }

  gutil.log('Run on ' + isBuild ? 'production' : 'development' + ' config.')

  runConfig = setPaths(runConfig)

  if (runConfig.options.version && runConfig.options.version === 'package.version') {
    runConfig.options.version = require(path.join(cwd, 'package.json')).version
  }

  runConfig._isBuild = isBuild
  runConfig._outputLog = outputLog
  runConfig._path = systemPath
  runConfig._filepath = assembledConfigFullPath
  runConfig._cwd = cwd
  runConfig._tasks = getTasks()

  try {
    fs.writeFileSync(assembledConfigFullPath, JSON.stringify(runConfig), 'utf-8')
  } catch (e) {
    gutil.log(e)
  }

  if (outputLog) {
    gutil.log('Config:')
    gutil.log(runConfig)
  }

  return runConfig
}

/**
 * Fills the configs with aggregated paths e.g. abolute project path
 * @param {object} config craffft config
 */
var setPaths = function (config) {
  config.srcAbsolute = path.join(process.env.PWD, config.src)
  config.destAbsolute = path.join(process.env.PWD, config.dest)
  config.src = config.srcAbsolute
  config.dest = config.destAbsolute

  var relativeToAbsolute = function (prop, key, root) {
    var filePath = prop[ key ]
    if (typeof filePath === 'string') {
      filePath = path.join(root, filePath)
    } else {
      for (var i = 0; i < filePath.length; i++) {
        filePath[ i ] = path.join(root, filePath[ i ])
      }
    }
  }

  helper.recursiveFindByKeyInObj(config, 'src', function (prop, key) { relativeToAbsolute(prop, key, config.srcAbsolute) })
  helper.recursiveFindByKeyInObj(config, 'dest', function (prop, key) { relativeToAbsolute(prop, key, config.destAbsolute) })
  return config
}

/**
 * Get default tasks grouped by their run sequence
 * @returns {{preprocess: string[], process: string[], postprocess: string[]}}
 */
var getTasks = function () {
  var preprocessTasks = [
    'clean'
  ]

  var processTasks = [
    // 'build',
    // 'default',
    'javascript',
    // 'bump',
    // 'changelog',
    'images',
    'markup',
    'styles'
  ]

  var postprocessTasks = [
    'copy'
  ]

  return {
    preprocess: preprocessTasks,
    process: processTasks,
    postprocess: postprocessTasks
  }
}

module.exports = config
