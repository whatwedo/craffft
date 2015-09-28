/**
 * This folder contains all modules that compile to JavaScript. This could
 * include syntaxes like TypeScript, CoffeeScript, ES6, ES7 and so on.
 */

module.exports = function(gulp, config){
  'use strict';

  // Compiles ES6 & TypeScript
  require('./webpack')(gulp, config);

  gulp.task('javascript', [
    'javascript-webpack'
  ]);
};
