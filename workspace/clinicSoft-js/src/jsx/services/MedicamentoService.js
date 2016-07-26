'use strict';

var commonService = require('./CommonService.js');

var paths = {
  buscar: '/admin/medicamento/buscar',
  insertar: '/admin/medicamento/insertar',
  llenarCombo: '/admin/medicamento/llenarCombo'
};

var MedicamentoService = {
  buscar: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.buscar, params, onSuccess, onError, onFail);
  },
  insertar: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.insertar, params, onSuccess, onError, onFail);
  },
  llenarCombo: function(params,onSuccess, onError, onFail) {
    commonService.ajax(paths.llenarCombo,params,onSuccess, onError, onFail);
  }
};

module.exports = MedicamentoService;
