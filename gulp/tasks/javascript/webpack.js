var gulp = require('gulp')
var config = require('../../config')
var webpack = require('webpack')
var path = require('path')
var _ = require('lodash')
var gutil = require('gulp-util')
var glob = require('glob')
var helper = require('../../util/helpers')
var logger = require('../../util/compileLogger')

/**
 * Creates webpack bundle object out of array of files
 * @param {array}  Files
 */
var createWebpackBundles = function (files, flat) {
  var webpackEntries = {}

  // See https://github.com/webpack/webpack/issues/1189
  files.forEach(function (file) {
    /* Returns following info (example)
     {
     root : "/",
     dir : "/home/user/dir",
     base : "file.txt",
     ext : ".txt",
     name : "file"
     } */
    var fileInfo = path.parse(file)
    var fileSrc = file
    var fileDest = fileInfo.dir && !flat ? path.join(fileInfo.dir, fileInfo.name) : fileInfo.name

    webpackEntries[ fileDest ] = fileSrc
  })

  return webpackEntries
}

/**
 * Gets list of JavaScript files from system, as defined in config
 */
var getJavascriptFiles = function (files, root) {
  var globOptions = {}
  var patterns = []
  var fileList = []
  globOptions.cwd = root

  var isArraySrc = Array.isArray(files)
  var isStringSrc = !isArraySrc && typeof files === 'string'
  var isObjSrc = !isArraySrc && !isStringSrc

  if (isStringSrc) {
    patterns.push(files)
  } else if (isArraySrc) {
    patterns = files.filter(function (filePattern) {
      return filePattern.indexOf('!') === -1
    })

    // Find files to exclude, marked with a ! in the file array
    globOptions.ignore = files.filter(function (filePattern) {
      return filePattern.indexOf('!') !== -1
    });

    for (var i = 0; i < globOptions.ignore.length; i++) {
      // Remove ! to add it to glob ingore
      globOptions.ignore[ i ] = globOptions.ignore[ i ].replace('!', '')
    }
  } else if (isObjSrc) {
    gutil.error('There\'s an error in the JavaScript \'src\' configuration. Object is not a valid file.')
  }

  patterns.forEach(function (pattern) {
    _.merge(fileList, glob.sync(pattern, globOptions))
  })

  return fileList
}

/**
 * Creates default webpack config out of craffft config
 * @param  {object} config craffft config
 * @return {object}        webpack config
 */
var getDefaults = function (config) {
  var files = getJavascriptFiles(config.javascript.src, config.src)
  var webpackBundles = createWebpackBundles(files, config.javascript.options.flatten)

  return {
    // context: config.srcAbsolute,
    entry: helper().getSrcPath(config, webpackBundles),
    output: {
      path: config.dest,
      filename: '[name].js'
    },
    plugins: [],
    resolve: {
      root: [
        path.join(process.env.PWD, 'node_modules')
      ],
      extensions: [ '', '.webpack.js', '.web.js', '.js' ]
    },
    module: {
      loaders: [ {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: true,
          presets: [ 'es2015' ]
        }
      } ]
    }
  }
}

/**
 * Creates the webpack config to submit
 * @param  {Object} config  web-build.kit config
 * @param  {array}  loaders list of additional loaders
 * @return {object}         Valid webpack config
 */
var createConfig = function (config, addons) {
  var webpackConfig = getDefaults(config)
  if (addons) {
    if (addons.extensions) {
      webpackConfig.resolve.extensions = _.union(webpackConfig.resolve.extensions, addons.extensions)
    }

    if (addons.loaders) {
      webpackConfig.module.loaders.push(addons.loaders)
    }
  }

  return webpackConfig
}

/**
 * Processes the config.javascript.preprocessors array to webpack loaders
 * @param  {array} preprocessors List of preprocessors
 * @return {array}               List of webpack loaders
 */
var getLoaders = function (preprocessors) {
  var addons = {
    extensions: [],
    loaders: []
  }

  if (preprocessors) {
    if (preprocessors.indexOf('typescript') > -1) {
      addons.extensions = _.union([ '.ts', '.tsx' ])
      addons.loaders.push({
        test: /\.ts(x?)$/,
        loader: 'babel-loader!ts-loader'
      })
    }
  }

  return addons
}

var webpackProductionTask = function (callback) {
  var addons = getLoaders(config.javascript.preprocessors)
  var webpackConfig = createConfig(config, addons)

  webpack(webpackConfig, function (err, stats) {
    logger(err, stats)
    callback()
  })
}

gulp.task('javascript:webpack', webpackProductionTask)
module.exports = webpackProductionTask
