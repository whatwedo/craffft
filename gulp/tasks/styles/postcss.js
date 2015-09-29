'use strict';

var postcss = require('gulp-postcss');
var rename  = require('gulp-rename');
var merge   = require('merge-stream');
var helper  = require('../../util/helpers');
var handleErrors  = require('../../util/handleErrors');

module.exports = function(gulp, config){
  var src, dest, entries, options;
  src = helper().getSrcPath(config, config.styles.src);
  dest = config.options.tmpDir;
  entries = Object.getOwnPropertyNames(src);

  gulp.task('styles-postcss', function () {
    var processors = [];

    config.styles.options.postcss.processors.forEach(function(processor){
      if(typeof processor === 'string') {
        switch (processor) {
          case 'autoprefixer':
          processors.push(require('autoprefixer')(config.styles.options.autoprefixer));
          break;
          case 'cssnext' || 'postcss-import':
          processors.push(require(processor)());
          break;
          default:
          processors.push(require(processor));
        }
      } else {
        processors.push(processor);
      }
    });

    var tasks = entries.map(function(bundleName){
      return gulp.src(src[bundleName])
      .pipe(postcss(processors))
      .pipe(rename(bundleName + '.post.css'))
      .pipe(gulp.dest(dest))
      .on('error', handleErrors);
    });

    return merge(tasks);
  });
};
