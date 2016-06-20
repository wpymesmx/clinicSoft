'use strict';

var commonService = require('./CommonService.js');

var paths = {
  login: '/login'
};

var LoginService = {
  login: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.login, params, onSuccess, onError, onFail);
  }
};

module.exports = LoginService;
