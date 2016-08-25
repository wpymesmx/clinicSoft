'use strict';

var commonService = require('./CommonService.js');

var paths = {
  getAllPersonal: '/admin/personal/getAllPersonal',
  getPersonalByFilter: '/admin/personal/getPersonalByFilter',
  insertPersonal: '/admin/personal/insert_personal',
  updatePersonal: '/admin/personal/update_personal'
};

var PersonalService = {
  getAllPersonal: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.getAllPersonal, params, onSuccess, onError, onFail);
  },
  getPersonalByFilter: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.getPersonalByFilter, params, onSuccess, onError, onFail);
  },
  insertPersonal: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.insertPersonal, params, onSuccess, onError, onFail);
  },
  updatePersonal: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.updatePersonal, params, onSuccess, onError, onFail);
  }
};

module.exports = PersonalService;
