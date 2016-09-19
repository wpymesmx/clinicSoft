'use strict';

var commonService = require('./CommonService.js');

var paths = {
  buscar: '/admin/medicamento/buscar',
  insertar: '/admin/medicamento/insertar',
  existeDetalle: '/admin/medicamento/existeDetalle',
  llenarCombo: '/admin/medicamento/llenarCombo',
  actualizar:'/admin/medicamento/actualizar',
  insertarDetalleMed:'/admin/medicamento/insertarDetalleMed',
  llenarComboGrupos:'/admin/medicamento/llenarComboGrupos',
  existeMedicamento:'/admin/medicamento/existe',
  eliminarDetalle:'/admin/medicamento/eliminar',
  editarDetalle:'/admin/medicamento/editaDetalle',
  buscarDetalles:'/admin/medicamento/buscarDetalles',
  reporteMedicamentos:'/admin/medicamento/reporteMedicamentos',
  dashbordMedicamento:'/admin/medicamento/dashbordMedicamento',
  llenaComboPresentacion:'/admin/medicamento/llenaComboPresentacion',
  llenaComboDescripcion:'/admin/medicamento/llenaComboDescripcion',
  llenaComboFarmaceutica:'/admin/medicamento/llenaComboFarmaceutica',
  llenaComboNombreComercial:'/admin/medicamento/llenaComboNombreComercial',
  llenaComboNombreGenerico:'/admin/medicamento/llenaComboNombreGenerico',
  llenaComboNombreGrupo:'/admin/medicamento/llenaComboNombreGrupo',
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
  llenarComboGrupos: function(params,onSuccess, onError, onFail) {
    commonService.ajax(paths.llenarComboGrupos,params,onSuccess, onError, onFail);
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
  },
  editarDetalle: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.editarDetalle, params, onSuccess, onError, onFail);
  },
  reporteMedicamentos: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.reporteMedicamentos, params, onSuccess, onError, onFail);
  },
  dashbordMedicamento: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.dashbordMedicamento, params, onSuccess, onError, onFail);
  },
  llenaComboPresentacion: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.llenaComboPresentacion, params, onSuccess, onError, onFail);
  },
  llenaComboDescripcion: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.llenaComboDescripcion, params, onSuccess, onError, onFail);
  },
  llenaComboFarmaceutica: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.llenaComboFarmaceutica, params, onSuccess, onError, onFail);
  },
  llenaComboNombreComercial: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.llenaComboNombreComercial, params, onSuccess, onError, onFail);
  },
  llenaComboNombreGenerico: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.llenaComboNombreGenerico, params, onSuccess, onError, onFail);
  },
  llenaComboNombreGrupo: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.llenaComboNombreGrupo, params, onSuccess, onError, onFail);
  },
};

module.exports = MedicamentoService;
