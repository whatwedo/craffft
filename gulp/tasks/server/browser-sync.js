var gulp = require('gulp')
var config = require('../../config')
var browserSync = require('browser-sync').create()

var browserSyncTask = function () {
  var browserSyncConfig
  browserSyncConfig = config.server.options.browserSync

  if (!browserSyncConfig.proxy && !browserSyncConfig.server) {
    browserSyncConfig.server = {
      baseDir: config.dest
    }
  }

  browserSync.init(browserSyncConfig)
}

gulp.task('server:browser-sync', browserSyncTask)
module.exports = browserSyncTask
