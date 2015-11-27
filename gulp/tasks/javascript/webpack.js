var webpack = require('webpack');
var path    = require('path');
var _       = require('lodash');
var gutil   = require('gulp-util');
var helper  = require('../../util/helpers')
var logger  = require('../../util/compileLogger');

function gulpCompileWebpack(gulp, config){
  'use strict';

  gulp.task('javascript-webpack', webpackTask);

  /**
  * Runs webpack task
  * @param  {Function} callback gulp callback function for in sync running
  * @return {void}              Nothing
  */
  function webpackTask(callback){
    var addons = getLoaders(config.javascript.preprocessors);
    var webpackConfig = createConfig(config, addons);

    webpack(webpackConfig, function(err, stats) {
      logger(err, stats);
      callback();
    });
  }

  /**
  * Creates default webpack config out of craffft config
  * @param  {object} config craffft config
  * @return {object}        webpack config
  */
  function getDefaults(config){

    return {
      //context: config.srcAbsolute,
      entry: helper().getSrcPath(config, config.javascript.src),
      output: {
        path: config.dest,
        filename: '[name].js'
      },
      plugins: [],
      resolve: {
        root: [
          path.join(process.env.PWD, 'node_modules')
        ],
        extensions: ['', '.webpack.js', '.web.js', '.js']
      },
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
                // https://github.com/babel/babel-loader#options
                cacheDirectory: true,
                presets: ['es2015']
            }
        }]
      }
    };
  }

  /**
  * Creates the webpack config to submit
  * @param  {Object} config  web-build.kit config
  * @param  {array}  loaders list of additional loaders
  * @return {object}         Valid webpack config
  */
  function createConfig(config, addons){
    var webpackConfig = getDefaults(config);
    if(addons){
      if(addons.extensions){
        webpackConfig.resolve.extensions = _.union(webpackConfig.resolve.extensions, addons.extensions);
      }

      if(addons.loaders){
        webpackConfig.module.loaders.push(addons.loaders);
      }
    }

    return webpackConfig;
  }

  /**
  * Processes the config.javascript.preprocessors array to webpack loaders
  * @param  {array} preprocessors List of preprocessors
  * @return {array}               List of webpack loaders
  */
  function getLoaders(preprocessors){
    var addons = {
      extensions: [],
      loaders: []
    };

    if(preprocessors){
      if(preprocessors.indexOf('typescript') > -1){
        addons.extensions = _.union(['.ts', '.tsx']);
        addons.loaders.push({
          test: /\.ts(x?)$/,
          loader: 'babel-loader!ts-loader'
        });
      }
    }

    return addons;
  }
}

module.exports = gulpCompileWebpack;
