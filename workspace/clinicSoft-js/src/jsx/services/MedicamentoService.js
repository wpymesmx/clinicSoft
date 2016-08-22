'use strict';

var commonService = require('./CommonService.js');

var paths = {
  buscar: '/admin/medicamento/buscar',
  insertar: '/admin/medicamento/insertar',
  existeDetalle: '/admin/medicamento/existeDetalle',
  llenarCombo: '/admin/medicamento/llenarCombo',
  actualizar:'/admin/medicamento/actualizar',
  insertarDetalleMed:'/admin/medicamento/insertarDetalleMed',
  llenarComboAlmacen:'/admin/medicamento/llenarComboAlmacen',
  existeMedicamento:'/admin/medicamento/existe',
  eliminarDetalle:'/admin/medicamento/eliminar',
  buscarDetalles:'/admin/medicamento/buscarDetalles'
};

var MedicamentoService = {
  buscar: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.buscar, params, onSuccess, onError, onFail);
  },
  insertar: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.insertar, params, onSuccess, onError, onFail);
  },
  insertarDetalleMed: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.insertarDetalleMed, params, onSuccess, onError, onFail);
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
  existeDetalle: function(presentacion, onSuccess, onError, onFail) {
    commonService.ajax(paths.existeDetalle, presentacion, onSuccess, onError, onFail);
  },
  existeMedicamento: function(nombre, onSuccess, onError, onFail) {
    commonService.ajax(paths.existeMedicamento, nombre, onSuccess, onError, onFail);
  },
  eliminarDetalle: function(dem_id, onSuccess, onError, onFail) {
    commonService.ajax(paths.eliminarDetalle, dem_id, onSuccess, onError, onFail);
  },
  buscarDetalles: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.buscarDetalles, params, onSuccess, onError, onFail);
  }
};

module.exports = MedicamentoService;
