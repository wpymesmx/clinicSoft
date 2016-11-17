/**
* __title__ = 'Gestion de pacientes.'
* __author__ = '@LLV'
* __date__ = '21/09/2016'
*/

'use strict';
var React = require('react');
//mixins
var NavigatorMixin = require('../mixins/NavigatorMixin.js');
var LanguageMixin = require('../mixins/LanguageMixin.js');
var AlertMixin = require('../mixins/AlertMixin.js');
//utils
var Constants = require('../utils/Constants.js');
//servicios
var pacienteService = require('../services/PacienteService.js');
//sweetalert for pupup
var swal=require('sweetalert');
var DataGridReact = require('./DataGridReact.jsx');

//componentes de la aplicacion
var PatientNew = require('./PatientNew.jsx');
var PatientEdit = require('./PatientEdit.jsx');

//@LLV Inicia Clase Principal Paciente.
var Paciente = React.createClass({
  mixins: [NavigatorMixin(), AlertMixin(), LanguageMixin()],
  getInitialState: function() {
    return {
      componentKey: Constants.PACIENTE_VIEW,
      language: window.language,
      pac_id:'',
      nombre: '',
      paterno: '',
      paciente:'',
      materno:'',
      fechan:'',
      fechar:'',
      sexo:'',
      domicilio:'',
      celular:'',
      correo:'',
      ocupacion:'',
      tipo:'',
      foto:'',
      estado:'A',
      lista_pacientes: [],
      pacienteDto:{
          paci_image64: '',
          paci_direccion:'',
          paci_telefono:'',
          paci_correo:'',
          paci_ocupacion:'',
          paci_tipo:'',
          paci_foto:''
      }
    };
  },
  componentWillMount: function() {
    //console.log('# App->componentWillMount #');
    this.subscribeLanguage(this.state.componentKey, this.changeSessionLanguage);
  },

  //@LLV Método donde puedes cambiar el estado una vez que montaste el popup.
  componentDidMount: function() {
    //console.log('# App->componentDidMount #');
    var self = this;
    var onSuccess = function(response) {
      console.log('# success  #');
      self.setState({
        lista_pacientes: response.payload
      });
      self.refs.medicDataList.updateDateList(response.payload);
    };
    var params = {
        'pac_nombre': this.state.nombre,
        'pac_paterno': this.state.paterno,
        'pac_materno': this.state.materno,
        'pac_fechan': this.state.fechan,
        'pac_fechar': this.state.fechar,
        'pac_sexo': this.state.sexo
    };
    pacienteService.buscarPaciente(params, onSuccess, this.onError, this.onFail);
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
    this.unSubscribeLanguage(this.state.componentKey);
  },
  onChangeNombre: function(evt) {
    this.setState({
      nombre: evt.target.value
    });
  },
  onChangePaterno: function(evt) {
    this.setState({
      paterno: evt.target.value
    });
  },
  onChangeMaterno: function(evt) {
    this.setState({
      materno: evt.target.value
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
  onChangeCombo: function(evt) {
   this.setState({
     comboValue: evt.target.value,
     nombre_comercial: evt.target.value
   });
  },

  //@LLV Método que consulta todos los pacientes.
  onClickBuscar: function(evt) {
    var self = this;
    var onSuccess = function(response) {
      console.log('# success  #');
      self.setState({
        lista_pacientes: response.payload
      });
      self.refs.medicDataList.updateDateList(response.payload);
    };
    var params = {
        'pac_nombre': this.state.nombre,
        'pac_paterno': this.state.paterno,
        'pac_materno': this.state.materno,
        'pac_fechan': this.state.fechan,
        'pac_fechar': this.state.fechar,
        'pac_sexo': this.state.sexo
    };
    pacienteService.buscarPaciente(params, onSuccess, this.onError, this.onFail);
  },

  //@LLV Método muestra el popup para regirtar un nuevo paciente.
  onClickNuevo: function(pacienteDto,evt) {
    var self = this;
    var onSuccess = function(response) {
      console.log('# success  #');
    };
    this.refs.patientNew.show(pacienteDto);
  },

  //@LLV Método muestra el popup para reportes.
  onClickReportes: function(evt) {
    var self = this;
    var onSuccess = function(response) {
      console.log('# success  #');
    };
   // this.refs.medicamentoAlta.show();
  },

  //@LLV Muestra El popup para  editar un paciente.
  onClickEditar: function(paciente,pacienteDto,evt) {
    var self = this;
    var nombre_original=self.state.paciente.pac_nombre;
    //@LLV recorre lista de pacientes
    var aux_pac_id='';
    if(self.state.lista_pacientes.length>0){
      var rows_pacintes = self.state.lista_pacientes.map(function(objPaciente) {
           aux_pac_id=objPaciente.pac_id;
      });
    }

    var onSuccess = function(response) {
      console.log('# success  #');
    };

    console.log('Valor que envia nombre seleccionado');
    console.log(nombre_original);
    this.refs.patientEdit.show(nombre_original,paciente,pacienteDto);
  },

  //@LLV Metodo principal que mostrara todos.
  render: function() {
    //console.log('# App->render #');
    var self = this;

    return (
     <div>
       <PatientNew ref='patientNew' />
       <PatientEdit ref='patientEdit' />
        <div className='panel panel-default'>
          <div className='panel-heading'>{this.getText('MSG_4000')}</div>
          <div className='panel-body'>
            <div style={{width: '100%'}} className='panelForm'>
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '25%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_500')} value={this.state.nombre}
                    onChange={this.onChangeNombre}/>
                </div>
                <div style={{width: '25%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_501')} value={this.state.paterno}
                    onChange={this.onChangePaterno} />
                </div>
                <div style={{width: '25%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_502')} value={this.state.materno}
                    onChange={this.onChangeMaterno} />
                </div>
                <div className='group-btn'>
                  <button className='btn btn-default buscarButton' type='button' title={this.getText('MSG_204')} onClick={this.onClickBuscar} />
                </div>
              </div>
            </div>
            <div>
              <div className='btn-group left_left' style={{width: '90%'}}>
                <button type='button' className='grafic3d' title={this.getText('MSG_3024')} style={{float: 'right'}} onClick={this.onClickReportes}/>
                   &nbsp;
                <button type='button' className='nuevoButton'  title={this.getText('MSG_205')} style={{float: 'right'}} onClick={this.onClickNuevo.bind(this,this.state.pacienteDto)} />
              </div>
            </div>
          </div>
        </div>
        <DataGridReact ref='medicDataList' dataList={this.state.lista_pacientes}
          headerOptions={[
            {property: 'nombre', label: 'MSG_500', placeholder: 'MSG_500', width: '15%',
              isOrderBy: true, isFilterText: true},
            {property: 'paterno', label: 'MSG_501', placeholder: 'MSG_501', width: '15%',
              isOrderBy: true, isFilterText: true},
            {property: 'materno', label: 'MSG_502', placeholder: 'MSG_502', width: '15%', isOrderBy: true, isFilterText: true},
            {property: 'fechan', label: 'MSG_506', placeholder: 'MSG_506', width: '15%', isOrderBy: true, isFilterText: true},
            {property: 'fechar', label: 'MSG_516', placeholder: 'MSG_516', width: '15%', isOrderBy: true, isFilterText: true},
            {property: 'sexo', label: 'MSG_511', placeholder: 'MSG_511', width: '10%', isOrderBy: true, isFilterText: true},
            {property: '', label: '', width: '7%'}
          ]}
          colOptions={[
            {property: 'pac_nombre', width: '15%'},
            {property: 'pac_paterno', width: '15%'},
            {property: 'pac_materno', width: '15%'},
            {property: 'pac_fechan', width: '15%'},
            {property: 'pac_fechar', width: '15%'},
            {property: 'pac_sexo', width: '10%'},
            {property: 'estado', width: '15%', textAlign: 'center', catalog:[{id: 'A', value: 'MSG_202'}, {id: 'I', value: 'MSG_203'}]},
            {prortype: '', width: '7%', type: 2, style: 'editarButton', onClickButton: this.onClickEditar, labelButton: 'MSG_200'}
          ]}/>
      </div>
    );
  }
});
module.exports = Paciente;
