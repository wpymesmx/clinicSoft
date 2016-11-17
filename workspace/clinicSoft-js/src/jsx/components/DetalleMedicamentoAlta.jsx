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

//Se importa la libreria que carga la grafica.
var InputFileReact = require('./InputFileReact.jsx');

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
      codigo_barras:'',
      presentacion: '',
      cantidad_maxima: '',
      cantidad_minima: '',
      existencia: '',
      descripcion: '',
      indicasiones: '',
      via_aministracion: '',
      fecha_alta: '',
      fecha_caducidad: '',
      condicion_venta:'',
      precio:0.0,
      iva:0.0,
      farmaceutica:'',
      elaborado_en:'',
      id_med:'',
      id:0,
      id_almacen:'',
      lista_combo: [],
      lista_detalles: [],
      lista_detalle_tmp:[],
      comboValue: 1,
      ban:true,
      image64: ''
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
    medicamentoService.llenarComboGrupos({},onSuccess, self.onError, self.onFail);
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
  onChangeCodigoBarras: function(evt) {
    this.setState({
      codigo_barras: evt.target.value
    });
  },
  onChangePresentacion: function(evt) {
    this.setState({
      presentacion: evt.target.value
    });
  },
  onChangeCantidad_maxima: function(evt) {
    if(validaService.isEmpty(evt.target.value) || validaService.isOnlyNumbers(evt.target.value)) {
        this.setState({
          cantidad_maxima: evt.target.value
        });
    }
  },
  onChangeCantidad_minima: function(evt) {
    if(validaService.isEmpty(evt.target.value) || validaService.isOnlyNumbers(evt.target.value)) {
        this.setState({
          cantidad_minima: evt.target.value
        });
    }
  },
  onChangeExistencia: function(evt) {
    if(validaService.isEmpty(evt.target.value) || validaService.isOnlyNumbers(evt.target.value)) {
        this.setState({
          existencia: evt.target.value
        });
    }
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
   onChangeCondicionVenta: function(evt) {
    this.setState({
      condicion_venta: evt.target.value
    });
  },

  onChangePrecio: function(evt) {
    if(validaService.isEmpty(evt.target.value) || validaService.isDecimal(evt.target.value)) {
        this.setState({
          precio: evt.target.value
        });
    }
  },

  onChangeIva: function(evt) {
    if(validaService.isEmpty(evt.target.value) || validaService.isDecimal(evt.target.value)) {
        this.setState({
          iva: evt.target.value
        });
    }
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
  onChangeCombo: function(evt) {
   this.setState({
     comboValue: evt.target.value,
     gru_nombre: evt.target.value
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
    this.onClickLimpiar();
  },

  //@LLV Método utilizado para limpiar componentes.
  onClickLimpiar: function(evt) {
    this.state.codigo_barras='',
    this.state.presentacion='',
    this.state.descripcion='',
    this.state.cantidad_maxima='',
    this.state.cantidad_minima='',
    this.state.existencia='',
    this.state.indicasiones='',
    this.state.via_aministracion='',
    this.state.fecha_alta='',
    this.state.fecha_caducidad='',
    this.state.condicion_venta='',
    this.state.precio=0.0,
    this.state.iva=0.0,
    this.state.farmaceutica='',
    this.state.elaborado_en='',
    this.state.id_med='',
    this.state.id_grupo='',
    this.state.comboValue=1,
    this.state.lista_detalles_med=[],
    this.state.lista_detalles=[]
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
    //Limpia componentes.
     this.onClickLimpiar();
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
    if(validaService.isEmpty(self.state.cantidad_maxima) || !validaService.isOnlyNumbers(self.state.cantidad_maxima)) {
      return {isError: true, message: self.getText('MSG_3025')};
    }
    if(validaService.isEmpty(self.state.cantidad_minima)) {
      return {isError: true, message: self.getText('MSG_3026')};
    }
    if(validaService.isEmpty(self.state.existencia)) {
      return {isError: true, message: self.getText('MSG_3027')};
    }
    if(validaService.isEmpty(self.state.farmaceutica)) {
      return {isError: true, message: self.getText('MSG_3035')};
    }
    return response;
  },

  validaExiste: function() {
    var self = this;
    var res = {isError: true, message: self.getText('MSG_111')};
    return res;
  },
  onFileSelected: function(fileName, fileBase64) {
    //console.log('fileName:' + fileName + ', fileBase64:' + fileBase64);
    this.setState({
      image64: fileBase64
    });
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
           self.showInfo(res.message, {zindex: 6});
        } else{
            var params = {
               'id_grupo':self.state.comboValue,
               'id_med':self.state.id_med,
               'codigo_barras':self.state.codigo_barras,
               'presentacion': self.state.presentacion,
               'descripcion':self.state.descripcion,
               'cantidad_maxima':self.state.cantidad_maxima,
               'cantidad_minima':self.state.cantidad_minima,
               'existencia':self.state.existencia,
               'indicasiones':self.state.indicasiones,
               'via_aministracion':self.state.via_aministracion,
               'fecha_alta': self.state.fecha_alta,
               'fecha_caducidad':self.state.fecha_caducidad,
               'condicion_venta':self.state.condicion_venta,
               'precio':self.state.precio,
               'iva':self.state.iva,
               'farmaceutica':self.state.farmaceutica,
               'elaborado_en':self.state.elaborado_en,
               'image64':self.state.image64
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
                            lista_detalles: lista_detalle_tmp,
                            codigo_barras:'',
                            presentacion:'',
                            descripcion:'',
                            cantidad_maxima:'',
                            cantidad_minima:'',
                            existencia:'',
                            indicasiones:'',
                            via_aministracion:'',
                            fecha_alta:'',
                            fecha_caducidad:'',
                            condicion_venta:'',
                            precio:0.0,
                            iva:0.0,
                            farmaceutica:'',
                            elaborado_en:'',
                            id_grupo:'',
                            comboValue:1,
                            lista_detalles_med:[]
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
        self.showInfo(response.message, {zindex: 6});
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
      var rows_grupos = self.state.lista_combo.map(function(grupo) {
        return (
           <option value={grupo.gru_id}>{grupo.gru_nombre}</option>
        );
      });
      listaAlmacenComboOption.push(rows_grupos);
    }


    return (
      <div className={className}>
        <div className='fondoShow' style={{zIndex: this.state.zindex-1}}>&nbsp;</div>
        <div className={'panel panel-default popUpClassMedicament'} style={{zIndex: this.state.zindex-1}}>
          <div className='panel-heading'>
            {this.getText('MSG_3009')}
          </div>
          <div className='panel-body'>


            <div style={{width: '100%'}} className='panelForm'>

              <div style={{width: '90%'}} className='row'>
                <div style={{width: '50%', textAlign: 'right', paddingRight: '10px', color:'red'}} className='left_align'>
                  {this.getText('MSG_3034')}
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3029')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3029')} value={this.state.codigo_barras}
                    onChange={this.onChangeCodigoBarras}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_3014')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3014')} value={this.state.descripcion}
                   onChange={this.onChangeDescripcion}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3010')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3010')} value={this.state.presentacion}
                    onChange={this.onChangePresentacion}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3011')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3011')} value={this.state.cantidad_maxima}
                    onChange={this.onChangeCantidad_maxima}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3012')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3012')} value={this.state.cantidad_minima}
                    onChange={this.onChangeCantidad_minima}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3013')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3013')} value={this.state.existencia}
                    onChange={this.onChangeExistencia}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_3015')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3015')} value={this.state.indicasiones}
                    onChange={this.onChangeIndicasiones}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_3016')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3016')} value={this.state.via_aministracion}
                  onChange={this.onChangeViaAdministracion}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3021')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                   <select className='form-control' value={this.state.comboValue} onChange={this.onChangeCombo}>
                      {listaAlmacenComboOption}
                   </select>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3018')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <DatePickerReact inputLabel='' onDatePicked={this.onDatePicked} />
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3019')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <DatePickerReact inputLabel='' onDatePicked={this.onDatePickedDos} />
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_3005')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3005')} value={this.state.condicion_venta}
                    onChange={this.onChangeCondicionVenta}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_3030')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3030')} value={this.state.precio}
                    onChange={this.onChangePrecio}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_3031')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3031')} value={this.state.iva}
                    onChange={this.onChangeIva}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3003')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3003')} value={this.state.farmaceutica}
                    onChange={this.onChangeFarmaceutica}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_3004')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3004')} value={this.state.elaborado_en}
                    onChange={this.onChangeElaboradoEn}/>
                </div>
              </div>

              <br></br>
              <div style={{width: '80%'}} className='row'>
                    <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                      {this.getText('MSG_3037')}:
                    </div>
                    <div style={{width: '58%'}} className='left_align'>
                        <InputFileReact className='form-control' ref='inputFile' extensions={['.png', '.gif', '.jpg']} onFileSelected={this.onFileSelected}/>
                    </div>

                    <div style={{width: '72%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                        <div>
                          <img style={{width: '150px', height: '150px'}} src={this.state.image64} />
                        </div>
                    </div>
              </div>
            </div>

            <br></br>

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
                   <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_3020')}  onClick={this.onClickRegresar} />
               </div>
               <div className="btn-group" role="group">
                   <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_206')}  onClick={this.onClickGuardar} />
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
