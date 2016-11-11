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

  gutil.log(isBuild ? 'Run in production mode' : 'Run in development mode')

  runConfig = setPaths(runConfig)

  if (runConfig.versioning.base && runConfig.versioning.base === '[package.version]') {
    runConfig.versioning.base = require(path.join(cwd, 'package.json')).version
  }

  runConfig._isBuild = isBuild
  runConfig._outputLog = outputLog
  runConfig._path = systemPath
  runConfig._filepath = assembledConfigFullPath
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
  config._cwd = process.env.PWD
  config._srcAbsolute = path.join(config._cwd, config.src)
  config._destAbsolute = path.join(config._cwd, config.dest)

  var relativeToAbsolute = function (prop, key, target, config) {
    var filePath = prop[key]

    // If path starts with ./, the user may want to grab the project root
    if (typeof filePath === 'string' && filePath.substring(0, 2) === './') {
      filePath = path.join(config._cwd, filePath)
    } else if (typeof filePath === 'string') {
      filePath = path.join(target, filePath)
    } else {
      for (var i = 0; i < filePath.length; i++) {
        filePath[i] = path.join(target, filePath[i])
      }
    }
    return filePath
  }

  config = helper.searchReplaceInObjByKey(config, 'src', function (prop, key) { return relativeToAbsolute(prop, key, config._srcAbsolute, config) })
  config = helper.searchReplaceInObjByKey(config, 'dest', function (prop, key) { return relativeToAbsolute(prop, key, config._destAbsolute, config) })
  config = helper.searchReplaceInObjByKey(config, 'path', function (prop, key) { return relativeToAbsolute(prop, key, config._destAbsolute, config) })
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
