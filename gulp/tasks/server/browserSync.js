'use strict';
var browserSync = require('browser-sync');

module.exports = function(gulp, config){
  gulp.task('server-browser-sync', ['build'], function() {
    browserSync(config.server.options.browserSync);
  });
};
