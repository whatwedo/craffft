'use strict'

var postcss = require('gulp-postcss')
var helper = require('../../util/helpers')
var handleErrors = require('../../util/handleErrors')

module.exports = function (gulp, config) {
  var src, dest
  src = helper().getSrcPath(config, config.styles.src)
  dest = config.dest

  gulp.task('styles-postcss', function () {
    var processors = []

    config.styles.options.postcss.processors.forEach(function (processor) {
      if (typeof processor === 'string') {
        switch (processor) {
          case 'autoprefixer':
            processors.push(require('autoprefixer')(config.styles.options.autoprefixer))
            break
          case 'cssnext' || 'postcss-import':
            processors.push(require(processor)())
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
  })
}
