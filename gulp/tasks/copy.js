'use strict';
var handleErrors = require('../util/handleErrors');

module.exports = function(gulp, config){
	gulp.task('copy-all', function() {
		var src = config.copy.src;
		var dest = config.copy.dest;

		return gulp.src(src, {base: config.src})
		.pipe(gulp.dest(dest))
		.on('error', handleErrors);
	});

	gulp.task('copy', ['copy-all']);
};
