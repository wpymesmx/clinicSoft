/**
* __title__ = 'Detalle Medicamento Alta.'
* __author__ = '@LLV'
* __date__ = '26/08/2016'
*/
'use strict';
var React = require('react');
//mixins
var NavigatorMixin = require('../mixins/NavigatorMixin.js');
var AlertMixin = require('../mixins/AlertMixin.js');
var LanguageMixin = require('../mixins/LanguageMixin.js');
//utils
var Constants = require('../utils/Constants.js');
//sweetalert for pupup
var swal=require('sweetalert');
//components
var DatePickerReact = require('./DatePickerReact.jsx');
//servicios
var medicamentoService = require('../services/MedicamentoService.js');
var MedicamentoAlta = require('./MedicamentoAlta.jsx');
var validaService = require('../utils/ValidaService.js');

//components
var DetalleMedicamentoAlta= React.createClass({
  mixins: [LanguageMixin(),AlertMixin()],
  getDefaultProps: function() {
    //console.log('# DetalleMedicamentoAlta->getDefaultProps #');
    return {
      zindex: 4
    };
  },

  getInitialState: function() {
    //console.log('# App->getInitialState #');
    return {
      componentKey: 'DetalleMedicamentoAlta',
      mainComponent: undefined,
      language: window.language,
      zindex: this.props.zindex,
      datePicked: '',
      presentacion: '',
      cantidad_maxima: '',
      cantidad_minima: '',
      existencia: '',
      descripcion: '',
      indicasiones: '',
      via_aministracion: '',
      fecha_alta: '',
      fecha_caducidad: '',
      id_med:'',
      id:0,
      id_almacen:'',
      lista_combo: [],
      lista_detalles: [],
      lista_detalle_tmp:[],
      comboValue: 0,
      ban:true
    };
  },
  componentWillMount: function() {
    var self = this;
    //console.log('# App->componentWillMount #');
    self.subscribeLanguage(self.state.componentKey, self.changeSessionLanguage);
  },
  componentDidMount: function() {
    //console.log('# App->componentDidMount #');
    var self = this;
    var onSuccess = function(response) {
      console.log('# success  #');
      self.setState({
        lista_combo : response.payload
      });
    };
    medicamentoService.llenarComboAlmacen({},onSuccess, self.onError, self.onFail);
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
    var self = this;
    //console.log('# App->componentWillUnmount #');
    self.unSubscribeLanguage(self.state.componentKey);
  },
  onDatePicked: function(datePicked, evt) {
    console.log('datePicked->' + datePicked);

    this.setState({
      fecha_alta: (datePicked.getDate() + '/' + (datePicked.getMonth()+1) + '/' + datePicked.getFullYear())
    });
  },
  onDatePickedDos: function(datePicked, evt) {
    console.log('datePicked->' + datePicked);

    this.setState({
      fecha_caducidad: (datePicked.getDate() + '/' + (datePicked.getMonth()+1) + '/' + datePicked.getFullYear())
    });
  },
  onChangePresentacion: function(evt) {
    this.setState({
      presentacion: evt.target.value
    });
  },
  onChangeCantidad_maxima: function(evt) {
    this.setState({
      cantidad_maxima: evt.target.value
    });
  },
  onChangeCantidad_minima: function(evt) {
    this.setState({
      cantidad_minima: evt.target.value
    });
  },
  onChangeExistencia: function(evt) {
    this.setState({
      existencia: evt.target.value
    });
  },
  onChangeDescripcion: function(evt) {
    this.setState({
      descripcion: evt.target.value
    });
  },
  onChangeIndicasiones: function(evt) {
    this.setState({
      indicasiones: evt.target.value
    });
  },
  onChangeViaAdministracion: function(evt) {
    this.setState({
      via_aministracion: evt.target.value
    });
  },
  onChangeFechaAlta: function(evt) {
    this.setState({
      fecha_alta: evt.target.value
    });
  },
  onChangeFechaCaducidad: function(evt) {
    this.setState({
      fecha_caducidad: evt.target.value
    });
  },
  onChangeCombo: function(evt) {
   this.setState({
     comboValue: evt.target.value,
     det_ubicacion: evt.target.value
   });
  },
  show: function(id_med) {
    //aqui limpiar componente
    console.log('# id_med que recibe cuando cargo el view detalle_medicamento.#');
    console.log(id_med);
    this.setState({
      show: true,
      id_med:id_med
    });
  },
  hide: function() {
    //aqui limpiar componente
    this.setState({
      show: false
    });
  },
  //@LLV Método que cierra el popup y limpia componentes.
  onClickCerrar: function(evt) {
    this.setState({
      show: false,
      ban:true
    });
    this.state.presentacion='',
    this.state.cantidad_maxima='',
    this.state.cantidad_minima='',
    this.state.existencia='',
    this.state.indicasiones='',
    this.state.via_aministracion='',
    this.state.fecha_alta='',
    this.state.fecha_caducidad='',
    this.state.id_med='',
    this.state.id_almacen='',
    this.state.comboValue=0
  },

  //@LLV Método que retorna a la ventana anterior.
  onClickRegresar: function(evt) {
    //Oculto el popup de DetalleMedicamentoAlta
    var onSuccess = function(response) {
      console.log('# success  #');
    };
    this.hide();
    //Muestro el popup de MedicamentoAlta
    this.props.papa.show();
  },

  //@LLV Método que valida los campos del formulario.
  validaFormulario: function() {
    var self = this;
    var response = {
      isError: false,
      message: ''
    };

    if(validaService.isEmpty(self.state.presentacion)) {
      return {isError: true, message: self.getText('MSG_112')};
    }
    if(validaService.isEmpty(self.state.cantidad_maxima)) {
      return {isError: true, message: self.getText('MSG_3025')};
    }
    if(validaService.isEmpty(self.state.cantidad_minima)) {
      return {isError: true, message: self.getText('MSG_3026')};
    }
    if(validaService.isEmpty(self.state.existencia)) {
      return {isError: true, message: self.getText('MSG_3027')};
    }
    if(validaService.isEmpty(self.state.id_almacen)) {
      return {isError: true, message: self.getText('MSG_3028')};
    }
    return response;
  },

  validaExiste: function() {
    var self = this;
    var res = {isError: true, message: self.getText('MSG_111')};
    return res;
  },

  //@LLV Método que elimina un detalle del medicamento.
  onClickEliminar:  function(evt){
       var onSuccess = function(response) {
          console.log('# success  #');
       };
       var self = this;
       var params = {
           'presentacion': self.state.presentacion,
           'id_med': self.state.id_med
       };
       swal({title: 'Confirmar  Eliminación?',
               text: 'Desea Eliminar La Presentación!',
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#DD6B55',
                  confirmButtonText: 'Si,Eliminar!',
                  cancelButtonText: 'No,Cancelar!',
                  closeOnConfirm: false,
                  closeOnCancel: false
                  },
                  function(isConfirm){
                     if (isConfirm) {
                         medicamentoService.eliminarDetalle(params, onSuccess, self.onError, self.onFail),
                         swal('Aceptar!','Presentación Eliminada Con Exito.','success');
                     }else {
                        swal('Cancelar', 'La Eliminación De La Presentación Fue Cancelada.', 'error');
                     }
                   });
  },

  //@LLV Método para insertar un detalle del medicamento en BD.
  onClickGuardar: function(evt) {
    var self = this;
    var onSuccess = function(response) {
        console.log('# success  #');
        var id_detalle=response.payload;
        console.log(id_detalle);
        var res = self.validaExiste();
        if(id_detalle.length > 0) {
           self.showInfo(res.message, {zindex: 4});
        } else{
            var params = {
               'id_med':self.state.id_med,
               'id_almacen':self.state.comboValue,
               'presentacion': self.state.presentacion,
               'cantidad_maxima':self.state.cantidad_maxima,
               'cantidad_minima':self.state.cantidad_minima,
               'existencia':self.state.existencia,
               'descripcion':self.state.descripcion,
               'indicasiones':self.state.indicasiones,
               'via_aministracion':self.state.via_aministracion,
               'fecha_alta': self.state.fecha_alta,
               'fecha_caducidad':self.state.fecha_caducidad
            };
            swal({title: 'Confirmar Registro?',
               text: 'Desea Continuar Con El Registro De La Presentación!',
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
                         medicamentoService.insertarDetalleMed(params, onSuccess, self.onError, self.onFail),
                         swal('Aceptar!','Presentación Registrada Con Exito.',
                         'success');
                         var auxParams = {
                            'presentacion': self.state.presentacion,
                            'cantidad_maxima': self.state.cantidad_maxima,
                            'cantidad_minima': self.state.cantidad_minima,
                            'existencia': self.state.existencia,
                            'fecha_caducidad': self.state.fecha_caducidad
                         };
                         var lista_detalle_tmp = self.state.lista_detalles;
                         lista_detalle_tmp.push(auxParams);
                         self.setState({
                             lista_detalles: lista_detalle_tmp
                         });
                     }else {
                        swal('Cancelar', 'El Registro De La Presentación Fue Cancelado.', 'error');
                     }
                   });

    }
    };
    var response = self.validaFormulario();
    if(!response.isError) {
        var presentacion = {
           'presentacion': self.state.presentacion,
           'id_med': self.state.id_med
        };
        medicamentoService.existeDetalle(presentacion, onSuccess, self.onError, self.onFail);
    } else {
        self.showInfo(response.message, {zindex: 4});
    }
  },

  //@LLV Método principal para renderizar los componetes.
  render: function() {
    //console.log('# DetalleMedicamentoAlta->render #');
    var self = this;
    var CLASS_HIDDEN = 'componentHide';
    var CLASS_SHOW = 'componentShow';
    var className = '';
    className = (self.state.show == true ? CLASS_SHOW : CLASS_HIDDEN);
     if(self.state.lista_detalles.length > 0) {
      var rows_detalles = self.state.lista_detalles.map(function(auxDetalle) {
        return (
          <tr>
            <td>{auxDetalle.presentacion}</td>
            <td>{auxDetalle.cantidad_maxima}</td>
            <td>{auxDetalle.cantidad_minima}</td>
            <td>{auxDetalle.existencia}</td>
            <td>{auxDetalle.fecha_alta}</td>
            <td>{auxDetalle.fecha_caducidad}</td>
            <td><button className='detalleButton' onClick={self.onClickEliminar}/></td>
          </tr>
        );
      });
    }
    //La variable almacen puede tomar cualquier nombre.
    var listaAlmacenComboOption = [];
    listaAlmacenComboOption.push(<option value="0">{this.getText('MSG_3017')}</option>);
    if(self.state.lista_combo.length>0){
      var rows_almacen = self.state.lista_combo.map(function(almacen) {
        return (
           <option value={almacen.det_id}>{almacen.det_ubicacion}</option>
        );
      });
      listaAlmacenComboOption.push(rows_almacen);
    }


    return (
      <div className={className}>
        <div className='fondoShow' style={{zIndex: this.state.zindex-1}}>&nbsp;</div>
        <div className={'panel panel-default popUpClassMedicament'} style={{zIndex: this.state.zindex-1}}>
          <div className='panel-heading'>
            {this.getText('MSG_3009')}
          </div>
          <div className='panel-body'>


            <div style={{width: '80%'}} className='panelForm'>

              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3010')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3010')} value={this.state.presentacion}
                    onChange={this.onChangePresentacion}/>
                </div>
              </div>

              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3011')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3011')} value={this.state.cantidad_maxima}
                    onChange={this.onChangeCantidad_maxima}/>
                </div>
              </div>

              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3012')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3012')} value={this.state.cantidad_minima}
                    onChange={this.onChangeCantidad_minima}/>
                </div>
              </div>

              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3013')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3013')} value={this.state.existencia}
                    onChange={this.onChangeExistencia}/>
                </div>
              </div>

              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_3014')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3014')} value={this.state.descripcion}  onChange={this.onChangeDescripcion}/>
                </div>
              </div>

              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_3015')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3015')} value={this.state.indicasiones}  onChange={this.onChangeIndicasiones}/>
                </div>
              </div>

              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_3016')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3016')} value={this.state.via_aministracion}  onChange={this.onChangeViaAdministracion}/>
                </div>
              </div>

              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3021')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                   <select className='form-control' value={this.state.comboValue} onChange={this.onChangeCombo}>
                      {listaAlmacenComboOption}
                   </select>
                </div>

              </div>

              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3018')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <DatePickerReact inputLabel='' onDatePicked={this.onDatePicked} />
                </div>
              </div>

              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3019')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <DatePickerReact inputLabel='' onDatePicked={this.onDatePickedDos} />
                </div>
              </div>

            </div>

          <div className='panelScroll'>
           <table className='table table-bordered table-hover'>
            <tbody>
              <tr className='alert alert-success default' role='alert'>
                 <td>{this.getText('MSG_3010')}</td>
                 <td>{this.getText('MSG_3011')}</td>
                 <td>{this.getText('MSG_3012')}</td>
                 <td>{this.getText('MSG_3013')}</td>
                 <td>{this.getText('MSG_3018')}</td>
                 <td>{this.getText('MSG_3019')}</td>
                <td></td>
             </tr>
             {rows_detalles}


            </tbody>
           </table>
          </div>
         </div>

        <div className='panel-footer button-align-right'>
          <div className='input-group' style={{align: 'center'}}>
             <div className="btn-group btn-group-justified" role="group" aria-label="...">
               <div className="btn-group" role="group">
                  <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_102')}  onClick={this.onClickCerrar}/>
               </div>
               <div className="btn-group" role="group">
                   <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_206')}  onClick={this.onClickGuardar} />
               </div>
               <div className="btn-group" role="group">
                   <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_3020')}  onClick={this.onClickRegresar} />
               </div>
             </div>
           </div>
         </div>
       </div>
      </div>
    );
  }
});

module.exports = DetalleMedicamentoAlta;
