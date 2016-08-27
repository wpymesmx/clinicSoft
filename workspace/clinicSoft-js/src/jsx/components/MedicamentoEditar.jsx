/**
* __title__ = 'Edición de medicamento.'
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

var DetalleMedicamentoEditar = require('./DetalleMedicamentoEditar.jsx');

var MedicamentoEditar = React.createClass({
  mixins: [LanguageMixin(),AlertMixin()],
  getDefaultProps: function() {
    //console.log('# MedicamentoEditar->getDefaultProps #');
    return {
      zindex: 2
    };
  },
  getInitialState: function() {
    //console.log('# MedicamentoEditar->getInitialState #');
    return {
      componentKey: 'MedicamentoEditar',
      language: window.language,
      show: false,
      zindex: this.props.zindex,
      nombre_aux: '',
      nombre_comercial:'',
      nombre_generico: '',
      farmaceutica: '',
      elaborado_en: '',
      condicion_venta: '',
      estadoUno:true,
      estadoDos:false,
      estado:'',
      medicamento:undefined,
      id_med: ''
    };
  },
  componentWillMount: function() {
    //console.log('# MedicamentoEditar->componentWillMount #');
    this.subscribeLanguage(this.state.componentKey, this.changeSessionLanguage);
  },
  componentDidMount: function() {
    //console.log('# MedicamentoEditar->componentDidMount #');
  },
  componentWillReceiveProps: function(nextProps) {
    //console.log('# MedicamentoEditar->componentWillReceiveProps #');
  },
  shouldComponentUpdate: function() {
    //console.log('# MedicamentoEditar->shouldComponentUpdate #');
    return true;
  },
  componentWillUpdate: function() {
    //console.log('# MedicamentoEditar->componentWillUpdate #');
  },
  componentDidUpdate: function() {
    //console.log('# MedicamentoEditar->componentDidUpdate #');

  },
  componentWillUnmount: function() {
    //console.log('# MedicamentoEditar->componentWillUnmount #');
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
  onChangeEstado: function(radioButton,evt) {
    if (radioButton=='uno'){
        this.setState({
         estadoUno:true,
         estadoDos:false,
         estado:'A'
    });
    }else{
    this.setState({
         estadoUno:false,
         estadoDos:true,
         estado:'I'
    });
    }
  },
  //@LLV Método para mostrar this ppoup.
  show: function(medicamento) {
    //aqui limpiar componente
    this.setState({
      show: true,
      id_med:medicamento.medicamento_id,
      nombre_comercial:medicamento.nombre_comercial,
      nombre_aux:medicamento.nombre_comercial,
      nombre_generico:medicamento.nombre_generico,
      farmaceutica:medicamento.farmaceutica,
      elaborado_en:medicamento.elaborado_en,
      condicion_venta:medicamento.condicion_venta,
      estado:medicamento.estado,
      medicamento:medicamento
    });
  },
  hide: function() {
    //aqui limpiar componente
    this.setState({
      show: false
    });
  },
  onChangeId: function(id_med) {
    this.setState({
      id_med: id_med
    });
  },
  onClickSiguiente: function(id_med,evt) {
    var self = this;
    console.log('#id_med que enviara a la ventana de detalles.#');
    console.log(id_med);
    var onSuccess = function(response) {
      console.log('# success  #');
    };
    //Oculto el popup de MedicamentoEditar
    this.hide();
    //Muestro el popup de DetalleMedicamentoEditar
    this.refs.detalleMedicamentoEditar.show(id_med,this.state.medicamento);
  },
  onClickCerrar: function(evt) {
    this.setState({
      show: false
    });
  },

  //@LLV Método utilzado para validar los campos del formulario.
  validaFormulario: function() {
    var response = {
      isError: false,
      message: ''
    };
    if(validaService.isEmpty(this.state.nombre_comercial)) {
      return {isError: true, message: this.getText('MSG_109')};
    }
    return response;
  },

  //@LLV Método que manda el mensaje de medicamento existente.
  validaExiste: function() {
    var res = {isError: true, message: this.getText('MSG_110')};
    return res;
  },

  //@LLV Método utilizado para actualizar un medicamento.
  onClickEditar: function(evt) {
    var onSuccess = function(response) {
        console.log('# success  #');
    };
    var self = this;
               var params = {
                'nombre_comercial': self.state.nombre_comercial,
                'nombre_generico': self.state.nombre_generico,
                'farmaceutica': self.state.farmaceutica,
                'elaborado_en': self.state.elaborado_en,
                'condicion_venta': self.state.condicion_venta,
                'estado': self.state.estado,
                'id_med':self.state.id_med
              };
            swal({title: 'Confirmar Registro?',
               text: 'Desea Continuar Con La Actualización Del Medicamento!',
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
                         medicamentoService.actualizar(params, onSuccess, self.onError, self.onFail),
                         swal('Aceptar!','Medicamento Actualizado Con Exito.', 'success');
                     }else {
                        swal('Cancelar', 'La Actualización Del Medicamento Fue Cancelado.', 'error');
                     }
                   });
    var response = this.validaFormulario();
    if(this.state.nombre_aux != this.state.nombre_comercial){
      if(!response.isError) {

      } else {
      self.showError(response.message, {zindex: 4});
      }
    }else{
     var params = {
                'nombre_comercial': self.state.nombre_comercial,
                'nombre_generico': self.state.nombre_generico,
                'farmaceutica': self.state.farmaceutica,
                'elaborado_en': self.state.elaborado_en,
                'condicion_venta': self.state.condicion_venta,
                'estado': self.state.estado,
                'id_med':self.state.id_med
              };
            swal({title: 'Confirmar Registro?',
               text: 'Desea Continuar Con La Actualización Del Medicamento!',
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
                         medicamentoService.actualizar(params, onSuccess, self.onError, self.onFail),
                         swal('Aceptar!','Medicamento Actualizado Con Exito.','success');
                     }else {
                        swal('Cancelar', 'La Actualización Del Medicamento Fue Cancelado.', 'error');
                     }
            });
    }
  },

  //@LLV Método principal para renderizar los componentes.
  render: function() {
    //console.log('# MedicamentoEditar->render #');
    var self = this;
    var CLASS_HIDDEN = 'componentHide';
    var CLASS_SHOW = 'componentShow';
    var className = '';
    className = (this.state.show == true ? CLASS_SHOW : CLASS_HIDDEN);
    return (
     <div>
      <DetalleMedicamentoEditar ref='detalleMedicamentoEditar' papa={self}/>
      <div className={className}>
        <div className='fondoShow' style={{zIndex: this.state.zindex-1}}>&nbsp;</div>
        <div className={'panel panel-primary popUpClass'} style={{zIndex: this.state.zindex-1}}>
          <div className='panel-heading'>
            Editar Medicamento
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
                   <input name='rUno' type='radio'  value={this.state.estado} onChange={this.onChangeEstado.bind(self,'uno')} checked={this.state.estadoUno}/>Activo
                   <br />
                   <input name='rUno' type='radio'  value={this.state.estado} onChange={this.onChangeEstado.bind(self,'dos')} checked={this.state.estadoDos}/>Inactivo
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
                    <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value='Guardar' onClick={this.onClickEditar} />
                 </div>
                 <div className="btn-group" role="group">
                    <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value='Siguiente'  onClick={this.onClickSiguiente.bind(this, this.state.id_med)} />
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

module.exports = MedicamentoEditar;
