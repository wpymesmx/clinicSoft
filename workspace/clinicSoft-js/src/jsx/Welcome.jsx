'use strict';

var React = require('react');
//mixins
var NavigatorMixin = require('./mixins/NavigatorMixin.js');
var LanguageMixin = require('./mixins/LanguageMixin.js');
//utils
var Constants = require('./utils/Constants.js');

var Welcome = React.createClass({
  mixins: [NavigatorMixin(),LanguageMixin()],
  getInitialState: function() {
    return {
      componentKey: Constants.WELCOME_VIEW,
      language: window.language,
    };
  },
  componentWillMount: function() {
    //console.log('# App->componentWillMount #');
    this.subscribeLanguage(this.state.componentKey, this.changeSessionLanguage);
  },
  componentDidMount: function() {
    //console.log('# App->componentDidMount #');
    //this.transitionTo('Login');
  },
  componentWillReceiveProps: function(nextProps) {
    //console.log('# App->componentWillReceiveProps #');
  },
  shouldComponentUpdate: function() {
    //console.log('# App->shouldComponentUpdate #');
    return true
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
  onClickIrMedicamento: function(evt) {
   this.goToComponent(Constants.MEDICAMENTO_VIEW);
  },
  onClickIrPersonal: function(evt) {
    this.goToComponent(Constants.PERSONAL_VIEW);
  },
  onClickIrPaciente: function(evt) {
    this.goToComponent(Constants.PACIENTE_VIEW);
  },

  render: function() {
    //console.log('# App->render #');
    return (
      <div className='welcome'>
        <div className='menuItem align-left'>
          <button className='menuItemGestionMedicamento' title={this.getText('MSG_3000')} onClick={this.onClickIrMedicamento}/>
        </div>
        <div className='menuItem align-left'>
          <button className='menuItemGestionMedicos' title={this.getText('MSG_1000')} onClick={this.onClickIrPersonal}/>
        </div>
        <div className='menuItem align-left'>
          <button className='menuItemGestionPacientes' title={this.getText('MSG_4000')} onClick={this.onClickIrPaciente}/>
        </div>
        <div className='menuItem align-left'>
          <button className='menuItemGestionCitas' title={this.getText('MSG_5000')}/>
        </div>
      </div>
    );
  }
});

module.exports = Welcome;
