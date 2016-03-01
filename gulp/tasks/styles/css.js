var gulp = require('gulp')
var config = require('../../config')
var postcss = require('gulp-postcss')
var sourcemaps = require('gulp-sourcemaps')
var nano = require('gulp-cssnano')
var handleErrors = require('../../util/handleErrors')
var gutil = require('gulp-util')

var postcssTask = function () {
  var src = config.styles.src
  var dest = config.dest
  var compress = config._isBuild
  var processors = []

  config.styles.options.postcss.processors.forEach(function (processor) {
    if (typeof processor === 'string') {
      switch (processor) {
        case 'autoprefixer':
          processors.push(require('autoprefixer')(config.styles.options.autoprefixer))
          break
        case 'postcss-import':
          processors.push(require(processor)({ glob: true }))
          break
        case 'cssnext' || 'postcss-cssnext':
          processors.push(require('postcss-cssnext')({
            // Do not rewrite url() values
            url: false,
            compress: compress
          }))
          break
        default:
          processors.push(require(processor))
      }
    } else {
      processors.push(processor)
    }
  })

  if (config._isBuild) {
    return gulp.src(src, { base: config.src })
      .pipe(postcss(processors))
      .pipe(nano())
      .pipe(gulp.dest(dest))
      .on('error', handleErrors)
  }

  if (config.options.sourceMaps) {
    if (config._outputLog) {
      gutil.log('Write CSS Sourcemaps')
    }
    return gulp.src(src, { base: config.src })
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest))
        .on('error', handleErrors)
  }

  return gulp.src(src, { base: config.src })
    .pipe(postcss(processors))
    .pipe(gulp.dest(dest))
    .on('error', handleErrors)
}

gulp.task('styles:css', postcssTask)
module.exports = postcssTask
