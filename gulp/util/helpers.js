module.exports = function(){
  'use strict';

  return {
    copyLiteral: copyLiteral
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
};
