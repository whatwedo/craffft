'use strict';

var plumber       = require('gulp-plumber');
var less          = require('gulp-less');
var replace       = require('gulp-replace');
var rename        = require('gulp-rename');
var merge         = require('merge-stream');
var browserSync   = require('browser-sync').create();
var handleErrors  = require('../../util/handleErrors');
var helper        = require('../../util/helpers')();

module.exports = function(gulp, config){
  var src, dest, entries, options;
  src = helper.getSrcPath(config, config.styles.options.less.src);
  dest = config.options.tmpDir;
  entries = Object.getOwnPropertyNames(src);

  options = helper.copyLiteral(config.styles.options.less);
  delete options.src;

  gulp.task('styles-less', function() {
    var gulpLessConfig = createConfig(config);
    var tasks = entries.map(function(bundleName){
      return gulp.src(src[bundleName])
        .pipe(plumber())
        .pipe(less(gulpLessConfig))
        .pipe(rename(bundleName + '.less.css'))
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

  /**
   * Creates a config for gulp-less out of craffft-config
   * @param  {object} config craffft config
   * @return {object}        gulp-less config
   */
  function createConfig(config){
    return {
      paths: [config.src]
    };
  }
};
