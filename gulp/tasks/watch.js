'use strict';
/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

module.exports = watch;
function watch(gulp, config){
  gulp.task('watch', ['watchify', 'browserSync'], function() {
    gulp.watch(config.stylus.src, ['stylus']);
    gulp.watch(config.postcss.src, ['postcss']);
    gulp.watch(config.changelog.src, ['changelog']);
    gulp.watch(config.images.src, ['images']);
    gulp.watch(config.svg.src, ['svg']);
    gulp.watch(config.markup.src, ['markup']);
    gulp.watch(config.copy.src, ['copy']);
  });
}
