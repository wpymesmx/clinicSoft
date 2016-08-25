'use strict';

var React = require('react');
//mixins
var NavigatorMixin = require('./mixins/NavigatorMixin.js');
var AlertMixin = require('./mixins/AlertMixin.js');
var LanguageMixin = require('./mixins/LanguageMixin.js');
//utils
var Constants = require('./utils/Constants.js');
var validaService = require('./utils/ValidaService.js');
//servicios
var loginService = require('./services/LoginService.js');

var Login = React.createClass({
  mixins: [NavigatorMixin(), AlertMixin(), LanguageMixin()],
  getInitialState: function() {
    return {
      componentKey: 'Login',
      language: window.language,
      usuario: '',
      passwd: ''
    };
  },
  componentWillMount: function() {
    //console.log('# App->componentWillMount #');
    this.subscribeLanguage(this.state.componentKey, this.changeSessionLanguage);
  },
  componentDidMount: function() {
    //console.log('# App->componentDidMount #');
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
  onChangeUsuario: function(evt) {
    //console.log('usuario -> ' + this.state.usuario);
    this.setState({
      usuario: evt.target.value
    });
  },
  onChangePasswd: function(evt) {
    //console.log('passwd -> ' + this.state.passwd);
    this.setState({
      passwd: evt.target.value
    });
  },
  onClickEntrar: function(evt) {
    //console.log('usuario -> ' + this.state.usuario);
    //console.log('passwd -> ' + this.state.passwd);
    var self = this;

    var onSuccess = function(response) {
      console.log('# success  #');
      window.ctx.get(Constants.USER).setJws(response.payload);
      self.goToComponent(Constants.HOME_VIEW);
    };

    var response = this.validaFormulario();

    if(!response.isError) {
      var params = {
        'user': this.state.usuario,
        'passwd': this.state.passwd
      };

      loginService.login(params, onSuccess, this.onError, this.onFail);

    } else {
      this.showError(response.message);
    }
  },
  validaFormulario: function() {
    var response = {isError: false, message: ''};

    if(validaService.isEmpty(this.state.usuario) || validaService.isEmpty(this.state.passwd)) {
      return {isError: true, message: this.getText('MSG_108')};
    }

    return response;
  },
  cambiarLenguaje: function(evt) {
    if(this.state.language == Constants.ES) {
      this.changeLanguage(Constants.EN);

    } else {
      this.changeLanguage(Constants.ES);
    }
  },
  forgetPassword: function(evt) {
    evt.preventDefault();

  },
  render: function() {
    //console.log('# App->render #');
    return (
      <div className='container'>
        <div className='card card-container'>
          <div className='profile-img-card'></div>
          <p className='profile-name-card'></p>
          <form className='form-signin'>
            <span className='reauth-email'></span>
            <input type='text' className='form-control' placeholder={this.getText('MSG_105')} value={this.state.usuario} onChange={this.onChangeUsuario} />
            <input type='password' className='form-control' placeholder={this.getText('MSG_106')} value={this.state.passwd} onChange={this.onChangePasswd} />
            <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_107')} onClick={this.onClickEntrar} />
          </form>
          <a href='#' className='forgot-password' onClick={this.forgetPassword}>
            {this.getText('MSG_104')}
          </a>
        </div>
      </div>
    );
  }
});

module.exports = Login;
