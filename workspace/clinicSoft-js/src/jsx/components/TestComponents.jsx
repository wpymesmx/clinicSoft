'use strict';

var React = require('react');

//mixins
var LanguageMixin = require('../mixins/LanguageMixin.js');

//mixins
var NavigatorMixin = require('../mixins/NavigatorMixin.js');
var AlertMixin = require('../mixins/AlertMixin.js');
//utils
var Constants = require('../utils/Constants.js');
//components
var DatePickerReact = require('./DatePickerReact.jsx');
//servicios
var medicamentoService = require('../services/MedicamentoService.js');

var validaService = require('../utils/ValidaService.js');
//sweetalert for pupup
var swal=require('sweetalert');

var TestComponents = React.createClass({
  mixins: [NavigatorMixin(), AlertMixin()],
    getDefaultProps: function() {
    //console.log('# MedicamentoAlta->getDefaultProps #');
    return {
      zindex: 4
    };
  },
  getInitialState: function() {
    //console.log('# App->getInitialState #');
    return {
      componentKey: 'Test',
      language: window.language,
      zindex: this.props.zindex,
      mainComponent: undefined,
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
      id_med:5,
      id_almacen:'',
      lista_combo: [],
      lista_detalles: [],
      lista_detalle_tmp:[],
      comboValue: 0
    };
  },
  componentWillMount: function() {
    //console.log('# App->componentWillMount #');
    this.subscribe(this.state.componentKey, this.navigatorApp);
    this.subscribeAlert(this.state.componentKey, this.alertFun);
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
    //console.log('# App->componentWillUnmount #');
    this.unSubscribe(this.state.componentKey);
    this.unSubscribeAlert(this.state.componentKey);
  },
  onClickSalir: function(evt) {
    this.goToComponent(Constants.LOGIN_VIEW);
  },
  onClickIrWelcome: function(evt) {
    this.goToComponent(Constants.WELCOME_VIEW);
  },
  onDatePicked: function(datePicked, evt) {
    console.log('datePicked->' + datePicked);

    this.setState({
      datePicked: (datePicked.getDate() + '/' + (datePicked.getMonth()+1) + '/' + datePicked.getFullYear())
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
   onChangeCombo: function(evt) {
   this.setState({
     comboValue: evt.target.value,
     det_ubicacion: evt.target.value
   });
  },

  onClickRecuperaDatos: function(evt) {
    var self = this;
    var params = {
        'presentacion': this.state.presentacion,
        'cantidad_maxima': this.state.cantidad_maxima,
        'cantidad_minima': this.state.cantidad_minima,
        'existencia': this.state.existencia,
        'fecha_caducidad': this.state.fecha_caducidad
    };
    var lista_detalle_tmp = this.state.lista_detalles;
    lista_detalle_tmp.push(params);
    this.setState({
       lista_detalles: lista_detalle_tmp
    });
  },

  validaFormulario: function() {
    var response = {
      isError: false,
      message: ''
    };

    if(validaService.isEmpty(this.state.presentacion)) {
      return {isError: true, message: this.getText('MSG_109')};
    }

    return response;
  },
   validaExiste: function() {
    var res = {isError: true, message: this.getText('MSG_110')};
    return res;
  },

  onClickGuardar: function(evt) {
    var self = this;

    var onSuccess = function(response) {
        console.log('# success  #');
     };
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
                         medicamentoService.insertarDetalleMed(params, onSuccess, self.onError, self.onFail),
                         swal('Aceptar!','Medicamento Registrado Con Exito.',
                        'success');

                     }else {
                        swal('Cancelar', 'El Registro Del Medicamento Fue Cancelado.', 'error');
                     }
                   });
  },

  render: function() {
    //console.log('# App->render #');

     if(this.state.lista_detalles.length > 0) {
      var rows_detalles = this.state.lista_detalles.map(function(auxDetalle) {
        return (
          <tr>
            <td>{auxDetalle.presentacion}</td>
            <td>{auxDetalle.cantidad_maxima}</td>
            <td>{auxDetalle.cantidad_minima}</td>
            <td>{auxDetalle.existencia}</td>
            <td>{auxDetalle.fecha_caducidad}</td>
            <td><button className='detalleButton'/></td>
          </tr>
        );
      });
    }



    //La variable almacen puede tomar cualquier nombre.
    var listaAlmacenComboOption = [];
    listaAlmacenComboOption.push(<option value="0">SELECCIONE UNA OPCIÓN</option>);
    if(this.state.lista_combo.length>0){
      var rows_almacen = this.state.lista_combo.map(function(almacen) {
        return (
           <option value={almacen.det_id}>{almacen.det_ubicacion}</option>
        );
      });

      listaAlmacenComboOption.push(rows_almacen);
    }

    return (
          <div style={{width: '100%', height: '100%'}}>
          <table>
           <tbody>
            <tr>
                <td><input type='text' className='form-control' placeholder='Presentación' value={this.state.presentacion} onChange={this.onChangePresentacion}/></td>
                <td><input type='text' className='form-control' placeholder='Cantidad Maxima' value={this.state.cantidad_maxima} onChange={this.onChangeCantidad_maxima}/></td>
            </tr>
            <tr>
                <td><input type='text' className='form-control' placeholder='Cantidad Minima' value={this.state.cantidad_minima} onChange={this.onChangeCantidad_minima}/></td>
                <td><input type='text' className='form-control' placeholder='Existencia' value={this.state.existencia} onChange={this.onChangeExistencia}/></td>
            </tr>
            <tr>
                <td><input type='text' className='form-control' placeholder='Descripción' value={this.state.descripcion} onChange={this.onChangeDescripcion}/></td>
                <td><input type='text' className='form-control' placeholder='Indicasiones' value={this.state.indicasiones} onChange={this.onChangeIndicasiones}/></td>
            </tr>
            <tr>
                <td><input type='text' className='form-control' placeholder='Via Aministracion' value={this.state.via_aministracion} onChange={this.onChangeViaAdministracion}/></td>
                <td>
                   <div>
                      <select className='form-control' value={this.state.comboValue} onChange={this.onChangeCombo}>
                         {listaAlmacenComboOption}
                      </select>
                   </div>
               </td>
            </tr>
            <tr>
                <td><DatePickerReact inputLabel='Fecha Alta:' onDatePicked={this.onDatePicked}/></td>
                <td><DatePickerReact inputLabel='Fecha Caducidad:' onDatePicked={this.onDatePicked}/></td>
                <td><button className='nuevoButton' onClick={this.onClickRecuperaDatos} /> </td>
            </tr>
          </tbody>
          </table>

          <div className="btn-group" role="group">
                   <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value='Guardar' onClick={this.onClickGuardar} />
          </div>

          <div>
           <table className='table table-bordered table-hover'>
           <tbody>
             <tr className='alert alert-success trHeader' role='alert'>
             <td>Presentación</td>
             <td>Cantidad Maxima</td>
             <td>Cantidad Minima</td>
             <td>Existencia</td>
             <td>Caducidad</td>
             <td></td>
            </tr>
            {rows_detalles}
          </tbody>
          </table>
          </div>

      </div>

    );
  }
});

module.exports = TestComponents;
