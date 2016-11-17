'use strict';

var AlertListener = function() {
  var subscribers = {};

  return {
    subscribe: function(name, subscriberFun) {
      subscribers[name] = subscriberFun;
    },
    unSubscribe: function(name) {
      subscribers[name] = undefined;
    },
    clean: function() {
      subscribers = {};
    },
    getSubscriber: function(name) {
      var obj = undefined;

      if(subscribers[name] != undefined) {
        obj = subscribers[name];
      }

      return obj;
    },
    putMessage: function(message) {
      //procesar el mensaje para cada subscriptor
      var subscriberFun = undefined;

      for(var key in subscribers) {
        subscriberFun = subscribers[key];

        if(subscriberFun != undefined) {
          subscriberFun(message);
        }
      }
    }
  };
};

module.exports = AlertListener;
