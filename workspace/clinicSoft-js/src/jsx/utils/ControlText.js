'use strict';

var diccionario = require('../utils/Diccionario.js');

var ControlText = function() {
  return {
    getText: function(textCode) {
      return diccionario[window.language][textCode];
    }
  };
};

module.exports = ControlText;
