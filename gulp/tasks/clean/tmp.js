var del  = require('del');
var path = require('path');

module.exports = function(gulp, config){
  'use strict';

  gulp.task('clean-temporary', ['styles-merge'], function (cb) {
    var files = [
      config.options.tmpDir + '/**'
    ];

    // Don't touch node_modules or source files!
    files.push(path.join(config.options.tmpDir, '/**/*'));

    del(files).then(function (paths) {
      // console.log(paths)
      cb();
    });
  });
};
