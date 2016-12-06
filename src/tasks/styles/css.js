var gulp = require('gulp')
var config = require('../../config')()
var postcss = require('gulp-postcss')
var sourcemaps = require('gulp-sourcemaps')
var glob = require('glob')
var path = require('path')
var nano = require('gulp-cssnano')
var replace = require('gulp-replace')
var handleErrors = require('../../util/handleErrors')
var gutil = require('gulp-util')

var postcssTask = function () {
  var src = config.styles.src
  var dest = config.dest
  var compress = config._isBuild
  var processors = []

  var versionPlaceholder = config.versioning.placeholder
  var hasStylesReplacement = config.versioning.replaceInStyles

  config.styles.options.postcss.processors.forEach(function (processor, index, configList) {
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
        case 'autoprefixer':
          // if CSSnext isn't used, use standalone autoprefixer package
          if (configList.indexOf('cssnext') === -1 && configList.indexOf('postcss-cssnext') === -1) {
            processors.push(require('autoprefixer')(config.styles.options.autoprefixer))
          }
          break
        case 'cssnext' || 'postcss-cssnext':
          var opts = {
            // Do not rewrite url() values
            url: false,
            compress: compress
          }

          // If CSSnext is used, run autoprefixer package of CSSnext instead of standalone          
          if (configList.indexOf('autoprefixer') > -1) {
            opts.browser = config.styles.options.autoprefixer.browser
          }

          processors.push(require('postcss-cssnext')(opts))
          break
        default:
          processors.push(require(processor))
      }
    } else {
      processors.push(processor)
    }
  })

  // Build Tasks
  if (config._isBuild) {
    if (hasStylesReplacement && versionPlaceholder) {
      return gulp.src(src, { base: config.src })
        .pipe(postcss(processors))
        .pipe(nano())
        .pipe(replace(new RegExp(versionPlaceholder, 'ig'), config.versioning.base))
        .pipe(gulp.dest(dest))
        .on('error', handleErrors)
    }

    return gulp.src(src, { base: config.src })
      .pipe(postcss(processors))
      .pipe(nano())
      .pipe(gulp.dest(dest))
      .on('error', handleErrors)
  }

  // Source Maps
  if (config.options.sourceMaps) {
    if (config._outputLog) {
      gutil.log('Write CSS Sourcemaps')
    }

    if (hasStylesReplacement && versionPlaceholder) {
      return gulp.src(src, { base: config.src })
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(replace(new RegExp(versionPlaceholder, 'ig'), config.versioning.base))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest))
        .on('error', handleErrors)
    }
    return gulp.src(src, { base: config.src })
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest))
        .on('error', handleErrors)
  }

  // Compile tasks
  if (hasStylesReplacement && versionPlaceholder) {
    return gulp.src(src, { base: config.src })
      .pipe(postcss(processors))
      .pipe(replace(new RegExp(versionPlaceholder, 'ig'), config.versioning.base))
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
