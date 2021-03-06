'use strict';

var React = require('react');
//mixins
var AlertMixin = require('../mixins/AlertMixin.js');
var LanguageMixin = require('../mixins/LanguageMixin.js');
//utils
var Constants = require('../utils/Constants.js');
var clone = require('../utils/Clone.js');
var validaService = require('../utils/ValidaService.js');
//servicios
var personalService = require('../services/PersonalService.js');
//components
var PersonalNewEdit = require('./PersonalNewEdit.jsx');
var PersonalDetalle = require('./PersonalDetalle.jsx');
var DataGridReact = require('./DataGridReact.jsx');

var Personal = React.createClass({
  mixins: [AlertMixin(), LanguageMixin()],
  getInitialState: function() {
    //console.log('# Personal->getInitialState #');
    return {
      componentKey: Constants.PERSONAL_VIEW,
      language: window.language,
      usu_id: 0,
      pers_nombre: '',
      pers_apellido_pat: '',
      pers_apellido_mat: '',
      pers_cedula: '',
      pers_fechan: '',
      pers_celular: '',
      pers_correo: '',
      pers_turno: '',
      pers_sexo: '',
      pers_estado: '',
      personalList: [],
      filterStatus: ''
    };
  },
  componentWillMount: function() {
    //console.log('# Personal->componentWillMount #');
    this.subscribeAlert(this.state.componentKey, this.alertFun);
    this.subscribeLanguage(this.state.componentKey, this.changeSessionLanguage);
  },
  componentDidMount: function() {
    //console.log('# Personal->componentDidMount #');
    this.getAllPersonal();
  },
  componentWillReceiveProps: function(nextProps) {
    //console.log('# Personal->componentWillReceiveProps #');
  },
  shouldComponentUpdate: function() {
    //console.log('# Personal->shouldComponentUpdate #');
    return true;
  },
  componentWillUpdate: function() {
    //console.log('# Personal->componentWillUpdate #');
  },
  componentDidUpdate: function() {
    //console.log('# Personal->componentDidUpdate #');
  },
  componentWillUnmount: function() {
    //console.log('# Personal->componentWillUnmount #');
    this.unSubscribeAlert(this.state.componentKey);
    this.unSubscribeLanguage(this.state.componentKey);
  },
  onClickBuscar: function(evt) {
    var self = this;

    var onSuccess = function(response) {
      self.setState({
        personalList: response.payload
      });
      self.refs.personalGrid.updateDateList(response.payload);
    };

    var params = {
      usu_id: this.state.usu_id,
      pers_nombre: this.state.pers_nombre,
      pers_apellido_pat: this.state.pers_apellido_pat,
      pers_apellido_mat: this.state.pers_apellido_mat,
      pers_cedula: this.state.pers_cedula,
      pers_fechan: this.state.pers_fechan,
      pers_celular: this.state.pers_celular,
      pers_correo: this.state.pers_correo,
      pers_turno: this.state.pers_turno,
      pers_sexo: this.state.pers_sexo,
      pers_estado: this.state.pers_estado
    };

    personalService.getPersonalByFilter(params, onSuccess, this.onError, this.onFail);
  },
  getAllPersonal: function() {
    var self = this;

    var onSuccess = function(response) {
      self.setState({
        personalList: response.payload
      });
      self.refs.personalGrid.updateDateList(response.payload);
    };

    var params = {};
    personalService.getAllPersonal(params, onSuccess, this.onError, this.onFail);
  },
  onChangeNombre: function(evt) {
    this.setState({
      pers_nombre: evt.target.value
    });
  },
  onChangeApellidoPat: function(evt) {
    this.setState({
      pers_apellido_pat: evt.target.value
    });
  },
  onChangeApellidoMat: function(evt) {
    this.setState({
      pers_apellido_mat: evt.target.value
    });
  },
  onClickAddPersonal: function(evt) {
    this.refs.personalNewEdit.show(Constants.COMPONENT_MODE_NEW);
  },
  onClickDetalle: function(personal, index, evt) {
    this.refs.personalDetalle.show(personal);
  },
  onClickEditar: function(personal, index, evt) {
    this.refs.personalNewEdit.show(Constants.COMPONENT_MODE_EDIT, clone.clone(personal));
  },
  render: function() {
    //console.log('# Personal->render #');
    var self = this;

    return (
      <div>
        <PersonalNewEdit ref='personalNewEdit' super={self}/>
        <PersonalDetalle ref='personalDetalle' super={self}/>
        <div className='panel panel-default'>
          <div className='panel-heading'>{this.getText('MSG_1000')}</div>
          <div className='panel-body'>
            <div style={{width: '100%'}} className='panelForm'>
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '25%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_500')} value={this.state.pers_nombre}
                    onChange={this.onChangeNombre}/>
                </div>
                <div style={{width: '25%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_501')} value={this.state.pers_apellido_pat}
                    onChange={this.onChangeApellidoPat}/>
                </div>
                <div style={{width: '25%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_502')} value={this.state.pers_apellido_mat}
                    onChange={this.onChangeApellidoMat}/>
                </div>
                <div className='group-btn'>
                  <button className='btn btn-default buscarButton' type='button' title={this.getText('MSG_204')} value=''
                    onClick={this.onClickBuscar} />
                </div>
              </div>
            </div>
            <div>
              <div className='btn-group left_align' style={{width: '100%'}}>
                <button type='button' className='btn btn-default nuevoButton' title={this.getText('MSG_205')} style={{float: 'right'}}
                  onClick={this.onClickAddPersonal}/>
              </div>
              <div className='overflowXauto left_align' style={{width: '100%'}}>
                <DataGridReact ref='personalGrid' dataList={this.state.personalList}
                  headerOptions={[
                    {property: 'pers_nombre', label: 'MSG_500', placeholder: 'MSG_500', width: '18%', isOrderBy: true, isFilterText: true},
                    {property: 'pers_apellido_pat', label: 'MSG_501', placeholder: 'MSG_501', width: '18%', isOrderBy: true, isFilterText: true},
                    {property: 'pers_apellido_mat', label: 'MSG_502', placeholder: 'MSG_502', width: '18%', isOrderBy: true, isFilterText: true},
                    {property: 'pers_correo', label: 'MSG_503', placeholder: 'MSG_503', width: '18%', isOrderBy: true, isFilterText: true},
                    {property: 'pers_estado', label: 'MSG_504', placeholder: 'MSG_504', width: '14%', isOrderBy: true},
                    {property: '', label: '', width: '7%'},
                    {property: '', label: '', width: '7%'}
                  ]}
                  colOptions={[
                    {property: 'pers_nombre', width: '18%'},
                    {property: 'pers_apellido_pat', width: '18%'},
                    {property: 'pers_apellido_mat', width: '18%'},
                    {property: 'pers_correo', width: '18%'},
                    {property: 'pers_estado', width: '14%', textAlign: 'center', catalog:[{id: 'A', value: 'MSG_202'}, {id: 'I', value: 'MSG_203'}]},
                    {property: '', width: '7%', type: 2, style: 'detailButton', onClickButton: this.onClickDetalle, labelButton: 'MSG_201'},
                    {property: '', width: '7%', type: 2, style: 'editarButton', onClickButton: this.onClickEditar, labelButton: 'MSG_200'}
                  ]}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Personal;
