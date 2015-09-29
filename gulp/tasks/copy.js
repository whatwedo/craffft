'use strict';
var handleErrors = require('../util/handleErrors');
var helper  = require('../util/helpers');

module.exports = function(gulp, config){
	var src = helper().getSrcPath(config, config.copy.src);
	var dest = config.dest;
	gulp.task('copy-all', function() {

		return gulp.src(src, {base: config.src})
		.pipe(gulp.dest(dest))
		.on('error', handleErrors);
	});

	gulp.task('copy', ['copy-all']);
};
