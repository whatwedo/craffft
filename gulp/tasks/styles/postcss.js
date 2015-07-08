'use strict';

var postcss = require('gulp-postcss');

module.exports = function(gulp, config){
  gulp.task('postcss', function () {
      var processors = [];

      config.postcss.processors.forEach(function(processor){
        switch (processor) {
          case 'autoprefixer':
            processors.push(require('autoprefixer-core')(config.autoprefixer.options));
            break;
          case 'cssnext' || 'postcss-import':
            processors.push(require(processor)());
            break;
          default:
            processors.push(require(processor));
        }
      });

      return gulp.src(config.postcss.src, { base: config.src })
          .pipe(postcss(processors))
          .pipe(gulp.dest(config.postcss.dist));
  });
};
