'use strict';

var diccionario = require('../utils/Diccionario.js');

var LanguageMixin = function() {
  return {
    subscribeLanguage: function(name, subscriberFun) {
      if(window.languageListener != undefined) {
        window.languageListener.subscribe(name, subscriberFun);
      }
    },
    unSubscribeLanguage: function(name) {
      if(window.languageListener != undefined) {
        window.languageListener.unSubscribe(name);
      }
    },
    changeLanguage: function(language) {
      if(window.languageListener != undefined) {
        window.languageListener.putMessage(language);
      }
    },
    changeSessionLanguage: function(language) {
      window.language = language;
      this.setState({language: language});
    },
    getText: function(textCode) {
      return diccionario[this.state.language][textCode];
    }
  }
};

module.exports = LanguageMixin;
