var gulp = require('gulp')
var del = require('del')
var path = require('path')
var config = require('../../config')

var cleanTmpTask = function (cb) {
  var files = []

  // Don't touch node_modules or source files!
  files.push(path.join(config._path, '/**/*'))

  del(files).then(function (paths) {
    // console.log(paths)
    cb()
  })
}
gulp.task('clean:temporary', cleanTmpTask)
module.exports = cleanTmpTask
