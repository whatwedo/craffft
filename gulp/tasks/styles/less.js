'use strict'

var plumber = require('gulp-plumber')
var less = require('gulp-less')
var browserSync = require('browser-sync').create()
var handleErrors = require('../../util/handleErrors')
var helper = require('../../util/helpers')()
var gutil = require('gulp-util')

module.exports = function (gulp, config) {
  var src, dest, options
  src = helper.getSrcPath(config, config.styles.options.less.src)
  dest = config.dest

  options = helper.copyLiteral(config.styles.options.less)
  delete options.src

  gutil.log(src)

  gulp.task('styles-less', function () {
    return gulp.src(src, { base: config.src })
      .pipe(plumber())
      .pipe(less(options))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.stream())
      // .pipe(autoprefixer(config.autoprefixer.options))                     // TODO: Add to style task
      // .pipe(gulpif(argv.prod, minifycss(minifyOptions.prod)))
      // .pipe(sourcemaps.init({loadMaps: true }))
      // .pipe(sourcemaps.write('.', { includeConent: false,  sourceRoot: '.' }))
      // .pipe(replace(/{PKG_VERSION}/g,  config.options.version))
      // .pipe(gulp.dest(dest))
      .on('error', handleErrors)
  })
}
