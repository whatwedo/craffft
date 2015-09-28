'use strict';
var changed    = require('gulp-changed');
var imagemin   = require('gulp-imagemin');

module.exports = function(gulp, config){
  var plugins = [];

  config.images.options.use.forEach(function(plugin){
    plugins.push(require(plugin)());
  });
  config.images.options.use = plugins;

  gulp.task('images', function() {
    return gulp.src(config.images.src, {base: config.src})
      .pipe(changed(config.images.dest)) // Ignore unchanged files
      .pipe(imagemin(config.images.options)) // Optimize
      .pipe(gulp.dest(config.images.dest));
  });
};
