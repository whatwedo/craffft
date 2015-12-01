'use strict';

var markdown      = require('gulp-markdown');
var handleErrors  = require('../util/handleErrors');
var helper  = require('../util/helpers');

module.exports = changelog;
function changelog(gulp, config){
  var src = helper().getSrcPath(config, config.changelog.src);
  var dest = config.dest;
  gulp.task('changelog', function() {
    return gulp.src(src)
    .pipe(markdown())
    .pipe(gulp.dest(dest))
    .on('error', handleErrors);
  });
}
