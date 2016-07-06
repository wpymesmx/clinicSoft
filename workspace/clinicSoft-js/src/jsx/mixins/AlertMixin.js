'use strict';

var ControlText = require('../utils/ControlText.js');

var AlertMixin = function() {
 return {
    subscribeAlert: function(name, subscriberFun) {
      if(window.alertListener != undefined) {
        window.alertListener.subscribe(name, subscriberFun);
      }
    },
    unSubscribeAlert: function(name) {
      if(window.alertListener != undefined) {
        window.alertListener.unSubscribe(name);
      }
    },
    putMessageAlert: function(message) {
      if(window.alertListener != undefined) {
        window.alertListener.putMessage(message);
      }
    },
    showInfo: function(message) {
      if(window.alertListener != undefined) {
        window.alertListener.putMessage({
          show: true,
          title: 'Info',
          message: message,
          button_yes: true
        });
      }
    },
    showError: function(message) {
      if(window.alertListener != undefined) {
        window.alertListener.putMessage({
          show: true,
          title: 'Error',
          message: message,
          button_yes: true
        });
      }
    },
    onError: function(response) {
      if(window.alertListener != undefined) {
        window.alertListener.putMessage({
          show: true,
          title: 'Error',
          message: response.message,
          button_yes: true
        });
      }
    },
    onFail: function(response) {
      if(window.alertListener != undefined) {
        window.alertListener.putMessage({
          show: true,
          title: 'Error',
          message: ControlText().getText('MSG_103'),
          button_yes: true
        });
      }
    }
  };
};

module.exports = AlertMixin;
