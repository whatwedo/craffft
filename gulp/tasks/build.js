'use strict';

module.exports = function(gulp){
  gulp.task('build', [
    'javascript',
    'styles',
    'images',
    'markup',
    'copy',
    'changelog'
  ]);
};
