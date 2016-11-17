'use strict';

var React = require('react');
//mixins
var AlertMixin = require('../mixins/AlertMixin.js');
var LanguageMixin = require('../mixins/LanguageMixin.js');
//utils
var Constants = require('../utils/Constants.js');
var validaService = require('../utils/ValidaService.js');
//servicios
var personalService = require('../services/PersonalService.js');
var userService = require('../services/UserService.js');
//components
var DatePickerReact = require('./DatePickerReact.jsx');

var PersonalNewEdit = React.createClass({
  mixins: [AlertMixin(), LanguageMixin()],
  getInitialState: function() {
    //console.log('# Personal->getInitialState #');
    return {
      componentKey: Constants.PERSONAL_NEW_EDIT_VIEW,
      language: window.language,
      zindex: 4,
      personalMode: 1,  //1-New 2-Edit, bandera para establecer el modo de funcionamiento del componente
      show: false, //bandera para mostrar u ocultar el componente
      morningSelected: true,
      eveningSelected: false,
      maleSelected: true,
      femaleSelected: false,
      activoSelected: true,
      inactivoSelected: false,
      userList: [],
      personalDto: {
        pers_id: 0,
        usu_id: 0,
        pers_nombre: '',
        pers_apellido_pat: '',
        pers_apellido_mat: '',
        pers_cedula: '',
        pers_fechan: '',
        pers_celular: '',
        pers_correo: '',
        pers_turno: 'M',
        pers_sexo: 'M',
        pers_estado: 'A',
      }
    };
  },
  componentWillMount: function() {
    //console.log('# Personal->componentWillMount #');
    this.subscribeAlert(this.state.componentKey, this.alertFun);
    this.subscribeLanguage(this.state.componentKey, this.changeSessionLanguage);
  },
  componentDidMount: function() {
    //console.log('# Personal->componentDidMount #');
    var self = this;

    var onSuccess = function(response) {
      self.setState({
        userList: response.payload
      });
    };

    var params = {};
    userService.getAllUsers(params, onSuccess, this.onError, this.onFail);
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
  show: function(personalMode, personalDto) {
    var personalDtoTmp = this.state.personalDto;
    var morningSelected = true;
    var eveningSelected = false;
    var maleSelected = true;
    var femaleSelected = false;
    var activoSelected = true;
    var inactivoSelected = false;

    if(personalDto != undefined) {
      personalDtoTmp = personalDto;

      if(personalDtoTmp.pers_turno == 'M') {
        morningSelected = true;
        eveningSelected = false;

      } else {
        morningSelected = false;
        eveningSelected = true;
      }

      if(personalDtoTmp.pers_sexo == 'M') {
        maleSelected = true;
        femaleSelected = false;

      } else {
        maleSelected = false;
        femaleSelected = true;
      }

      if(personalDtoTmp.pers_estado == 'A') {
        activoSelected = true;
        inactivoSelected = false;

      } else {
        activoSelected = false;
        inactivoSelected = true;
      }

      //this.refs.fechan.setDatePicked(personalDtoTmp.pers_fechan);
    }

    this.setState({
      show: true,
      personalMode: personalMode,
      personalDto: personalDtoTmp,
      morningSelected: morningSelected,
      eveningSelected: eveningSelected,
      maleSelected: maleSelected,
      femaleSelected: femaleSelected,
      activoSelected: activoSelected,
      inactivoSelected: inactivoSelected
    });
  },
  hide: function(evt) {
    this.refs.fechan.hideDatePicker();
    this.setState({
      show: false,
      personalMode: 1,
      morningSelected: true,
      eveningSelected: false,
      maleSelected: true,
      femaleSelected: false,
      activoSelected: true,
      inactivoSelected: false,
      personalDto: {
        pers_id: 0,
        usu_id: 0,
        pers_nombre: '',
        pers_apellido_pat: '',
        pers_apellido_mat: '',
        pers_cedula: '',
        pers_fechan: '',
        pers_celular: '',
        pers_correo: '',
        pers_turno: 'M',
        pers_sexo: 'M',
        pers_estado: 'A',
      }
    });
  },
  onChangeNombre: function(evt) {
    var personalDto = this.state.personalDto;

    personalDto.pers_nombre = evt.target.value;
    this.setState({
      personalDto: personalDto
    });
  },
  onChangeApellidoPat: function(evt) {
    var personalDto = this.state.personalDto;

    personalDto.pers_apellido_pat = evt.target.value;
    this.setState({
      personalDto: personalDto
    });
  },
  onChangeApellidoMat: function(evt) {
    var personalDto = this.state.personalDto;

    personalDto.pers_apellido_mat = evt.target.value;
    this.setState({
      personalDto: personalDto
    });
  },
  onChangeCorreo: function(evt) {
    var personalDto = this.state.personalDto;

    personalDto.pers_correo = evt.target.value;
    this.setState({
      personalDto: personalDto
    });
  },
  onChangeCedula: function(evt) {
    var personalDto = this.state.personalDto;

    personalDto.pers_cedula = evt.target.value;
    this.setState({
      personalDto: personalDto
    });
  },
  onChangeCelular: function(evt) {
    var personalDto = this.state.personalDto;

    if(validaService.isEmpty(evt.target.value) || validaService.isOnlyNumbers(evt.target.value)) {
      personalDto.pers_celular = evt.target.value;
      this.setState({
        personalDto: personalDto
      });
    }
  },
  onClickMorning: function(evt) {
    var personalDto = this.state.personalDto;

    personalDto.pers_turno = 'M';
    this.setState({
      morningSelected: true,
      eveningSelected: false,
      personalDto: personalDto
    });
  },
  onClickEvening: function(evt) {
    var personalDto = this.state.personalDto;

    personalDto.pers_turno = 'V';
    this.setState({
      morningSelected: false,
      eveningSelected: true,
      personalDto: personalDto
    });
  },
  onClickMale: function(evt) {
    var personalDto = this.state.personalDto;

    personalDto.pers_sexo = 'M';
    this.setState({
      maleSelected: true,
      femaleSelected: false,
      personalDto: personalDto
    });
  },
  onClickFemale: function(evt) {
    var personalDto = this.state.personalDto;

    personalDto.pers_sexo = 'F';
    this.setState({
      maleSelected: false,
      femaleSelected: true,
      personalDto: personalDto
    });
  },
  onClickActivo: function(evt) {
    var personalDto = this.state.personalDto;

    personalDto.pers_estado = 'A';
    this.setState({
      activoSelected: true,
      inactivoSelected: false,
      personalDto: personalDto
    });
  },
  onClickInactivo: function(evt) {
    var personalDto = this.state.personalDto;

    personalDto.pers_estado = 'I';
    this.setState({
      activoSelected: false,
      inactivoSelected: true,
      personalDto: personalDto
    });
  },
  validaFormulario: function() {
    var result = {isError: false, message: ''};

    if(validaService.isEmpty(this.state.personalDto.pers_nombre)) {
      return {isError: true, message: this.getText('MSG_2001')};
    }

    if(validaService.isEmpty(this.state.personalDto.pers_apellido_pat)) {
      return {isError: true, message: this.getText('MSG_2002')};
    }

    if(validaService.isEmpty(this.state.personalDto.pers_apellido_mat)) {
      return {isError: true, message: this.getText('MSG_2003')};
    }

    if(validaService.isEmpty(this.state.personalDto.pers_correo) || !validaService.isEmail(this.state.personalDto.pers_correo)) {
      return {isError: true, message: this.getText('MSG_2005')};
    }

    if(validaService.isEmpty(this.state.personalDto.pers_celular)) {
      return {isError: true, message: this.getText('MSG_2004')};
    }

    if(this.state.personalDto.usu_id == 0) {
      return {isError: true, message: this.getText('MSG_2006')};
    }

    return result;
  },
  onChangeUserIdSelected: function(evt) {
    var personalDto = this.state.personalDto;

    personalDto.usu_id = evt.target.value;
    this.setState({
      personalDto: personalDto
    });
  },
  onFechanPicked: function(datePicked, evt) {
    console.log('onFechanPicked->' + datePicked);
    var personalDto = this.state.personalDto;

    personalDto.pers_fechan = (datePicked.getFullYear() + '-' + (datePicked.getMonth()+1) + '-' + datePicked.getDate());
    this.setState({
      personalDto: personalDto
    });
  },
  onClickGuardar: function(evt) {
    var self = this;
    var result = undefined;

    var onSuccess = function(response) {
      console.log('# onSuccess #');
      self.showInfo(self.getText('MSG_1003'));
      self.hide();
      self.props.super.getAllPersonal();
    };

    result = this.validaFormulario();

    if(!result.isError) {
      var params = {
        pers_id: this.state.personalDto.pers_id,
        usu_id: this.state.personalDto.usu_id,
        pers_nombre: this.state.personalDto.pers_nombre,
        pers_apellido_pat: this.state.personalDto.pers_apellido_pat,
        pers_apellido_mat: this.state.personalDto.pers_apellido_mat,
        pers_cedula: this.state.personalDto.pers_cedula,
        pers_fechan: this.refs.fechan.getDatePickedFormat(),
        pers_celular: this.state.personalDto.pers_celular,
        pers_correo: this.state.personalDto.pers_correo,
        pers_turno: this.state.personalDto.pers_turno,
        pers_sexo: this.state.personalDto.pers_sexo,
        pers_estado: this.state.personalDto.pers_estado
      };

      if(this.state.personalMode == Constants.COMPONENT_MODE_NEW) {
        personalService.insertPersonal(params, onSuccess, this.onError, this.onFail);

      } else {
        personalService.updatePersonal(params, onSuccess, this.onError, this.onFail);
      }

    } else {
      this.showError(result.message);
    }
  },
  render: function() {
    //console.log('# Personal->render #');
    var self = this;
    var rowsPersonalList = [];
    var usersListOptions = [];
    var ACTIVO = 'A';
    var ACTIVO_STR = this.getText('MSG_202');
    var INACTIVO_STR = this.getText('MSG_203');
    var componentTitle = (this.state.personalMode == Constants.COMPONENT_MODE_NEW ? this.getText('MSG_1001') : this.getText('MSG_1002'))

    if(this.state.userList != undefined && this.state.userList.length > 0) {
      usersListOptions = this.state.userList.map(function(user, index) {
        return (<option key={('user_option_' + index)} value={user.usu_id}>{user.usu_login}</option>);
      });
    }

    return (this.state.show != true ? (<div></div>) : (
      <div className='componentShow'>
        <div className='fondoShow' style={{zIndex: this.state.zindex-1}}>&nbsp;</div>
        <div className='panel panel-default popUpClassPersonal' style={{zIndex: this.state.zindex}}>
          <div className='panel-heading'>{componentTitle}</div>
          <div className='panel-body'>
            <div style={{width: '70%'}} className='panelForm'>
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_500')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_500')} value={this.state.personalDto.pers_nombre}
                    onChange={this.onChangeNombre}/>
                </div>
              </div>
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_501')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_501')} value={this.state.personalDto.pers_apellido_pat}
                    onChange={this.onChangeApellidoPat}/>
                </div>
              </div>
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_502')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_502')} value={this.state.personalDto.pers_apellido_mat}
                    onChange={this.onChangeApellidoMat}/>
                </div>
              </div>
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_503')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_503')} value={this.state.personalDto.pers_correo}
                    onChange={this.onChangeCorreo}/>
                </div>
              </div>
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_505')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_505')} value={this.state.personalDto.pers_cedula}
                    onChange={this.onChangeCedula}/>
                </div>
              </div>
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_507')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_507')} value={this.state.personalDto.pers_celular}
                    onChange={this.onChangeCelular}/>
                </div>
              </div>
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_506')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <DatePickerReact ref='fechan' datePicked={this.state.personalDto.pers_fechan} onDatePicked={this.onFechanPicked}/>
                </div>
              </div>
              {/*Horario*/}
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_508')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <div style={{width: '50%'}} className='left_align'>
                    <span style={{marginRight: '10%'}}>
                      <input type='radio' value='M' checked={this.state.morningSelected} onChange={this.onClickMorning}/>
                    </span>
                    <span>
                      {this.getText('MSG_509')}
                    </span>
                  </div>
                  <div style={{width: '50%'}} className='left_align'>
                    <span style={{marginRight: '10%'}}>
                      <input type='radio' value='V' checked={this.state.eveningSelected}  onChange={this.onClickEvening}/>
                    </span>
                    <span>
                      {this.getText('MSG_510')}
                    </span>
                  </div>
                </div>
              </div>
              {/*Sexo*/}
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_511')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <div style={{width: '50%'}} className='left_align'>
                    <span style={{marginRight: '10%'}}>
                      <input type='radio' value='M' checked={this.state.maleSelected} onChange={this.onClickMale}/>
                    </span>
                    <span>
                      {this.getText('MSG_512')}
                    </span>
                  </div>
                  <div style={{width: '50%'}} className='left_align'>
                    <span style={{marginRight: '10%'}}>
                      <input type='radio' value='V' checked={this.state.femaleSelected}  onChange={this.onClickFemale}/>
                    </span>
                    <span>
                      {this.getText('MSG_513')}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_105')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <select value={this.state.personalDto.usu_id} onChange={this.onChangeUserIdSelected}>
                    <option value='0'>{this.getText('MSG_207')}</option>
                    {usersListOptions}
                  </select>
                </div>
              </div>
              {/*Estado*/}
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_504')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <div style={{width: '50%'}} className='left_align'>
                    <span style={{marginRight: '10%'}}>
                      <input type='radio' value='A' checked={this.state.activoSelected} onChange={this.onClickActivo}/>
                    </span>
                    <span>
                      {this.getText('MSG_202')}
                    </span>
                  </div>
                  <div style={{width: '50%'}} className='left_align'>
                    <span style={{marginRight: '10%'}}>
                      <input type='radio' value='I' checked={this.state.inactivoSelected}  onChange={this.onClickInactivo}/>
                    </span>
                    <span>
                      {this.getText('MSG_203')}
                    </span>
                  </div>
                </div>
              </div>

            </div>
            <div className='groupTop btn-group' style={{width: '100%'}}>
              <button type='button' className='btn btn-lg btn-primary btn-signin closeButton' style={{width: '50%'}} title={this.getText('MSG_102')} onClick={this.hide} />
              <button type='button' className='btn btn-lg btn-primary btn-signin saveButton' style={{width: '50%'}} title={this.getText('MSG_206')} onClick={this.onClickGuardar} />
            </div>
          </div>
        </div>
      </div>
    ));
  }
});

module.exports = PersonalNewEdit;
