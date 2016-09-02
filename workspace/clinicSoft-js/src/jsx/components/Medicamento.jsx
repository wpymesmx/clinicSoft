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
      nombre_generico: evt.target.value,
      comboValue: 0
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
    var self = this;
    //console.log('# App->render #');
    var listaMedicamentosDiv = (<div></div>);
    //console.log(this.state.lista_medicamentos.length);
    //Evaluar si hay medicamentso registrados. En caso true se recuperan.
    if(this.state.lista_medicamentos.length > 0) {
      var rows_medicamento = this.state.lista_medicamentos.map(function(medicamento, index) {
        return (
          <tr key={medicamento.medicamento_id}>
            <td>{medicamento.nombre_comercial}</td>
            <td>{medicamento.nombre_generico}</td>
            <td>{medicamento.estado}</td>
            <td><button className='editarButton'  title={self.getText('MSG_200')} onClick={self.onClickEditar.bind(self, medicamento, index)} /></td>
          </tr>
        );
      });
    }

      listaMedicamentosDiv = (
        <div>
          <table className='table table-bordered table-hover'>
            <tbody>
              <tr className='alert alert-success trHeader' role='alert'>
                  <td>{this.getText('MSG_3001')}</td>
                  <td>{this.getText('MSG_3002')}</td>
                  <td>{this.getText('MSG_3006')}</td>
                <td></td>
              </tr>
              <tr>
                <td><input type='text' className='form-control' placeholder='Nombre Comercial' value={this.state.nombre_comercial} onChange={this.onChangeNombreComercial}/></td>
                <td><input type='text' className='form-control' placeholder='Nombre Generico' value={this.state.nombre_generico} onChange={this.onChangeNombreGenerico}/></td>
                <td></td>
                <td></td>
              </tr>
              {rows_medicamento}
            </tbody>
          </table>
        </div>
      );

    var listaMedicamentosComboOption = [];
    listaMedicamentosComboOption.push(<option value='0'>SELECCIONE UNA OPCIÓN</option>);
    if(this.state.lista_combo.length>0){
      var rows_medicamento = this.state.lista_combo.map(function(medicamento) {
        return (
           <option value={medicamento.nombre_comercial}>{medicamento.nombre_comercial}</option>
        );
      });
      listaMedicamentosComboOption.push(rows_medicamento);
    }

    return (
     <div>
       <MedicamentoAlta ref='medicamentoAlta' />
       <MedicamentoEditar ref='medicamentoEditar' />
        <div className='panel panel-default'>
          <div className='panel-body'>
            <h1 style={{align: 'center'}}> <span className=''>{this.getText('MSG_3000')}</span></h1>
            <div className='btn-group btn-group-justified' role='group' aria-label='...'>
            <div className='btn-group' role='group'>
            </div>
            <div className='btn-group' role='group'>
            </div>
            <div className='btn-group' role='group'>
            </div>
            <div className='btn-group' role='group'>
            </div>
            <div className='btn-group' role='group'>
            </div>
            <div className='btn-group' role='group'>
            </div>
            <div className='btn-group' role='group'>
            </div>
            <div className='btn-group' role='group'>
            </div>
            <div className='btn-group' role='group'>
            <button className='buscarButton'  title={this.getText('MSG_204')} onClick={this.onClickBuscar} />
            </div>
            <div className='btn-group' role='group'>
              <button className='nuevoButton' title={this.getText('MSG_205')} onClick={this.onClickNuevo} />
            </div>
            <div className='btn-group' title={this.getText('MSG_3024')} role='group'>
              <button className='informeButton'/>
            </div>
            </div>
          </div>
        </div>
        {listaMedicamentosDiv}
      </div>
    );
  }
});
module.exports = Medicamento;
