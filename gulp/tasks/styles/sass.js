'use strict'

var plumber = require('gulp-plumber')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()
var handleErrors = require('../../util/handleErrors')
var helper = require('../../util/helpers')()

module.exports = function (gulp, config) {
  var src, dest, options
  src = helper.getSrcPath(config, config.styles.options.sass.src)
  dest = config.dest

  options = helper.copyLiteral(config.styles.options.sass)
  delete options.src

  gulp.task('styles-sass', function () {
    return gulp.src(src, { base: config.src })
      .pipe(plumber())
      .pipe(sass(options))
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
