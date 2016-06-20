'use strict';

var NavigatorMixin = function() {
  return {
    subscribe: function(name, subscriberFun) {
      if(window.navigatorListener != undefined) {
        window.navigatorListener.subscribe(name, subscriberFun);
      }
    },
    unSubscribe: function(name) {
      if(window.navigatorListener != undefined) {
        window.navigatorListener.unSubscribe(name);
      }
    },
    putMessage: function(message) {
      if(window.navigatorListener != undefined) {
        window.navigatorListener.putMessage(message);
      }
    },
    goToComponent: function(componentName) {
      this.putMessage(componentName);
    }
  }
};

module.exports = NavigatorMixin;
