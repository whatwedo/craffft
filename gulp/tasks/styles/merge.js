'use strict';

var concat = require('gulp-concat');
var _ = require('lodash');
var merge         = require('merge-stream');
var reload        = require('browser-sync').reload;
var handleErrors  = require('../../util/handleErrors');
var path    = require('path');

module.exports = function(gulp, config){
  var bundles, cssBundles, stylusBundles, sassBundles, src, dest;

  src = config.options.tmpDir;
  dest = config.styles.dest;
  cssBundles = [];
  stylusBundles = [];
  sassBundles = [];

  gulp.task(
    'styles-merge',
    [
      'styles-stylus',
      'styles-postcss'
    ],
    function () {
      cssBundles = Object.getOwnPropertyNames(config.styles.src);

      // Gather all bundle names from all processors
      if(config.styles.preprocessors && config.styles.preprocessors.length > 0){
        if(config.styles.preprocessors.indexOf('stylus') > -1){
          // TODO: Add a check for non-object definition e.g. string or array
          stylusBundles = Object.getOwnPropertyNames(config.styles.options.stylus.src);
        }

        if(config.styles.preprocessors.indexOf('sass') > -1){
          // TODO: Add a check for non-object definition e.g. string or array
          sassBundles = Object.getOwnPropertyNames(config.styles.options.sass.src);
        }
      }

      bundles = _.union(cssBundles, stylusBundles, sassBundles);

      var tasks = bundles.map(function(name){
        var files = [];

        if(stylusBundles.indexOf(name) > -1){
          files.push(path.join(src, name + '.sass.css'));
        }

        if(stylusBundles.indexOf(name) > -1){
          files.push(path.join(src, name + '.stylus.css'));
        }

        if(cssBundles.indexOf(name) > -1) {
          files.push(path.join(src, name + '.post.css'));
        }

        return gulp.src(files)
        .pipe(concat(name + '.css'))
        .pipe(gulp.dest(config.dest))
        .pipe(reload({
          stream: true
        }))
        .on('error', handleErrors);
      });

      return merge(tasks);
    });
  };
