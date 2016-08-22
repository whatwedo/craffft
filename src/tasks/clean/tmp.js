var gulp = require('gulp')
var del = require('del')
var path = require('path')
var config = require('../../config')()
var gutil = require('gulp-util')

var cleanTmpTask = function (cb) {
  var files = []

  // Don't touch node_modules or source files!
  files.push(path.join(config._path, '/**/*'))

  del(files, { force: true }).then(function (paths) {
    cb()
  })
}
gulp.task('clean:temporary', cleanTmpTask)
module.exports = cleanTmpTask
