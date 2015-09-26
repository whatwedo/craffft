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

var args  = require('yargs').argv;
var path  = require('path');
var _     = require('lodash');
var gutil = require('gulp-util');

var defaultConfigDev  = require('./config-development');
var defaultConfigProd = require('./config-production');
var isProductionEnv   = args.env === 'production' || args.env === 'prod';

function configure(config){
  'use strict';

  gutil.log('Run on ' + isProductionEnv ? 'production' : 'development' + ' config.');

  // Final, merged and validated config
  var runConfig;

  runConfig = mergeConfigs(config);
  runConfig = setPaths(runConfig);

  return runConfig;

  /**
   * Merges together development, production and user configs
   * @param  {object} config Configuration object
   * @return {object}        Final config
   */
  function mergeConfigs(config){
    var mergedConfig;

    // Create empty configuration container for defaults if no config submitted
    if(!config){
      config = {
        dev: null,
        prod: null,
        user: null
      };
    }

    // Merge submitted configs where needed with defaults
    if(config.dev){
      config.dev = _.merge(defaultConfigDev, config.dev);
    } else {
      config.dev = defaultConfigDev;
    }

    if(config.prod){
      config.prod = _.merge(defaultConfigProd, config.prod);
    } else {
      config.prod = defaultConfigProd;
    }

    // Create concrete config for compilation
    // Take Development Config as a base, start with user config
    mergedConfig = config.dev;
    if(config.user) {
      mergedConfig = _.merge(mergedConfig, config.user);
    }

    if(isProductionEnv) {
      mergedConfig = _.merge(mergedConfig, config.user);
    }

    return mergedConfig;
  }

  /**
   * Fills the configs with aggregated paths e.g. abolute project path
   * @param {object} config web-build-kit config
   */
  function setPaths(config){
    config.srcAbsolute = path.join(process.env.PWD, config.src);
    config.destAbsolute = path.join(process.env.PWD, config.dest);
    return config;
  }
}

module.exports = configure;
