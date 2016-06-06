var gulp = require('gulp')
var config = require('../../config')
var webpack = require('webpack')
var path = require('path')
var _ = require('lodash')
var gutil = require('gulp-util')
var glob = require('glob')
var helper = require('../../util/helpers')()
var logger = require('../../util/compileLogger')

var webpackProductionTask = function (callback) {
  var webpackConfig = helper.getWebpackTaskConfig(config)
  if (config._outputLog) {
    gutil.log('Webpack Config:')
    gutil.log(webpackConfig)
  }

  webpack(webpackConfig, function (err, stats) {
    logger(err, stats)
    // stats.toString({ chunks: false })
    callback()
  })
}

gulp.task('javascript:webpack', webpackProductionTask)
module.exports = webpackProductionTask
