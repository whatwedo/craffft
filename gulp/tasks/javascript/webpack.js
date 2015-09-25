var webpack = require('webpack');
var path    = require('path');
var logger  = require('../../util/compileLogger');

function gulpCompileWebpack(gulp, config){
  'use strict';
  var webpackConfig;

  gulp.task('javascript-webpack', webpackTask);
  webpackConfig = {
    context: config.srcAbsolute,
    entry: config.javascript.src,
    output: {
      path: config.javascript.dest,
      filename: '[name].js'
    },
    plugins: [],
    resolve: {
      root: [
        path.join(process.env.PWD, 'node_modules')
      ],
      extensions: ['', '.js']
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader'
        }
      ]
    }
  };

  function webpackTask(callback){
    webpack(webpackConfig, function(err, stats) {
      logger(err, stats);
      callback();
    });
  }
}

module.exports = gulpCompileWebpack;
