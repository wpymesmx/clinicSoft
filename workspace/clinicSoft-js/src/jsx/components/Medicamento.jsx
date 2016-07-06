'use strict';

var React = require('react');
//mixins
var NavigatorMixin = require('../mixins/NavigatorMixin.js');
var ErrorControlMixin = require('../mixins/ErrorControlMixin.js');
//utils
var Constants = require('../utils/Constants.js');
//servicios
var medicamentoService = require('../services/MedicamentoService.js');
//sweetalert for pupup
var swal=require('sweetalert');

var Medicamento = React.createClass({
  mixins: [NavigatorMixin(), ErrorControlMixin()],
  getInitialState: function() {
    return {
      id:'',
      nombre_comercial: '',
      nombre_generico: '',
      farmaceutica: '',
      elaborado_en: '',
      condicion_venta: '',
      estado:''
    };
  },
  componentWillMount: function() {
    //console.log('# App->componentWillMount #');
  },
  componentDidMount: function() {
    //console.log('# App->componentDidMount #');
  },
  componentWillReceiveProps: function(nextProps) {
    //console.log('# App->componentWillReceiveProps #');
  },
  shouldComponentUpdate: function() {
    //console.log('# App->shouldComponentUpdate #');
    return true;
  },
  componentWillUpdate: function() {
    //console.log('# App->componentWillUpdate #');
  },
  componentDidUpdate: function() {
    //console.log('# App->componentDidUpdate #');
  },
  componentWillUnmount: function() {
    //console.log('# App->componentWillUnmount #');
  },
  onChangeNombreComercial: function(evt) {
    this.setState({
      nombre_comercial: evt.target.value
    });
  },
  onChangeNombreGenerico: function(evt) {
    this.setState({
      nombre_generico: evt.target.value
    });
  },
  onChangeFarmaceutica: function(evt) {
    this.setState({
      farmaceutica: evt.target.value
    });
  },
  onChangeElaboradoEn: function(evt) {
    this.setState({
      elaborado_en: evt.target.value
    });
  },
  onChangeCondicionVenta: function(evt) {
    this.setState({
      condicion_venta: evt.target.value
    });
  },
  onChangeEstado: function(evt) {
    this.setState({
      estado: evt.target.value
    });
  },
  onChangeId: function(evt) {
    this.setState({
      id: evt.target.value
    });
  },
  onClickEntrar: function(evt) {
    var self = this;

    var onSuccess = function(response) {
      console.log('# success  #');
    };

    var params = {
      'cve_medicamento': this.state.id,
      'nombre_comercial': this.state.nombre_comercial,
      'nombre_generico': this.state.nombre_generico,
      'farmaceutica': this.state.farmaceutica,
      'elaborado_en': this.state.elaborado_en,
      'condicion_venta': this.state.condicion_venta,
      'estado': this.state.estado
    };
    swal({title: "Confirmar Registro?",
       text: "Desea Continuar Con El Registro Del Medicamento!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Si,Guardar!",
          cancelButtonText: "No,Cancelar!",
          closeOnConfirm: false,
          closeOnCancel: false
          },
          function(isConfirm){
             if (isConfirm) {
                 medicamentoService.insertar(params, onSuccess, this.onError, this.onFail),
                 swal("Aceptar!","Medicamento Registrado Con Exito.",
                "success");
             }else {
                swal("Cancelar", "El Registro Del Medicamento Fue Cancelado.", "error");
             }
           });
    //swal("Here's a message!")
  },
  render: function() {
    //console.log('# App->render #');
    return (
     <div className='container'>
     <div className="panel panel-default">
     <div className="panel-body">
        Basic panel example
      </div>
      </div>
        <div className='card card-container'>
          <div id='profile-img' className=''></div>
          <p id='profile-name' className=''></p>
          <div className='form-signin'>
            <span id='reauth-email' className='reauth-email'></span>
            <input type='text' className='form-control' placeholder='Id' value={this.state.id} onChange={this.onChangeId} />
            <input type='text' className='form-control' placeholder='Nombre Comercial' value={this.state.nombre_comercial} onChange={this.onChangeNombreComercial} />
            <input type='text' className='form-control' placeholder='Nombre Generico' value={this.state.nombre_generico} onChange={this.onChangeNombreGenerico} />
            <input type='text' className='form-control' placeholder='Farmaceutica' value={this.state.farmaceutica} onChange={this.onChangeFarmaceutica} />
            <input type='text' className='form-control' placeholder='Elaborado En' value={this.state.elaborado_en} onChange={this.onChangeElaboradoEn} />
            <input type='text' className='form-control' placeholder='Condición Venta' value={this.state.condicion_venta} onChange={this.onChangeCondicionVenta} />
            Estado: <input type="radio" className='form-control' placeholder='Estado' value={this.state.estado} onChange={this.onChangeEstado} />
            <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value='Guardar' onClick={this.onClickEntrar} />
          </div>
        </div>
      </div>
    );
  }
});
module.exports = Medicamento;
