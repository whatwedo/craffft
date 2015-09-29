'use strict';

var plumber       = require('gulp-plumber');
var stylus        = require('gulp-stylus');
var replace       = require('gulp-replace');
var rename        = require('gulp-rename');
var merge         = require('merge-stream');
var browserSync   = require('browser-sync').create();
var handleErrors  = require('../../util/handleErrors');
var helper        = require('../../util/helpers')();

module.exports = function(gulp, config){
  var src, dest, entries, options;
  src = helper.getSrcPath(config, config.styles.options.stylus.src);
  dest = config.options.tmpDir;
  entries = Object.getOwnPropertyNames(src);

  options = helper.copyLiteral(config.styles.options.stylus);
  delete options.src;

  gulp.task('styles-stylus', function() {
    var tasks = entries.map(function(bundleName){
      return gulp.src(src[bundleName])
        .pipe(plumber())
        .pipe(stylus(options))
        .pipe(rename(bundleName + '.stylus.css'))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream())
        // .pipe(autoprefixer(config.autoprefixer.options))                     // TODO: Add to style task
        //.pipe(gulpif(argv.prod, minifycss(minifyOptions.prod)))
        //.pipe(sourcemaps.init({loadMaps: true }))
        //.pipe(sourcemaps.write('.', { includeConent: false,  sourceRoot: '.' }))
        //.pipe(replace(/{PKG_VERSION}/g,  config.options.version))
        //.pipe(gulp.dest(dest))
        .on('error', handleErrors);
    });

    return merge(tasks);
  });
};
