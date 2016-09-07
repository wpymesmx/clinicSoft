/**
* __title__ = 'Detalle Medicamento Editar.'
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
var MedicamentoEditar = require('./MedicamentoEditar.jsx');
var validaService = require('../utils/ValidaService.js');

//@LLV Inicio de la clase principal.
var DetalleMedicamentoEditar= React.createClass({
  mixins: [LanguageMixin(),AlertMixin()],
  getDefaultProps: function() {
    //console.log('# DetalleMedicamentoEditar->getDefaultProps #');
    return {
      zindex: 4
    };
  },
  getInitialState: function() {
    //console.log('# App->getInitialState #');
    return {
      componentKey: 'DetalleMedicamentoEditar',
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
      id_grupo:'',
      lista_combo: [],
      lista_detalles_med:[],
      lista_detalles: [],
      lista_detalle_tmp:[],
      medicamento:undefined,
      comboValue: 1
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
  onDatePickedUno: function(datePicked, evt) {
    console.log('datePicked->' + datePicked);

    this.setState({
      fecha_alta: (datePicked.getDate() + '/' + (datePicked.getMonth()+1) + '/' + datePicked.getFullYear())
    });
  },
  onDatePickedDosUno: function(datePicked, evt) {
    console.log('datePicked->' + datePicked);

    this.setState({
      fecha_caducidad: (datePicked.getDate() + '/' + (datePicked.getMonth()+1) + '/' + datePicked.getFullYear())
    });
  },
  onChangeCodigoBarrasUno: function(evt) {
    this.setState({
      codigo_barras: evt.target.value
    });
  },
  onChangePresentacionUno: function(evt) {
    this.setState({
      presentacion: evt.target.value
    });
  },
  onChangeCantidad_maximaUno: function(evt) {
    if(validaService.isEmpty(evt.target.value) || validaService.isOnlyNumbersTwo(evt.target.value)) {
        this.setState({
          cantidad_maxima: evt.target.value
        });
    }
  },
  onChangeCantidad_minimaUno: function(evt) {
    if(validaService.isEmpty(evt.target.value) || validaService.isOnlyNumbers(evt.target.value)) {
        this.setState({
          cantidad_minima: evt.target.value
        });
    }
  },
  onChangeExistenciaUno: function(evt) {
    if(validaService.isEmpty(evt.target.value) || validaService.isOnlyNumbers(evt.target.value)) {
        this.setState({
          existencia: evt.target.value
        });
    }
  },

  onChangeDescripcionUno: function(evt) {
    this.setState({
      descripcion: evt.target.value
    });
  },

  onChangeIndicasionesUno: function(evt) {
    this.setState({
      indicasiones: evt.target.value
    });
  },
  onChangeViaAdministracionUno: function(evt) {
    this.setState({
      via_aministracion: evt.target.value
    });
  },
  onChangeFechaAltaUno: function(evt) {
    this.setState({
      fecha_alta: evt.target.value
    });
  },
  onChangeFechaCaducidadUno: function(evt) {
    this.setState({
      fecha_caducidad: evt.target.value
    });
  },

  onChangeCondicionVentaUno: function(evt) {
    this.setState({
      condicion_venta: evt.target.value
    });
  },

  onChangePrecioUno: function(evt) {
    if(validaService.isEmpty(evt.target.value) || validaService.isDecimal(evt.target.value)) {
        this.setState({
          precio: evt.target.value
        });
    }
  },

  onChangeIvaUno: function(evt) {
    if(validaService.isEmpty(evt.target.value) || validaService.isDecimal(evt.target.value)) {
        this.setState({
          iva: evt.target.value
        });
    }
  },

  onChangeFarmaceuticaUno: function(evt) {
    this.setState({
      farmaceutica: evt.target.value
    });
  },

  onChangeElaboradoEnUno: function(evt) {
    this.setState({
      elaborado_en: evt.target.value
    });
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

  onChangePresentacion: function(index,evt) {
    var lista_detalles_med=this.state.lista_detalles_med;
    var detalle= lista_detalles_med[index];
    detalle.dem_presentacion=evt.target.value;
    this.setState({
      lista_detalles_med: lista_detalles_med
    });
  },
  onChangeCantidad_maxima: function(index,evt) {
        var lista_detalles_med=this.state.lista_detalles_med;
        var detalle= lista_detalles_med[index];
        if(validaService.isEmpty(evt.target.value) || validaService.isOnlyNumbers(evt.target.value)) {
            detalle.dem_cantidad_maxima=evt.target.value;
            this.setState({
              lista_detalles_med: lista_detalles_med
            });
       }
  },
  onChangeCantidad_minima: function(index,evt) {
    var lista_detalles_med=this.state.lista_detalles_med;
    var detalle= lista_detalles_med[index];
    if(validaService.isEmpty(evt.target.value) || validaService.isOnlyNumbers(evt.target.value)) {
        detalle.dem_cantidad_minima=evt.target.value;
        this.setState({
          lista_detalles_med: lista_detalles_med
        });
    }
  },
  onChangeExistencia: function(index,evt) {
    var lista_detalles_med=this.state.lista_detalles_med;
    var detalle= lista_detalles_med[index];
    if(validaService.isEmpty(evt.target.value) || validaService.isOnlyNumbers(evt.target.value)) {
        detalle.dem_en_existencia=evt.target.value;
        this.setState({
          lista_detalles_med: lista_detalles_med
        });
    }
  },
  onChangeDescripcion: function(index,evt) {
    var lista_detalles_med=this.state.lista_detalles_med;
    var detalle= lista_detalles_med[index];
    detalle.dem_descripcion=evt.target.value
    this.setState({
      lista_detalles_med: lista_detalles_med
    });
  },
  onChangeIndicasiones: function(index,evt) {
    var lista_detalles_med=this.state.lista_detalles_med;
    var detalle= lista_detalles_med[index];
    detalle.dem_indicasiones=evt.target.value
    this.setState({
      lista_detalles_med: lista_detalles_med
    });
  },
  onChangeViaAdministracion: function(index,evt) {
    var lista_detalles_med=this.state.lista_detalles_med;
    var detalle= lista_detalles_med[index];
    detalle.dem_via_admin=evt.target.value
    this.setState({
      lista_detalles_med: lista_detalles_med
    });
  },
  onChangeFechaAlta: function(index,evt) {
    var lista_detalles_med=this.state.lista_detalles_med;
    var detalle= lista_detalles_med[index];
    detalle.dem_fecha_alta=evt.target.value
    this.setState({
      lista_detalles_med: lista_detalles_med
    });
  },
  onChangeFechaCaducidad: function(index,evt) {
    var lista_detalles_med=this.state.lista_detalles_med;
    var detalle= lista_detalles_med[index];
    detalle.dem_fecha_caducidad=evt.target.value
    this.setState({
      lista_detalles_med: lista_detalles_med
    });
  },
   onChangeCondicionVenta: function(index,evt) {
    var lista_detalles_med=this.state.lista_detalles_med;
    var detalle= lista_detalles_med[index];
    detalle.dem_condicion_venta= evt.target.value
    this.setState({
      lista_detalles_med: lista_detalles_med
    });
  },

  onChangePrecio: function(index,evt) {
    var lista_detalles_med=this.state.lista_detalles_med;
    var detalle= lista_detalles_med[index];
    if(validaService.isEmpty(evt.target.value) || validaService.isDecimal(evt.target.value)) {
        detalle.dem_precio=evt.target.value;
        this.setState({
          lista_detalles_med: lista_detalles_med
        });
    }
  },

  onChangeIva: function(index, evt) {
    var lista_detalles_med=this.state.lista_detalles_med;
    var detalle= lista_detalles_med[index];
    if(validaService.isEmpty(evt.target.value) || validaService.isDecimal(evt.target.value)) {
        detalle.dem_iva=evt.target.value;
        this.setState({
          lista_detalles_med: lista_detalles_med
        });
    }
  },

  onChangeFarmaceutica: function(index, evt) {
    var lista_detalles_med=this.state.lista_detalles_med;
    var detalle= lista_detalles_med[index];
    detalle.dem_farmaceutica=evt.target.value
    this.setState({
      lista_detalles_med: lista_detalles_med
    });
  },

  onChangeElaboradoEn: function(index, evt) {
    var lista_detalles_med=this.state.lista_detalles_med;
    var detalle= lista_detalles_med[index];
    detalle.dem_elaborado_en=evt.target.value
    this.setState({
      lista_detalles_med: lista_detalles_med
    });
  },

  onChangeCombo: function(evt) {
   this.setState({
     comboValue: evt.target.value,
     gru_nombre: evt.target.value
   });
  },
  show: function(id_med,medicamento) {
    //aqui limpiar componente
    console.log('# id_med que recibe cuando cargo el view detalle_medicamento.#');
    console.log(id_med);
    this.setState({
      show: true,
      medicamento:medicamento,
      id_med:id_med
    });

    //@LLV Reaiza una consulta de detalles del medicamento
    console.log('/*Into onClickBuscar*/');
    var self = this;
    var onSuccess = function(response) {
      console.log('# success  #');
      console.log(response.payload);
      self.setState({
        lista_detalles_med: response.payload
      });
    };
    var params = {
        'id_med': id_med
    };
    console.log('*Parametro enviado para buscar detalles*');
    console.log(self.state.id_med);
    medicamentoService.buscarDetalles(params, onSuccess, self.onError, self.onFail);

  },
  hide: function() {
    //aqui limpiar componente
    this.setState({
      show: false
    });
  },
  onClickBuscar: function(evt) {
    console.log('/*Into onClickBuscar*/');
    var self = this;
    var onSuccess = function(response) {
      console.log('# success  #');
      console.log(response.payload);
      self.setState({
        lista_detalles_med: response.payload
      });
    };
    var params = {
        'id_med': self.state.id_med
    };
    console.log('*Parametro enviado para buscar detalles*');
    console.log(self.state.id_med);
    medicamentoService.buscarDetalles(params, onSuccess, self.onError, self.onFail);
  },

  //@LLV Método utilizado para cerrar popup y limpiar componentes.
  onClickCerrar: function(evt) {
    this.setState({
      show: false
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
    this.state.id_grupo='',
    this.state.comboValue=1,
    this.state.lista_detalles_med=[]
  },

  //@LLV Método utilizado para regresar a la ventana  anterior.
  onClickRegresar: function(evt) {
    var onSuccess = function(response) {
      console.log('# success  #');
    };
    //Oculto el popup de DetalleMedicamentoEditar
    this.hide();
    //Muestro el popup de MedicamentoEditar
    this.props.papa.show(this.state.medicamento);
  },

  //@LLV Método utilizado para validar los campos de entrada del formulario.
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
    if(validaService.isEmpty(self.state.cantidad_minima) || !validaService.isOnlyNumbers(self.state.cantidad_minima)) {
      return {isError: true, message: self.getText('MSG_3026')};
    }
    if(validaService.isEmpty(self.state.existencia) || !validaService.isOnlyNumbers(self.state.existencia)) {
      return {isError: true, message: self.getText('MSG_3027')};
    }
    if(validaService.isEmpty(self.state.farmaceutica)) {
      return {isError: true, message: self.getText('MSG_3035')};
    }
    return response;
  },

  //@LLV Método utilizado para validar los campos de entrada para la edición.
  validaCamposEdicion: function(index) {
    var self = this;
    var response = {
      isError: false,
      message: ''
    };
    var detalles_med=this.state.lista_detalles_med[index];

    if(validaService.isEmpty(detalles_med.dem_presentacion)) {
      return {isError: true, message: self.getText('MSG_112')};
    }
    if(validaService.isEmpty(detalles_med.dem_cantidad_maxima)) {
      return {isError: true, message: self.getText('MSG_3025')};
    }
    if(validaService.isEmpty(detalles_med.dem_cantidad_minima)) {
      return {isError: true, message: self.getText('MSG_3026')};
    }
    if(validaService.isEmpty(detalles_med.dem_en_existencia)) {
      return {isError: true, message: self.getText('MSG_3027')};
    }
    if(validaService.isEmpty(detalles_med.dem_farmaceutica)) {
      return {isError: true, message: self.getText('MSG_3035')};
    }
    return response;
  },

  validaRegistros: function(index) {
    var self = this;
    var response = {
      isError: false,
      message: ''
    };
    var detalles_med=this.state.lista_detalles_med[index];

    if(validaService.isEmpty(detalles_med.dem_presentacion)) {
      return {isError: true, message: self.getText('MSG_112')};
    }


    return response;
  },

  //@LLV Método utilizado para eliminar un detalle del medicamento.
  onClickEliminar:  function(index,evt){
       var onSuccess = function(response) {
          console.log('# success  #');
       };
       var self = this;
       var detalles_med=this.state.lista_detalles_med[index];
       console.log(detalles_med.dem_presentacion);
       var params = {
           'dem_id': detalles_med.dem_id
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
                         swal('Aceptar!','Presentación Eliminada Con Exito.',
                        'success');

                     }else {
                        swal('Cancelar', 'La Eliminación De La Presentación Fue Cancelada.', 'error');
                     }
                   });
  },

  //@LLV Método utilizado para agruegar un nuevo detalle a un medicamento.
  onClickGuardar: function(evt) {
    var onSuccess = function(response) {
      console.log('# success  #');
    };
    var self = this;
    var response = this.validaFormulario();
    if(!response.isError) {
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
               'elaborado_en':self.state.elaborado_en
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
                         swal('Aceptar!','Presentación Registrada Con Exito.', 'success');
                         var auxParams = {
                            'presentacion': self.state.presentacion,
                            'cantidad_maxima': self.state.cantidad_maxima,
                            'cantidad_minima': self.state.cantidad_minima,
                            'existencia': self.state.existencia,
                            'fecha_caducidad': self.state.fecha_caducidad
                         };
                         self.onClickLimpiar();
                     }else {
                        swal('Cancelar', 'El Registro De La Presentación Fue Cancelado.', 'error');
                     }
                   });
    } else {
        self.showInfo(response.message, {zindex: 6});
    }
  },

  //@LLV Método utilizado para editar un detalle del medicamento.
  onClickEditarDetalle: function(index,evt) {
    var onSuccess = function(response) {
        console.log('# success  #');
    };
    var self = this;
    var response = this.validaCamposEdicion(index);
    if(!response.isError) {
        var detalles_med=this.state.lista_detalles_med[index];
            var params = {
               'dem_id': detalles_med.dem_id,
               'id_med': self.state.id_med,
               'presentacion': detalles_med.dem_presentacion,
               'descripcion': detalles_med.dem_descripcion,
               'cantidad_maxima': detalles_med.dem_cantidad_maxima,
               'cantidad_minima': detalles_med.dem_cantidad_minima,
               'existencia': detalles_med.dem_en_existencia,
               'indicasiones': detalles_med.dem_indicasiones,
               'via_aministracion': detalles_med.dem_via_admin,
               'fecha_alta': detalles_med.dem_fecha_alta,
               'fecha_caducidad': detalles_med.dem_fecha_caducidad,
               'condicion_venta': detalles_med.dem_condicion_venta,
               'precio': detalles_med.dem_precio,
               'iva': detalles_med.dem_iva,
               'farmaceutica': detalles_med.dem_farmaceutica,
               'elaborado_en': detalles_med.dem_elaborado_en
            };
            console.log(params);
            swal({title: 'Confirmar Edición?',
               text: 'Desea Continuar Con La Edición De La Presentación!',
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
                         medicamentoService.editarDetalle(params, onSuccess, self.onError, self.onFail),
                         swal('Aceptar!','Presentación Editada Con Exito.',
                        'success');
                     }else {
                        swal('Cancelar', 'La Edición Fue Cancelada.', 'error');
                     }
                   });

    } else {
        self.showInfo(response.message, {zindex: 6});
    }

  },

  //@LLV Función principal para mostrar los componetes.
  render: function() {
    //console.log('# DetalleMedicamentoEditar->render #');
    var listaDetallesDiv = (<div></div>);
    var self = this;
    var CLASS_HIDDEN = 'componentHide';
    var CLASS_SHOW = 'componentShow';
    var className = '';
    className = (self.state.show == true ? CLASS_SHOW : CLASS_HIDDEN);
    var rows_detalles = [];
     console.log('total detalles');
     console.log(self.state.lista_detalles_med.length);
     if(self.state.lista_detalles_med.length > 0) {
      rows_detalles = self.state.lista_detalles_med.map(function(detalle,index) {
        return (
          <tr key={detalle.id_med}>
            <td><button className='saveButton' title={self.getText('MSG_206')}  onClick={self.onClickEditarDetalle.bind(self,index)}/></td>
            <td><button className='detalleButton' title={self.getText('MSG_203')} onClick={self.onClickEliminar.bind(self,index)}/></td>

            <td><input style={{width: '315px'}} type='text' className='form-control' placeholder={self.getText('MSG_3014')}  value={detalle.dem_descripcion} onChange={self.onChangeDescripcion.bind(self,index)}/></td>
            <td><input style={{width: '315px'}} type='text' className='form-control' placeholder={self.getText('MSG_3010')}  value={detalle.dem_presentacion} onChange={self.onChangePresentacion.bind(self,index)}/></td>
            <td><input type='text' className='form-control' placeholder={self.getText('MSG_3011')}  value={detalle.dem_cantidad_maxima} onChange={self.onChangeCantidad_maxima.bind(self,index)}/></td>
            <td><input type='text' className='form-control' placeholder={self.getText('MSG_3012')}  value={detalle.dem_cantidad_minima} onChange={self.onChangeCantidad_minima.bind(self,index)}/></td>
            <td><input type='text' className='form-control' placeholder={self.getText('MSG_3013')}  value={detalle.dem_en_existencia} onChange={self.onChangeExistencia.bind(self,index)}/></td>
            <td><input style={{width: '315px'}} type='text' className='form-control' placeholder={self.getText('MSG_3015')}  value={detalle.dem_indicasiones} onChange={self.onChangeIndicasiones.bind(self,index)}/></td>
            <td><input type='text' className='form-control' placeholder={self.getText('MSG_3016')}  value={detalle.dem_via_admin} onChange={self.onChangeViaAdministracion.bind(self,index)}/></td>

            <td><input style={{width: '120px'}} type='text' className='form-control' placeholder={self.getText('MSG_3018')}  value={detalle.dem_fecha_alta} onChange={self.onChangeFechaAlta.bind(self,index)}/></td>
            <td><input style={{width: '120px'}} type='text' className='form-control' placeholder={self.getText('MSG_3019')}  value={detalle.dem_fecha_caducidad} onChange={self.onChangeFechaCaducidad.bind(self,index)}/></td>

            <td><input style={{width: '120px'}} type='text' className='form-control' placeholder={self.getText('MSG_3005')}  value={detalle.dem_condicion_venta} onChange={self.onChangeCondicionVenta.bind(self,index)}/></td>
            <td><input style={{width: '120px'}} type='text' className='form-control' placeholder={self.getText('MSG_3030')}  value={detalle.dem_precio} onChange={self.onChangePrecio.bind(self,index)}/></td>
            <td><input style={{width: '80px'}} type='text' className='form-control' placeholder={self.getText('MSG_3031')}  value={detalle.dem_iva} onChange={self.onChangeIva.bind(self,index)}/></td>
            <td><input style={{width: '200px'}} type='text' className='form-control' placeholder={self.getText('MSG_3003')}  value={detalle.dem_farmaceutica} onChange={self.onChangeFarmaceutica.bind(self,index)}/></td>
            <td><input style={{width: '200px'}} type='text' className='form-control' placeholder={self.getText('MSG_3004')}  value={detalle.dem_elaborado_en} onChange={self.onChangeElaboradoEn.bind(self,index)}/></td>
          </tr>
        );
      });
     }
      listaDetallesDiv = (
        <div className='panelScrollDetalle' >
          <table className='table table-bordered table-hover'>
           <tbody>
             <tr className='alert alert-success default' role='alert'>
               <td style={{width: '100%'}} className='left_align'>{this.getText('MSG_206')}</td>
               <td>{this.getText('MSG_3032')}</td>
               <td>*{this.getText('MSG_3014')}</td>
               <td>*{this.getText('MSG_3010')}</td>
               <td>*{this.getText('MSG_3011')}</td>
               <td>*{this.getText('MSG_3012')}</td>
               <td>*{this.getText('MSG_3013')}</td>
               <td>{this.getText('MSG_3015')}</td>
               <td>{this.getText('MSG_3016')}</td>
               <td>*{this.getText('MSG_3018')}</td>
               <td>*{this.getText('MSG_3019')}</td>
               <td>{this.getText('MSG_3005')}</td>
               <td>{this.getText('MSG_3030')}</td>
               <td>{this.getText('MSG_3031')}</td>
               <td>*{this.getText('MSG_3003')}</td>
               <td>{this.getText('MSG_3004')}</td>
            </tr>
            {rows_detalles}
           </tbody>
          </table>
        </div>
      );

    //@LLV La variable almacen puede tomar cualquier nombre.
    var listaAlmacenComboOption = [];
    listaAlmacenComboOption.push(<option value="0">SELECCIONE UNA OPCIÓN</option>);
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
        <div className={'panel panel-default popUpClassDetalles'} style={{zIndex: this.state.zindex-1}}>
          <div className='panel-heading'>
            {this.getText('MSG_3023')}
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
                    onChange={this.onChangeCodigoBarrasUno}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_3014')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3014')} value={this.state.descripcion}  onChange={this.onChangeDescripcionUno}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3010')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3010')} value={this.state.presentacion}
                    onChange={this.onChangePresentacionUno}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3011')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3011')} value={this.state.cantidad_maxima}
                    onChange={this.onChangeCantidad_maximaUno}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3012')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3012')} value={this.state.cantidad_minima}
                    onChange={this.onChangeCantidad_minimaUno}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3013')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3013')} value={this.state.existencia}
                    onChange={this.onChangeExistenciaUno}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_3015')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3015')} value={this.state.indicasiones}  onChange={this.onChangeIndicasiones}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_3016')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3016')} value={this.state.via_aministracion}  onChange={this.onChangeViaAdministracionUno}/>
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
                  <DatePickerReact inputLabel='' onDatePicked={this.onDatePickedUno} />
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3019')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <DatePickerReact inputLabel='' onDatePicked={this.onDatePickedDosUno} />
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_3005')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3005')} value={this.state.condicion_venta}
                    onChange={this.onChangeCondicionVentaUno}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_3030')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3030')} value={this.state.precio}
                    onChange={this.onChangePrecioUno}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_3031')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3031')} value={this.state.iva}
                    onChange={this.onChangeIvaUno}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_3003')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3003')} value={this.state.farmaceutica}
                    onChange={this.onChangeFarmaceuticaUno}/>
                </div>
              </div>

              <div style={{width: '80%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_3004')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3004')} value={this.state.elaborado_en}
                    onChange={this.onChangeElaboradoEnUno}/>
                </div>
              </div>


            {listaDetallesDiv}
            </div>
          </div>
        <div className='panel-footer button-align-right'>
          <div className='input-group' style={{align: 'center'}}>
             <div className="btn-group btn-group-justified" role="group" aria-label="...">
               <div className="btn-group" role="group">
                  <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_102')}  onClick={this.onClickCerrar}/>
               </div>
               <div className="btn-group" role="group">
                   <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_3020')}  onClick={this.onClickRegresar}/>
               </div>
               <div className="btn-group" role="group">
                   <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_204')}  onClick={this.onClickBuscar} />
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

module.exports = DetalleMedicamentoEditar;
