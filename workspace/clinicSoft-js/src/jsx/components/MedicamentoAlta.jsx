'use strict';

var React = require('react');
//mixins
var LanguageMixin = require('../mixins/LanguageMixin.js');
//utils
var Constants = require('../utils/Constants.js');
//components
/**
* componente utilizado para la gestion de alta de medicamentos
*/

//sweetalert for pupup
var swal=require('sweetalert');

//servicios
var medicamentoService = require('../services/MedicamentoService.js');
//Importo valida service
var validaService = require('../utils/ValidaService.js');

//importamos
var AlertMixin = require('../mixins/AlertMixin.js');

var MedicamentoAlta = React.createClass({
  mixins: [LanguageMixin(),AlertMixin()],
  getDefaultProps: function() {
    //console.log('# MedicamentoAlta->getDefaultProps #');
    return {
      zindex: 2
    };
  },
  getInitialState: function() {
    //console.log('# MedicamentoAlta->getInitialState #');
    return {
      componentKey: 'MedicamentoAlta',
      language: window.language,
      show: false,
      zindex: this.props.zindex,
      nombre_comercial: '',
      nombre_generico: '',
      farmaceutica: '',
      elaborado_en: '',
      condicion_venta: '',
      estado:'A',
    };
  },
  componentWillMount: function() {
    //console.log('# MedicamentoAlta->componentWillMount #');
    this.subscribeLanguage(this.state.componentKey, this.changeSessionLanguage);
  },
  componentDidMount: function() {
    //console.log('# MedicamentoAlta->componentDidMount #');
  },
  componentWillReceiveProps: function(nextProps) {
    //console.log('# MedicamentoAlta->componentWillReceiveProps #');
  },
  shouldComponentUpdate: function() {
    //console.log('# MedicamentoAlta->shouldComponentUpdate #');
    return true;
  },
  componentWillUpdate: function() {
    //console.log('# MedicamentoAlta->componentWillUpdate #');
  },
  componentDidUpdate: function() {
    //console.log('# MedicamentoAlta->componentDidUpdate #');
  },
  componentWillUnmount: function() {
    //console.log('# MedicamentoAlta->componentWillUnmount #');
    this.unSubscribeLanguage(this.state.componentKey);
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

  show: function() {
    //aqui limpiar componente
    this.setState({
      show: true
    });
  },
  hide: function() {
    //aqui limpiar componente
    this.setState({
      show: false
    });
  },
  onClickCerrar: function(evt) {
    this.setState({
      show: false
    });
  },
  validaFormulario: function() {
    var response = {
      isError: false,
      message: ''
    };

    if(validaService.isEmpty(this.state.nombre_comercial)) {
      return {isError: true, message: this.getText('MSG_108')};
    }

    return response;
  },


  onClickGuardar: function(evt) {
    var self = this;

    var onSuccess = function(response) {
      console.log('# success  #');
      self.setState({

      });
    };

    var response = this.validaFormulario();
    if(!response.isError) {
    var params = {
      'nombre_comercial': this.state.nombre_comercial,
      'nombre_generico': this.state.nombre_generico,
      'farmaceutica': this.state.farmaceutica,
      'elaborado_en': this.state.elaborado_en,
      'condicion_venta': this.state.condicion_venta,
      'estado': this.state.estado
    };

    swal({title: 'Confirmar Registro?',
       text: 'Desea Continuar Con El Registro Del Medicamento!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Si,Guardar!',
          cancelButtonText: 'No,Cancelar!',
          closeOnConfirm: false,
          closeOnCancel: false
          },
          function(isConfirm){
             if (isConfirm) {
                 medicamentoService.insertar(params, onSuccess, this.onError, this.onFail),
                 swal('Aceptar!','Medicamento Registrado Con Exito.',
                'success');
             }else {
                swal('Cancelar', 'El Registro Del Medicamento Fue Cancelado.', 'error');
             }
           });
    } else {
      this.showError(response.message, {zindex: 3});
    }
  },


  render: function() {
    //console.log('# MedicamentoAlta->render #');
    var self = this;
    var CLASS_HIDDEN = 'componentHide';
    var CLASS_SHOW = 'componentShow';
    var className = '';

    className = (this.state.show == true ? CLASS_SHOW : CLASS_HIDDEN);

    return (
      <div className={className}>
        <div className='fondoShow' style={{zIndex: this.state.zindex-1}}>&nbsp;</div>
        <div className={'panel panel-primary popUpClass'} style={{zIndex: this.state.zindex-1}}>
          <div className='panel-heading'>
            Registro De Medicamento
          </div>
          <div className='panel-body'>
              <input type='text' className='form-control' placeholder='Nombre Comercial' value={this.state.nombre_comercial} onChange={this.onChangeNombreComercial} />
              <input type='text' className='form-control' placeholder='Nombre Generico' value={this.state.nombre_generico} onChange={this.onChangeNombreGenerico} />
              <input type='text' className='form-control' placeholder='Farmaceutica' value={this.state.farmaceutica} onChange={this.onChangeFarmaceutica} />
              <input type='text' className='form-control' placeholder='Elaborado En' value={this.state.elaborado_en} onChange={this.onChangeElaboradoEn} />
              <input type='text' className='form-control' placeholder='Condición Venta' value={this.state.condicion_venta} onChange={this.onChangeCondicionVenta} />
               <dev>
                <fieldset>
                   Estado del medicamento:
                   <br />
                   <input name='' type='radio'  value={this.state.estado} onChange={this.onChangeEstado} checked/>Activo
                   <br />
                   <input name='' type='radio'  value={this.state.estado} onChange={this.onChangeEstado}  disabled='true' />Inactivo
                </fieldset>
              </dev>
          </div>
          <div className='panel-footer button-align-right'>
            <div className='input-group' style={{align: 'center'}}>

               <div className="btn-group btn-group-justified" role="group" aria-label="...">
                 <div className="btn-group" role="group">
                    <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value='Cerrar' onClick={this.onClickCerrar} />
                 </div>
                 <div className="btn-group" role="group">
                     <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value='Guardar' onClick={this.onClickGuardar} />
                 </div>
               </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MedicamentoAlta;
