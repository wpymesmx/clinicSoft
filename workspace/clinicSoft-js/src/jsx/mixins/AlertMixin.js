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
    showInfo: function(message, options) {
      if(window.alertListener != undefined) {
        var zindex = 10;
        var title = 'Info';

        if(options != undefined) {
          if(options.zindex != undefined) {
            zindex = options.zindex;
          }

          if(options.title != undefined) {
            title = options.title;
          }
        }

        window.alertListener.putMessage({
          show: true,
          title: title,
          message: message,
          button_yes: true,
          zindex: zindex
        });
      }
    },
    showError: function(message, options) {
      if(window.alertListener != undefined) {
        var zindex = 10;
        var title = 'Error';

        if(options != undefined) {
          if(options.zindex != undefined) {
            zindex = options.zindex;
          }

          if(options.title != undefined) {
            title = options.title;
          }
        }

        window.alertListener.putMessage({
          show: true,
          title: title,
          message: message,
          button_yes: true,
          zindex: zindex
        });
      }
    },
    onError: function(response, options) {
      if(window.alertListener != undefined) {
        var zindex = 10;
        var title = 'Error';

        if(options != undefined) {
          if(options.zindex != undefined) {
            zindex = options.zindex;
          }

          if(options.title != undefined) {
            title = options.title;
          }
        }

        window.alertListener.putMessage({
          show: true,
          title: title,
          message: response.message,
          button_yes: true,
          zindex: zindex
        });
      }
    },
    onFail: function(response, options) {
      if(window.alertListener != undefined) {
        var zindex = 10;
        var title = 'Error';

        if(options != undefined) {
          if(options.zindex != undefined) {
            zindex = options.zindex;
          }

          if(options.title != undefined) {
            title = options.title;
          }
        }
        
        window.alertListener.putMessage({
          show: true,
          title: title,
          message: response,
          button_yes: true,
          zindex: zindex
        });
      }
    }
  };
};

module.exports = AlertMixin;
