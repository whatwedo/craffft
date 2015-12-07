'use strict'
/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var watch = require('gulp-watch')
var path = require('path')

/*
module.exports = watch
function watch (gulp, config) {
  gulp.task('watch', ['watchify', 'browserSync'], function () {
    gulp.watch(config.stylus.src, ['stylus'])
    gulp.watch(config.postcss.src, ['postcss'])
    gulp.watch(config.changelog.src, ['changelog'])
    gulp.watch(config.images.src, ['images'])
    gulp.watch(config.svg.src, ['svg'])
    gulp.watch(config.markup.src, ['markup'])
    gulp.watch(config.copy.src, ['copy'])
  })
} */

var watchTask = function (gulp, config) {
  var watchableTasks = ['styles', 'images', 'markup', 'copy']

  watchableTasks.forEach(function (taskName) {
    var task = config[taskName]
    if (task) {
      var sub = []
      if (taskName === 'styles') {
        sub.push(task.options.stylus.src)
        sub.push(task.options.sass.src)
        sub.push(task.options.less.src)
      }
      sub.forEach(function (subGlob) {
        watch(subGlob, function () {
          require('./' + taskName)()
        })
      })
      watch(task.src, function () {
        require('./' + taskName)()
      })
    }
  })

  gulp.task('watch', ['browserSync'], watchTask)
}

// gulp.task('watch', ['browserSync'], watchTask)
module.exports = watchTask
