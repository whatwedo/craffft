/**
 * This folder contains all modules that create and run servers
 * for development and testing.
 */

module.exports = function(gulp, config){
  'use strict';

  require('./browserSync')(gulp, config);

  var tasks = [];

  // Compile stylus if configured
  if(config.server.plugins.indexOf('browserSync') > -1){
    tasks.unshift('server-browser-sync');
  }

  gulp.task('server', tasks);
};
