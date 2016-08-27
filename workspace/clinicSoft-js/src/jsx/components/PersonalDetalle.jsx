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

var PersonalDetalle = React.createClass({
  mixins: [AlertMixin(), LanguageMixin()],
  getInitialState: function() {
    //console.log('# Personal->getInitialState #');
    return {
      componentKey: Constants.PERSONAL_NEW_EDIT_VIEW,
      language: window.language,
      zindex: 4,
      show: false, //bandera para mostrar u ocultar el componente
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
    this.subscribeLanguage(this.state.componentKey, this.changeSessionLanguage);
  },
  componentDidMount: function() {
    //console.log('# Personal->componentDidMount #');
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
    this.unSubscribeLanguage(this.state.componentKey);
  },
  show: function(personalDto) {
    this.setState({
      show: true,
      personalDto: personalDto,
    });
  },
  hide: function(evt) {
    this.setState({
      show: false,
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
  render: function() {
    //console.log('# Personal->render #');
    var self = this;
    var ACTIVO = 'A';
    var ACTIVO_STR = this.getText('MSG_202');
    var INACTIVO_STR = this.getText('MSG_203');

    return (this.state.show != true ? <div></div> : (
      <div className='componentShow'>
        <div className='fondoShow' style={{zIndex: this.state.zindex-1}}>&nbsp;</div>
        <div className='panel panel-default popUpClassPersonal' style={{zIndex: this.state.zindex}}>
          <div className='panel-heading'>{this.getText('MSG_1004')}</div>
          <div className='panel-body'>
            <div style={{width: '70%'}} className='panelForm'>
              {/*nombre*/}
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_500')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_500')} value={this.state.personalDto.pers_nombre}
                    readOnly={true} />
                </div>
              </div>
              {/*apellido paterno*/}
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_501')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_501')} value={this.state.personalDto.pers_apellido_pat}
                    readOnly={true}/>
                </div>
              </div>
              {/*apellido materno*/}
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_502')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_502')} value={this.state.personalDto.pers_apellido_mat}
                    readOnly={true}/>
                </div>
              </div>
              {/*correo electronico*/}
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_503')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_503')} value={this.state.personalDto.pers_correo}
                    readOnly={true}/>
                </div>
              </div>
              {/*cedula profecional*/}
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_505')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_505')} value={this.state.personalDto.pers_cedula}
                    readOnly={true}/>
                </div>
              </div>
              {/*telefono o celular*/}
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{this.getText('MSG_507')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_507')} value={this.state.personalDto.pers_celular}
                    readOnly={true}/>
                </div>
              </div>
              {/*fecha de nacimiento*/}
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_506')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_506')} value={this.state.personalDto.pers_fechan}
                    readOnly={true}/>
                </div>
              </div>
              {/*Horario*/}
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_508')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_508')} value={this.state.personalDto.pers_turno}
                    readOnly={true}/>
                </div>
              </div>
              {/*Sexo*/}
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_511')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_511')} value={this.state.personalDto.pers_sexo}
                    readOnly={true}/>
                </div>
              </div>
              {/*usuario y capacidades*/}
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_105')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_105')} value={this.state.personalDto.usu_id}
                    readOnly={true}/>
                </div>
              </div>
              {/*Estado*/}
              <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {this.getText('MSG_504')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_504')} value={this.state.personalDto.pers_estado}
                    readOnly={true}/>
                </div>
              </div>
            </div>
            <div className='groupTop btn-group' style={{width: '100%', paddingRight: '25%', paddingLeft: '25%'}}>
              <button type='button' className='btn btn-lg btn-primary btn-signin okButton' style={{width: '100%'}} title={this.getText('MSG_102')}
                onClick={this.hide} />
            </div>
          </div>
        </div>
      </div>
    ));
  }
});

module.exports = PersonalDetalle;
