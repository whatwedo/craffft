var browserSync = require('browser-sync').create();

module.exports = function(gulp, config){
  'use strict';

  var browserSyncConfig;
  browserSyncConfig = config.server.options.browserSync;

  if(!browserSyncConfig.proxy && !browserSyncConfig.server){
    browserSyncConfig.server = {
      baseDir: config.dest
    };
  }

  gulp.task('server-browser-sync', ['build'], function() {
    browserSync(browserSyncConfig);
  });
};
