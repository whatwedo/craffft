/**
 * Thanks to Dan Tello from gulp-starter for the original code.
 * https://github.com/vigetlabs/gulp-starter/
 */

module.exports = function(milliseconds) {
  'use strict';

  if(milliseconds > 999) {
    return (milliseconds / 1000).toFixed(2) + ' s';
  } else {
    return milliseconds + ' ms';
  }
};
