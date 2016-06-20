'use strict';

var React = require('react');
//mixins
var NavigatorMixin = require('./mixins/NavigatorMixin.js');
var ErrorControlMixin = require('./mixins/ErrorControlMixin.js');
//utils
var Constants = require('./utils/Constants.js');
//servicios
var loginService = require('./services/LoginService.js');

var Login = React.createClass({
  mixins: [NavigatorMixin(), ErrorControlMixin()],
  getInitialState: function() {
    return {
      usuario: '',
      passwd: ''
    };
  },
  componentWillMount: function() {
    //console.log('# App->componentWillMount #');
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
      self.goToComponent(Constants.HOME_VIEW);
    };

    var params = {
      'user': this.state.usuario,
      'passwd': this.state.passwd
    };

    loginService.login(params, onSuccess, this.onError, this.onFail);
  },
  render: function() {
    //console.log('# App->render #');
    return (
      <div className='container'>
        <div className='card card-container'>
          <div id='profile-img' className='profile-img-card'></div>
          <p id='profile-name' className='profile-name-card'></p>
          <form className='form-signin'>
            <span id='reauth-email' className='reauth-email'></span>
            <input type='text' id='inputEmail' className='form-control' placeholder='Usuario' value={this.state.usuario} onChange={this.onChangeUsuario} />
            <input type='password' id='inputPassword' className='form-control' placeholder='Password' value={this.state.passwd} onChange={this.onChangePasswd} />
            <div id='remember' className='checkbox'>
              <label>
                <input type='checkbox' value='remember-me' /> Remember me
              </label>
            </div>
            <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value='Sign in' onClick={this.onClickEntrar} />
          </form>
          <a href='#' className='forgot-password'>
            Forgot the password?
          </a>
        </div>
      </div>
    );
  }
});

module.exports = Login;
