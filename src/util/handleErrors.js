var notify = require('gulp-notify')
var gutil = require('gulp-util')

module.exports = function (errorObject, callback) {
  gutil.log(gutil.colors.red(errorObject.toString().split(': ').join(':\n')))

  /** DOES NOT WORK IN VAGRANT SETUP
  notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments)
  // Keep gulp from hanging on this task
  if (this && typeof this.emit === 'function') this.emit('end')
   **/
}
