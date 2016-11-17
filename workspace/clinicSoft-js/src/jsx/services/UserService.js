'use strict';

var commonService = require('./CommonService.js');

var paths = {
  getAllUsers: '/admin/user/getAllUsers'
};

var UserService = {
  getAllUsers: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.getAllUsers, params, onSuccess, onError, onFail);
  }
};

module.exports = UserService;
