var gulp = require('gulp')
var config = require('../../config')
var handleErrors = require('../../util/handleErrors')

var copyFilesTask = function () {
  var src = config.copy.src
  var dest = config.dest

  return gulp.src(src, {base: config.src})
    .pipe(gulp.dest(dest))
    .on('error', handleErrors)
}

gulp.task('copy:files', copyFilesTask)
module.exports = copyFilesTask
