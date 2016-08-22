/**
 * This folder contains all modules that compile to JavaScript. This could
 * include syntaxes like TypeScript, CoffeeScript, ES6, ES7 and so on.
 */

var gulp = require('gulp')
var config = require('../../config')()
var gulpSequence = require('gulp-sequence')

var styleTaskList = function () {
  var tasks = []

  // Compile stylus if configured
  if (config.styles.preprocessors.indexOf('stylus') > -1) {
    tasks.unshift('styles:stylus')
  }

  // Compile sass if configured
  if (config.styles.preprocessors.indexOf('sass') > -1) {
    tasks.unshift('styles:sass')
  }

  // Compile less if configured
  if (config.styles.preprocessors.indexOf('less') > -1) {
    tasks.unshift('styles:less')
  }

  return gulpSequence(tasks, 'styles:css')
}

gulp.task('styles', styleTaskList())
module.exports = styleTaskList()
