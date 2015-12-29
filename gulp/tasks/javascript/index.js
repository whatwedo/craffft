/**
 * This folder contains all modules that compile to JavaScript. This could
 * include syntaxes like TypeScript, CoffeeScript, ES6, ES7 and so on.
 */

var gulp = require('gulp')
// var config = require('../../config')

var javascriptTaskList = function () {
  var tasks = ['javascript:webpack']

  return tasks
}

gulp.task('javascript', javascriptTaskList())
module.exports = javascriptTaskList()
