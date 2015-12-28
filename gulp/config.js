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
var mkdirp = require('mkdirp')
var _ = require('lodash')
var gutil = require('gulp-util')

var defaultConfigDev = require('./craffft.json')

// TODO Replace
var defaultConfigProd = require('./config-production')
var isProductionEnv = args.env === 'production' || args.env === 'prod'

var configure = function () {
  var userConfig = null // Users own config if exists
  var runConfig = null  // The final assembled config

  var cwd = process.env.PWD
  var systemFolder = '.craffft'
  var systemPath = path.join(process.env.PWD, systemFolder)
  var userConfigFile = 'craffft.json'
  var userConfigFullPath = path.join(cwd, userConfigFile)
  var assembledConfigFullPath = path.join(systemPath, userConfigFile)

  // Set up build temporary folder for storing processing files
  try {
    var stats = fs.statSync(systemPath)
    if (!stats.isDirectory()) {
      // Some unknown error
      throw 'Not a folder'
    }
  } catch (e) {
    // Folder doesn't exist yet. Create
    mkdirp.sync(systemPath)
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
  }

  // Go and check if user have an own craffft.json in it's project folder
  try {
    var stats = fs.statSync(userConfigFullPath)
    userConfig = require(userConfigFullPath)
    gutil.log('User config loaded!')
  } catch (e) {
    gutil.log('No user config found!')
  }

  gutil.log('Run on ' + isProductionEnv ? 'production' : 'development' + ' config.')

  runConfig = mergeConfigs(userConfig)
  runConfig = setPaths(runConfig)

  if (runConfig.options.version && runConfig.options.version === 'package.version') {
    runConfig.options.version = require(path.join(cwd, 'package.json')).version
  }

  runConfig._path = assembledConfigFullPath
  runConfig._tasks = getTasks()

  fs.writeFileSync(assembledConfigFullPath, JSON.stringify(runConfig), 'utf-8')
  return runConfig
}

/**
 * Fills the configs with aggregated paths e.g. abolute project path
 * @param {object} config craffft config
 */
var setPaths = function (config) {
  config.srcAbsolute = path.join(process.env.PWD, config.src)
  config.destAbsolute = path.join(process.env.PWD, config.dest)
  return config
}

/**
 * Merges together development, production and user configs
 * @param  {object} config Configuration object
 * @return {object}        Final config
 */
var mergeConfigs = function (config) {
  var mergedConfig

  // Create empty configuration container for defaults if no config submitted
  if (!config) {
    config = {
      dev: null,
      prod: null,
      user: null
    }
  }

  // Merge submitted configs where needed with defaults
  if (config.dev) {
    config.dev = _.merge(defaultConfigDev, config.dev)
  } else {
    config.dev = defaultConfigDev
  }

  if (config.prod) {
    config.prod = _.merge(defaultConfigProd, config.prod)
  } else {
    config.prod = defaultConfigProd
  }

  // Create concrete config for compilation
  // Take Development Config as a base, start with user config
  mergedConfig = config.dev
  if (config.user) {
    mergedConfig = _.merge(mergedConfig, config.user)
  }

  if (isProductionEnv) {
    mergedConfig = _.merge(mergedConfig, config.user)
  }

  return mergedConfig
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

module.exports = configure
