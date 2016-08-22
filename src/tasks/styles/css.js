var gulp = require('gulp')
var config = require('../../config')()
var postcss = require('gulp-postcss')
var sourcemaps = require('gulp-sourcemaps')
var glob = require('glob')
var path = require('path')
var nano = require('gulp-cssnano')
var handleErrors = require('../../util/handleErrors')
var gutil = require('gulp-util')
var autoprefixer = require('gulp-autoprefixer')

var postcssTask = function () {
  var src = config.styles.src
  var dest = config.dest
  var compress = config._isBuild
  var processors = []

  config.styles.options.postcss.processors.forEach(function (processor) {
    if (typeof processor === 'string') {
      switch (processor) {
        case 'postcss-import':
          processors.push(require(processor)({
            resolve: function (id, base) {
              var output = glob.sync(path.join(base, id))
              if (config._outputLog) {
                gutil.log('Resolve CSS Imports')
                gutil.log(output)
              }
              return output
            }
          }))
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
      .pipe(autoprefixer(config.styles.options.autoprefixer))
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
        .pipe(autoprefixer(config.styles.options.autoprefixer))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest))
        .on('error', handleErrors)
  }

  return gulp.src(src, { base: config.src })
    .pipe(postcss(processors))
    .pipe(autoprefixer(config.styles.options.autoprefixer))
    .pipe(gulp.dest(dest))
    .on('error', handleErrors)
}

gulp.task('styles:css', postcssTask)
module.exports = postcssTask
