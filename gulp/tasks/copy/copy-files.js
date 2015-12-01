'use strict';
var handleErrors = require('../../util/handleErrors');
var helper = require('../../util/helpers');
var _ = require('lodash');

module.exports = function (gulp, config) { 
	var src = config.copy.src;
  var dest = config.dest;
  
  function task() {
    return gulp.src(src, {base: config.src})
      .pipe(gulp.dest(dest))
      .on('error', handleErrors);
  }
  
  return task;
};
