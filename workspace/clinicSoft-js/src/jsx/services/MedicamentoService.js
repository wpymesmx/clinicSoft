'use strict';

var commonService = require('./CommonService.js');

var paths = {
  buscar: '/admin/medicamento/buscar',
  insertar: '/admin/medicamento/insertar',
  insertarDetalle: '/admin/medicamento/insertarDetalleMed',
  llenarCombo: '/admin/medicamento/llenarCombo',
  llenarComboAlmacen: '/admin/medicamento/llenarComboAlmacen',
  actualizar:'/admin/medicamento/actualizar',
  existe:'/admin/medicamento/existe',
  existeDetalle:'/admin/medicamento/existeDetalle'
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
  },
  llenarComboAlmacen: function(params,onSuccess, onError, onFail) {
    commonService.ajax(paths.llenarComboAlmacen,params,onSuccess, onError, onFail);
  },
  actualizar: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.actualizar, params, onSuccess, onError, onFail);
  },
  existe: function(nombre, onSuccess, onError, onFail) {
    commonService.ajax(paths.existe, nombre, onSuccess, onError, onFail);
  },
  insertarDetalle: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.existe, params, onSuccess, onError, onFail);
  },
  existeDetalle: function(presentacion, onSuccess, onError, onFail) {
    commonService.ajax(paths.existeDetalle, presentacion, onSuccess, onError, onFail);
  },
};

module.exports = MedicamentoService;
