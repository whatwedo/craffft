'use strict'
var changed = require('gulp-changed')
var imagemin = require('gulp-imagemin')
var helper = require('../util/helpers')

module.exports = images
function images (gulp, config) {
  var plugins = []
  var src = helper().getSrcPath(config, config.images.src)
  var dest = config.dest

  config.images.options.use.forEach(function (plugin) {
    plugins.push(require(plugin)())
  })
  config.images.options.use = plugins

  gulp.task('images', function () {
    return gulp.src(src, {base: config.src})
      .pipe(changed(dest)) // Ignore unchanged files
      .pipe(imagemin(config.images.options)) // Optimize
      .pipe(gulp.dest(dest))
  })
}
