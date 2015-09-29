'use strict';

var plumber       = require('gulp-plumber');
var sass          = require('gulp-sass');
var replace       = require('gulp-replace');
var rename        = require('gulp-rename');
var merge         = require('merge-stream');
var browserSync   = require('browser-sync').create();
var handleErrors  = require('../../util/handleErrors');
var helper        = require('../../util/helpers')();

module.exports = function(gulp, config){
  var src, dest, entries, options;
  src = config.styles.options.sass.src;
  dest = config.options.tmpDir;
  entries = Object.getOwnPropertyNames(src);

  options = helper.copyLiteral(config.styles.options.sass);
  delete options.src;

  gulp.task('styles-sass', function() {
    var tasks = entries.map(function(bundleName){
      return gulp.src(src[bundleName])
        .pipe(plumber())
        .pipe(sass(options))
        .pipe(rename(bundleName + '.sass.css'))
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
