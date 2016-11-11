var path = require('path')
var gutil = require('gulp-util')
var glob = require('glob')
var _ = require('lodash')
var webpack = require('webpack')

function helpers () {
  var babelSettings = 'cacheDirectory=true,presets[]=es2015'

  return {
    copyLiteral: copyLiteral,
    recursiveFindByKeyInObj: recursiveFindByKeyInObj,
    searchReplaceInObjByKey: searchReplaceInObjByKey,
    getDestPath: getDestPath,
    getSrcPath: getSrcPath,
    getWebpackLoaders: getWebpackLoaders,
    getWebpackBundles: getWebpackBundles,
    getWebpackTaskConfig: getWebpackTaskConfig,
    getJavascriptFiles: getJavascriptFiles
  }

  function copyLiteral (o) {
    var copy = Object.create(Object.getPrototypeOf(o))
    var propNames = Object.getOwnPropertyNames(o)

    propNames.forEach(function (name) {
      var desc = Object.getOwnPropertyDescriptor(o, name)
      Object.defineProperty(copy, name, desc)
    })

    return copy
  }

  function recursiveFindByKeyInObj (obj, key, cb) {
    for (var property in obj) {
      if (property === key) {
        if (cb) {
          cb(obj, key)
        }
      }
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[ property ] === 'object') {
          recursiveFindByKeyInObj(obj[ property ], key, cb)
        } else {
          // console.log(property + "   " + obj[ property ])
        }
      }
    }
  }

  function searchReplaceInObjByKey (obj, key, cb) {
    for (var property in obj) {
      if (property === key) {
        if (cb) {
          obj[key] = cb(obj, key)
        }
      }
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] === 'object') {
          obj[property] = searchReplaceInObjByKey(obj[property], key, cb)
        } else {
          // console.log(property + "   " + obj[ property ])
        }
      }
    }

    return obj
  }

  function getDestPath (config, dest) {
    return getFullPath(config, dest, 'dest')
  }

  function getSrcPath (config, src) {
    return getFullPath(config, src, 'src')
  }

  /**
   * Processes the config.javascript.preprocessors array to webpack loaders
   * @param  {array} preprocessors List of preprocessors
   * @return {{extensions: Array, loaders: Array}} List of webpack loaders
   */
  function getWebpackLoaders (preprocessors, config) {
    if (preprocessors) {
      if (preprocessors.indexOf('typescript') > -1) {
        config.resolve.extensions.push('.ts', '.tsx')
        config.module.loaders[0].loader += '!ts-loader'
        config.module.loaders[0].test = /\.ts(x?)$/
      }
    }

    return config
  }

  /**
   * Creates webpack bundle object out of array of files
   * @param {array} files An array of files and/or globs
   * @param {bool} flat Flatten file structure to root directory
   * @returns {{}}
   */
  function getWebpackBundles (files, flat, base) {
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
      var fileDest = fileInfo.dir && !flat ? path.join(path.relative(base, fileInfo.dir), fileInfo.name) : fileInfo.name

      webpackEntries[ fileDest ] = './' + path.relative(base, fileSrc)
    })

    return webpackEntries
  }

  /**
   * Creates default webpack config out of craffft config
   * @param  {object} config craffft config
   * @return {object}        webpack config
   */
  function getWebpackTaskConfig (config) {
    var files = getJavascriptFiles(config.javascript.src, config.src)
    var webpackBundles = getWebpackBundles(files, config.javascript.options.flatten, config._srcAbsolute)

    var webpackConfig = {
      context: config._srcAbsolute,
      entry: webpackBundles,
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
          loader: 'babel?' + babelSettings
        } ]
      }
    }

    if (config.options.sourceMaps && !config._isBuild) {
      webpackConfig.devtool = 'source-map'
    }

    webpackConfig = getWebpackLoaders(config.javascript.preprocessors, webpackConfig)

    if (config._isBuild) {
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        new webpack.NoErrorsPlugin()
      )
    }

    return webpackConfig
  }

  /**
   * Adds the config.src to a path
   * @param  {[type]} src [description]
   * @return {[type]}     [description]
   */
  function getFullPath (config, src, location) {
    var validSrc, root

    switch (location) {
      case 'src':
        root = config.src
        break
      case 'dest':
        root = config.dest
        break
      default:
        root = config.dest
        break
    }

    // For single file
    if (typeof src === 'string') {
      validSrc = path.resolve(root, src)
    }

    // For multiple files
    if (src.constructor === Array) {
      validSrc = []
      src.forEach(function (entry) {
        validSrc.push(path.resolve(root, entry))
      })
    }

    // For bundles
    if (src.constructor.name === 'Object') {
      var bundles = copyLiteral(src)
      var bundleNames = Object.getOwnPropertyNames(bundles)
      bundleNames.forEach(function (name) {
        if (Array.isArray(bundles[ name ])) {
          var validEntries = []
          bundles[ name ].forEach(function (srcPath) {
            validEntries.push(path.resolve(root, srcPath))
          })
          bundles[ name ] = validEntries
        } else if (typeof bundles[ name ] === 'string') {
          bundles[ name ] = path.resolve(root, bundles[ name ])
        }
      })

      validSrc = bundles
    }

    return validSrc
  }

  /**
   * Gets list of JavaScript files from system, as defined in config
   * @param {array|string} files Glob pattern, file or list of files
   * @param {string} root The base folder to start searching
   * @returns {Array}
   */
  function getJavascriptFiles (files, root) {
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
      })

      for (var i = 0; i < globOptions.ignore.length; i++) {
        // Remove ! to add it to glob ingore
        globOptions.ignore[ i ] = globOptions.ignore[ i ].replace('!', '')
      }
    } else if (isObjSrc) {
      gutil.error("There's an error in the JavaScript 'src' configuration. Object is not a valid file.")
    }

    patterns.forEach(function (pattern) {
      fileList = fileList.concat(glob.sync(pattern, globOptions))
    })

    return fileList
  }
}

module.exports = helpers
