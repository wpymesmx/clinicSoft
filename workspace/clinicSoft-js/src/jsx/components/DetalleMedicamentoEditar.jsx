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

//components
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
      lista_detalles_med:[],
      lista_detalles: [],
      lista_detalle_tmp:[],
      comboValue: 0
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
      console.log(response.payload);
      self.setState({
        lista_detalles_med: response.payload
      });
    };
    var params = {
        'id_med': self.state.id_med
    };
    medicamentoService.buscarDetalles(params, onSuccess, self.onError, self.onFail);

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
    detalle.dem_cantidad_maxima=evt.target.value
    this.setState({
      lista_detalles_med: lista_detalles_med
    });
  },
  onChangeCantidad_minima: function(index,evt) {
    var lista_detalles_med=this.state.lista_detalles_med;
    var detalle= lista_detalles_med[index];
    detalle.dem_cantidad_minima=evt.target.value
    this.setState({
      lista_detalles_med: lista_detalles_med
    });
  },
  onChangeExistencia: function(index,evt) {
    var lista_detalles_med=this.state.lista_detalles_med;
    var detalle= lista_detalles_med[index];
    detalle.dem_en_existencia=evt.target.value
    this.setState({
      lista_detalles_med: lista_detalles_med
    });
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
  onClickBuscar: function(evt) {
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
    medicamentoService.buscarDetalles(params, onSuccess, self.onError, self.onFail);
  },

  onClickCerrar: function(evt) {
    this.setState({
      show: false
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

  onClickRegresar: function(evt) {
    var onSuccess = function(response) {
      console.log('# success  #');
    };
    //Oculto el popup de DetalleMedicamentoEditar
    this.hide();
    //Muestro el popup de MedicamentoEditar
    this.props.papa.show();
  },

  validaFormulario: function(index) {
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

  validaExiste: function() {
    var self = this;
    var res = {isError: true, message: self.getText('MSG_111')};
    return res;
  },

  onClickEliminar:  function(index,evt){
       var onSuccess = function(response) {
          console.log('# success  #');
       };
       var self = this;
       var detalles_med=this.state.lista_detalles_med[index];
       console.log(detalles_med.dem_presentacion);
       var params = {
           'presentacion': detalles_med.dem_presentacion,
           'id_med': detalles_med.dem_id
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

  onClickEditarDetalle: function(index,evt) {
    var onSuccess = function(response) {
        console.log('# success  #');
    };
    var self = this;
    var response = this.validaFormulario(index);
    if(!response.isError) {
        var detalles_med=this.state.lista_detalles_med[index];
            var params = {
               'dem_id': detalles_med.dem_id,
               'id_med': self.state.id_med,
               'id_almacen': detalles_med.alm_fk,
               'presentacion': detalles_med.dem_presentacion,
               'cantidad_maxima': detalles_med.dem_cantidad_maxima,
               'cantidad_minima': detalles_med.dem_cantidad_minima,
               'existencia': detalles_med.dem_en_existencia,
               'descripcion': detalles_med.dem_descripcion,
               'indicasiones': detalles_med.dem_indicasiones,
               'via_aministracion': detalles_med.dem_via_admin,
               'fecha_alta': detalles_med.dem_fecha_alta,
               'fecha_caducidad': detalles_med.dem_fecha_caducidad
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
        self.showInfo(response.message, {zindex: 4});
    }

  },

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
          <tr key={detalle.dem_id}>
            <td><input type='text' className='form-control' placeholder='Numero de almacen' value={detalle.alm_fk} /></td>
            <td><input type='text' className='form-control' placeholder='Presentación'  value={detalle.dem_presentacion} onChange={self.onChangePresentacion.bind(self,index)}/></td>
            <td><input type='text' className='form-control' placeholder='Cantidad Máxima' value={detalle.dem_cantidad_maxima} onChange={self.onChangeCantidad_maxima.bind(self,index)}/></td>
            <td><input type='text' className='form-control' placeholder='Cantidad Mínima' value={detalle.dem_cantidad_minima} onChange={self.onChangeCantidad_minima.bind(self,index)}/></td>
            <td><input type='text' className='form-control' placeholder='Existencia' value={detalle.dem_en_existencia} onChange={self.onChangeExistencia.bind(self,index)}/></td>
            <td><input type='text' className='form-control' placeholder='Descripción' value={detalle.dem_descripcion} onChange={self.onChangeDescripcion.bind(self,index)}/></td>
            <td><input type='text' className='form-control' placeholder='Indicasiones' value={detalle.dem_indicasiones} onChange={self.onChangeIndicasiones.bind(self,index)}/></td>
            <td><input type='text' className='form-control' placeholder='Via de administración' value={detalle.dem_via_admin} onChange={self.onChangeViaAdministracion.bind(self,index)}/></td>
            <td><input type='text' className='form-control' placeholder='Fecha Alta' value={detalle.dem_fecha_alta} onChange={self.onChangeFechaAlta.bind(self,index)}/></td>
            <td><input type='text' className='form-control' placeholder='Fecha De Caducidad' value={detalle.dem_fecha_caducidad} onChange={self.onChangeFechaCaducidad.bind(self,index)}/></td>
            <td><button className='saveButton' onClick={self.onClickEditarDetalle.bind(self,index)}/></td>
            <td><button className='detalleButton' onClick={self.onClickEliminar.bind(self,index)}/></td>
          </tr>
        );
      });
     }

      listaDetallesDiv = (
        <div>
          <table className='table table-bordered table-hover'>
           <tbody>
             <tr className='alert alert-success trHeader' role='alert'>
             <td>Número Almacen</td>
             <td>Presentación</td>
             <td>Cantidad Máxima</td>
             <td>Cantidad Mínima</td>
             <td>Existencia</td>
             <td>Descripción</td>
             <td>Indicasiones</td>
             <td>Dosis</td>
             <td>Fecha Alta</td>
             <td>Fecha Caducidad</td>
             <td></td>
             <td></td>
            </tr>
            {rows_detalles}
           </tbody>
          </table>
        </div>
      );


    //La variable almacen puede tomar cualquier nombre.
    var listaAlmacenComboOption = [];
    listaAlmacenComboOption.push(<option value="0">SELECCIONE UNA OPCIÓN</option>);
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
        <div className={'panel panel-primary popUpClassDetalles'} style={{zIndex: this.state.zindex-1}}>
          <div className='panel-heading'>
            Editar Detalles Del Medicamento
          </div>
          <div className='panel-body'>
             {listaDetallesDiv}
          </div>
        <div className='panel-footer button-align-right'>
          <div className='input-group' style={{align: 'center'}}>
             <div className="btn-group btn-group-justified" role="group" aria-label="...">
               <div className="btn-group" role="group">
                  <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value='Cerrar'  onClick={this.onClickCerrar}/>
               </div>
               <div className="btn-group" role="group">
                   <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value='Regresar'  onClick={this.onClickRegresar} />
               </div>
                <div className="btn-group" role="group">
                   <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value='Buscar'  onClick={this.onClickBuscar} />
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
