'use strict';

var ErrorControlMixin = function() {
  return {
    onError: function(response) {
      console.log('#response->' + response);
    },
    onFail: function(response) {
      console.log('#response->' + response);
    }
  };
};

module.exports = ErrorControlMixin;
