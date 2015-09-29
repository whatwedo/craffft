var path = require('path');
var gutil = require('gulp-util');

function helpers(){
  'use strict';

  return {
    copyLiteral: copyLiteral,
    getDestPath: getDestPath,
    getSrcPath: getSrcPath
  };

  function copyLiteral(o) {
    var copy = Object.create(Object.getPrototypeOf(o));
    var propNames = Object.getOwnPropertyNames(o);

    propNames.forEach(function(name) {
      var desc = Object.getOwnPropertyDescriptor(o, name);
      Object.defineProperty(copy, name, desc);
    });

    return copy;
  }

  function getDestPath(config, dest){
    return getFullPath(config, dest, 'dest');
  }

  function getSrcPath(config, src){
    return getFullPath(config, src, 'src');
  }

  /**
   * Adds the config.src to a path
   * @param  {[type]} src [description]
   * @return {[type]}     [description]
   */
  function getFullPath(config, src, location){
    var validSrc, root;

    switch(location){
      case 'src':
        root = config.src;
        break;
      case 'dest':
        root = config.dest;
        break;
      default:
        root = config.dest;
        break;
    }

    // For single file
    if(typeof src === 'string'){
      validSrc = path.resolve(root, src);
    }

    // For multiple files
    if(src.constructor === Array){
      validSrc = [];
      src.forEach(function(entry){
        validSrc.push(path.resolve(root, entry));
      });
    }

    // For bundles
    if(src.constructor.name === 'Object'){
      var bundles = copyLiteral(src);
      var bundleNames = Object.getOwnPropertyNames(bundles);
      bundleNames.forEach(function(name){
        var validEntries = [];
        bundles[name].forEach(function(srcPath){
          validEntries.push(path.resolve(root, srcPath));
        });
        bundles[name] = validEntries;
      });

      validSrc = bundles;
    }

    return validSrc;
  }
}

module.exports = helpers;
