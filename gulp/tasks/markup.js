'use strict';
var replace = require('gulp-replace');
var helper  = require('../util/helpers');

module.exports = markup;
function markup(gulp, config){
  var src = helper().getSrcPath(config, config.markup.src);
  gulp.task('markup', function() {
    return gulp.src(src, {base: config.src})
    .pipe(replace(/{PKG_VERSION}/g, config.options.version))
    .pipe(gulp.dest(config.dest));
  });
}
