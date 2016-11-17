'use strict';

var Context = function() {
  var map = {};

  return {
    put: function(name, obj) {
      map[name] = obj;
    },
    get: function(name) {
      var obj = undefined;
      
      if(map[name] != undefined) {
        obj = map[name];
      }

      return obj;
    },
    clean: function() {
      map = {};
    },
    remove: function(name) {
      map[name] = undefined;
    }
  };
};

module.exports = Context;
