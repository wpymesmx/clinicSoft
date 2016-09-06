/**
* __title__ = 'Gestion de medicamento.'
* __author__ = '@LLV'
* __date__ = '26/08/2016'
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
var medicamentoService = require('../services/MedicamentoService.js');
//sweetalert for pupup
var swal=require('sweetalert');
//componentes de la aplicacion
var MedicamentoEditar = require('./MedicamentoEditar.jsx');
var MedicamentoAlta = require('./MedicamentoAlta.jsx');
var DataGridReact = require('./DataGridReact.jsx');

//@LLV Inicia Clase Principal Medicamento.
var Medicamento = React.createClass({
  mixins: [NavigatorMixin(), AlertMixin(), LanguageMixin()],
  getInitialState: function() {
    return {
      componentKey: Constants.MEDICAMENTO_VIEW,
      language: window.language,
      id:'',
      nombre_comercial: '',
      nombre_generico: '',
      estado:'A',
      lista_medicamentos: [],
      lista_combo: [],
      comboValue: 0
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
        lista_medicamentos: response.payload
      });
      self.refs.medicDataList.updateDateList(response.payload);
    };
    var params = {
        'nombre_comercial': this.state.nombre_comercial,
        'nombre_generico': this.state.nombre_generico
    };
    medicamentoService.buscar(params, onSuccess, this.onError, this.onFail);
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
  onChangeCombo: function(evt) {
   this.setState({
     comboValue: evt.target.value,
     nombre_comercial: evt.target.value
   });
  },

  //@LLV Método que consulta todos los medicamentos.
  onClickBuscar: function(evt) {
    var self = this;
    var onSuccess = function(response) {
      console.log('# success  #');
      self.setState({
        lista_medicamentos: response.payload
      });
      self.refs.medicDataList.updateDateList(response.payload);
    };

    var params = {
        'nombre_comercial': this.state.nombre_comercial,
        'nombre_generico': this.state.nombre_generico
    };
    medicamentoService.buscar(params, onSuccess, this.onError, this.onFail);
  },

  //@LLV Método muestra el popup para regirtar un nuevo medicamento.
  onClickNuevo: function(evt) {
    var self = this;
    var onSuccess = function(response) {
      console.log('# success  #');
    };
    this.refs.medicamentoAlta.show();
  },

  //@LLV Muestra El Pupup para  editar un medicamento.
  onClickEditar: function(medicamento, index, evt) {
    var self = this;
    var onSuccess = function(response) {
      console.log('# success  #');
    };
    this.refs.medicamentoEditar.show(medicamento);
  },

  //@LLV Metodo principal que mostrara todos.
  render: function() {
    //console.log('# App->render #');
    var self = this;

    return (
     <div>
       <MedicamentoAlta ref='medicamentoAlta' />
       <MedicamentoEditar ref='medicamentoEditar' />
        <div className='panel panel-default'>
          <div className='panel-heading'>{this.getText('MSG_3000')}</div>
          <div className='panel-body'>
            <div style={{width: '100%'}} className='panelForm'>
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '25%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3001')} value={this.state.nombre_comercial}
                    onChange={this.onChangeNombreComercial}/>
                </div>
                <div style={{width: '25%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3002')} value={this.state.nombre_generico}
                    onChange={this.onChangeNombreGenerico} />
                </div>
                <div className='group-btn'>
                  <button className='btn btn-default buscarButton' type='button' title={this.getText('MSG_204')} onClick={this.onClickBuscar} />
                </div>
              </div>
            </div>
            <div>
              <div className='btn-group left_left' style={{width: '90%'}}>
                <button type='button' className='informeButton' title={this.getText('MSG_3024')} style={{float: 'right'}} />
                   &nbsp;
                <button type='button' className='nuevoButton'  title={this.getText('MSG_205')} style={{float: 'right'}} onClick={this.onClickNuevo}/>
              </div>
            </div>
          </div>
        </div>
        <DataGridReact ref='medicDataList' dataList={this.state.lista_medicamentos}
          headerOptions={[
            {property: 'nombre_comercial', label: 'MSG_3001', placeholder: 'MSG_3001', width: '31%',
              isOrderBy: true, isFilterText: true},
            {property: 'nombre_generico', label: 'MSG_3002', placeholder: 'MSG_3002', width: '31%',
              isOrderBy: true, isFilterText: true},
            {property: 'estado', label: 'MSG_3006', width: '31%', isOrderBy: true},
            {property: '', label: '', width: '7%'}
          ]}
          colOptions={[
            {property: 'nombre_comercial', width: '31%'},
            {property: 'nombre_generico', width: '31%'},
            {property: 'estado', width: '31%', textAlign: 'center', catalog:[{id: 'A', value: 'MSG_202'}, {id: 'I', value: 'MSG_203'}]},
            {property: '', width: '7%', type: 2, style: 'editarButton', onClickButton: this.onClickEditar, labelButton: 'MSG_200'}
          ]}/>
      </div>
    );
  }
});
module.exports = Medicamento;
