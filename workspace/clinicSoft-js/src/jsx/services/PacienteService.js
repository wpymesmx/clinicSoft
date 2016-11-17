'use strict';

var commonService = require('./CommonService.js');

var paths = {
  insertPaciente: '/admin/paciente/insert_paciente',
  updatePaciente: '/admin/paciente/update_paciente',
  buscarPaciente: '/admin/paciente/buscar_paciente',
  existePaciente: '/admin/paciente/existe_paciente',
  buscaDatosPaciente: '/admin/paciente/busca_datos_paciente',
  insertHistorial: '/admin/paciente/insert_historial',
  buscarHistorial: '/admin/paciente/buscarHistorial',
  updateHistorial: '/admin/paciente/updateHistorial',
  insertAnalisis: '/admin/paciente/insertAnalisis'
};

var PacienteService = {
  insertPaciente: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.insertPaciente, params, onSuccess, onError, onFail);
  },
  updatePaciente: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.updatePaciente, params, onSuccess, onError, onFail);
  },
  buscarPaciente: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.buscarPaciente, params, onSuccess, onError, onFail);
  },
  existePaciente: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.existePaciente, params, onSuccess, onError, onFail);
  },
  buscaDatosPaciente: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.buscaDatosPaciente, params, onSuccess, onError, onFail);
  },
  insertHistorial: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.insertHistorial, params, onSuccess, onError, onFail);
  },
  buscarHistorial: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.buscarHistorial, params, onSuccess, onError, onFail);
  },
  updateHistorial: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.updateHistorial, params, onSuccess, onError, onFail);
  },
  insertAnalisis: function(params, onSuccess, onError, onFail) {
    commonService.ajax(paths.insertAnalisis, params, onSuccess, onError, onFail);
  },
};

module.exports = PacienteService;
