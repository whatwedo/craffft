var gulp = require('gulp')
var config = require('../../config')
var postcss = require('gulp-postcss')
var helper = require('../../util/helpers')
var handleErrors = require('../../util/handleErrors')

var postcssTask = function () {
  var src, dest
  src = helper().getSrcPath(config, config.styles.src)
  dest = config.dest
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
            url: false
          }))
          break
        default:
          processors.push(require(processor))
      }
    } else {
      processors.push(processor)
    }
  })

  return gulp.src(src, {base: config.src})
    .pipe(postcss(processors))
    .pipe(gulp.dest(dest))
    .on('error', handleErrors)
}

gulp.task('styles:postcss', postcssTask)
module.exports = postcssTask
