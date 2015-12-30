/**
 * This file checks for different configs and merges them in correct order.
 * There are following configs
 *   - config-development.js: The default config parameters
 *   - config-production.js: Parameters of going live. Minifies and removes debug informations like source maps
 *   - config-user.js: Parameters override the default config-development.js and are for your development
 *                     environment. Don't add this to the repository. It's for you, not your team!
 *
 *  Config overrides: config-production > config-user > config-development
 *  Adds: config.srcAbsolute, config.destAbsolute
 */

var args = require('yargs').argv
var path = require('path')
var fs = require('fs')
var _ = require('lodash')
var gutil = require('gulp-util')
var helper = require('./util/helpers')()

var isProductionEnv = args.env === 'production' || args.env === 'prod'

var config = function () {
  var userConfig = {} // Users own config if exists
  var runConfig = {}  // The final assembled config

  var cwd = process.env.PWD
  var systemFolder = '.craffft'
  var systemPath = path.join(cwd, systemFolder)
  var userConfigFile = 'craffft-config.json'
  var userConfigFullPath = path.join(cwd, userConfigFile)
  var defaultConfig = './' + userConfigFile
  var assembledConfigFullPath = path.join(systemPath, userConfigFile)

  // Set up build temporary folder for storing processing files
  var isSystemFolderCreated = false
  try {
    var stats = fs.statSync(systemPath)
    if (!stats.isDirectory()) {
      // Some unknown error
      throw 'Not a folder'
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
    var stats = fs.statSync(assembledConfigFullPath)
    if (!stats.isFile()) {
      // Some unknown error
      throw 'Not a file'
    }

    return runConfig = require(assembledConfigFullPath)
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
    gutil.log('No user config found!')
  }

  gutil.log('Run on ' + isProductionEnv ? 'production' : 'development' + ' config.')

  runConfig = setPaths(runConfig)

  if (runConfig.options.version && runConfig.options.version === 'package.version') {
    runConfig.options.version = require(path.join(cwd, 'package.json')).version
  }

  runConfig._path = systemPath
  runConfig._filepath = assembledConfigFullPath
  runConfig._cwd = cwd
  runConfig._tasks = getTasks()

  try {
    fs.writeFileSync(assembledConfigFullPath, JSON.stringify(runConfig), 'utf-8')
  } catch (e) {
    gutil.log(e)
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
  helper.recursiveFindByKeyInObj(config, 'src', function (prop, key) {
    var filePath = prop[ key ]
    if (typeof filePath === 'string') {
      filePath = path.join(config.srcAbsolute, filePath)
    } else {
      for (var i = 0; i < filePath.length; i++) {
        filePath[ i ] = path.join(config.srcAbsolute, filePath[ i ])
      }
    }
  })
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

module.exports = config()
