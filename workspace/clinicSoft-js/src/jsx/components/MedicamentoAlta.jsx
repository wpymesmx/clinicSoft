/**
* __title__ = 'Alta de medicamento.'
* __author__ = '@LLV'
* __date__ = '26/08/2016'
*/

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

//importamos para vetanas de errores o información
var AlertMixin = require('../mixins/AlertMixin.js');

var DetalleMedicamentoAlta = require('./DetalleMedicamentoAlta.jsx');

//@LLV Inicio de la clae MedicmantoAlta.
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
      nombre_aux: '',
      nombre_generico: '',
      farmaceutica: '',
      elaborado_en: '',
      condicion_venta: '',
      estado:'A',
      lista_id: [],
      id_med: 0,
      ban:true
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
  //@LLV Método que muestra la siguiente ventana.
  onClickSiguiente: function(id_med,evt) {
    var self = this;
    console.log('#id_med que enviara a la ventana de detalles.#');
    console.log(id_med);
    var onSuccess = function(response) {
      console.log('# success  #');
    };
    //Oculto el popup de MedicamentoAlta
    this.hide();
    //Muestro el popup de DetalleMedicamentoAlta
    this.refs.detalleMedicamentoAlta.show(id_med);
     self.setState({
       ban: false
     });
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

  //@LLV Método que cierra popup y limpia componentes.
  onClickCerrar: function(evt) {
    this.setState({
      show: false,
      ban:true
    });
    this.state.nombre_comercial='',
    this.state.nombre_generico='',
    this.state.farmaceutica='',
    this.state.elaborado_en='',
    this.state.condicion_venta=''
  },

  //@LLV Método para vlaidar los campos obligatorios en el formulario.
  validaFormulario: function() {
    var response = {
      isError: false,
      message: ''
    };
    if(validaService.isEmpty(this.state.nombre_comercial)) {
       var self = this;
       return {isError: true, message: self.getText('MSG_109')};
    }
    return response;
  },

  //@LLV Método para mensaje de medicamento esxistente.
  validaExiste: function() {
    var self = this;
    var res = {isError: true, message: self.getText('MSG_110')};
    return res;
  },

  //@LLV Método utilizado para relaizar un insert a BD.
  onClickGuardar: function(evt) {
    var self = this;
    var onSuccess = function(response) {
        console.log('# success  #');
        var id_medicamento=response.payload;
        console.log(id_medicamento);
        var res = self.validaExiste();
        if(id_medicamento.length > 0) {
           self.showInfo(res.message, {zindex: 4});
        } else{
            var params = {
              'nombre_comercial': self.state.nombre_comercial,
              'nombre_generico': self.state.nombre_generico,
              'estado': self.state.estado
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
                         var onSuc = function(res) {
                           console.log('# success  #');
                           var id=res.payload;
                            self.setState({
                                id_med: id
                            });
                            console.log('#Recupera el numero de MED_ID insertado#');
                            console.log(self.state.id_med);
                            console.log(id);
                         };
                         medicamentoService.insertar(params, onSuc, self.onError, self.onFail),
                         swal('Aceptar!','Medicamento Registrado Con Exito.','success');
                         self.setState({
                            ban: false
                         });
                     }else {
                        swal('Cancelar', 'El Registro Del Medicamento Fue Cancelado.', 'error');
                     }
                   });
        }
    };
    var response = this.validaFormulario();
    if(!response.isError) {
        var nombre = {
          'nombre_comercial': this.state.nombre_comercial
        };
        medicamentoService.existeMedicamento(nombre, onSuccess, this.onError, this.onFail);
    } else {
      self.showInfo(response.message, {zindex: 4});
    }
  },

  //Función principal que renderiza los componentes.
  render: function() {
    //console.log('# MedicamentoAlta->render #');
    var self = this;
    var CLASS_HIDDEN = 'componentHide';
    var CLASS_SHOW = 'componentShow';
    var className = '';
    className = (this.state.show == true ? CLASS_SHOW : CLASS_HIDDEN);
    return (
    <div>
      <DetalleMedicamentoAlta ref='detalleMedicamentoAlta' papa={self}/>
      <div className={className}>
        <div className='fondoShow' style={{zIndex: this.state.zindex-1}}>&nbsp;</div>
        <div className={'panel panel-default popUpClass'} style={{zIndex: this.state.zindex-1}}>
          <div className='panel-heading'>
             {this.getText('MSG_3007')}
          </div>
          <div className='panel-body'>


            <div style={{width: '80%'}} className='panelForm'>
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3001')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3001')} value={this.state.nombre_comercial}
                    onChange={this.onChangeNombreComercial}/>
                </div>
              </div>

              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_3002')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3002')} value={this.state.nombre_generico}
                    onChange={this.onChangeNombreGenerico}/>
                </div>
              </div>

              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_3006')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                   <input name='' type='radio'  value={this.state.estado} onChange={this.onChangeEstado} checked/>{this.getText('MSG_202')} <br />
                   <input name='' type='radio'  value={this.state.estado} onChange={this.onChangeEstado}  disabled='true' />{this.getText('MSG_203')}
                </div>
              </div>

            </div>

         </div>
        <div className='panel-footer button-align-right'>
          <div className='input-group' style={{align: 'center'}}>
             <div className="btn-group btn-group-justified" role="group" aria-label="...">
               <div className="btn-group" role="group">
                   <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_102')} onClick={this.onClickCerrar} />
               </div>
               <div className="btn-group" role="group">
                   <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_206')} onClick={this.onClickGuardar} />
               </div>
               <div className="btn-group" role="group">
                   <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_3008')} disabled={this.state.ban}  onClick={this.onClickSiguiente.bind(this,this.state.id_med)} />
               </div>
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
