'use strict';

var React = require('react');
//mixins
var NavigatorMixin = require('../mixins/NavigatorMixin.js');
var AlertMixin = require('../mixins/AlertMixin.js');
var LanguageMixin = require('../mixins/LanguageMixin.js');
//utils
var Constants = require('../utils/Constants.js');
//components

var Header = React.createClass({
  mixins: [NavigatorMixin(), AlertMixin(), LanguageMixin()],
  getInitialState: function() {
    //console.log('# App->getInitialState #');
    return {
      componentKey: Constants.HEADER_VIEW,
      language: window.language,
      mainComponent: undefined
    };
  },
  componentWillMount: function() {
    //console.log('# App->componentWillMount #');
    this.subscribe(this.state.componentKey, this.navigatorApp);
    this.subscribeAlert(this.state.componentKey, this.alertFun);
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
    this.unSubscribe(this.state.componentKey);
    this.unSubscribeAlert(this.state.componentKey);
    this.unSubscribeLanguage(this.state.componentKey);
  },
  onClickSalir: function(evt) {
    this.goToComponent(Constants.LOGIN_VIEW);
  },
  onClickIrWelcome: function(evt) {
    this.goToComponent(Constants.WELCOME_VIEW);
  },
  onClickIrTestComponents: function(evt) {
    this.goToComponent(Constants.TEST_COMPONENTS_VIEW);
  },
  onClickIrAdmin: function(evt) {
  console.log('Entra al metodo header');
    this.goToComponent(Constants.GUIA_VIEW);
  },
  render: function() {
    //console.log('# App->render #');
    return (
      <div className='headerMain'>
        <div className='clinicLogo left_align'>&nbsp;</div>
        <div className='headerCenter left_align'>&nbsp;</div>
        <div className='menuHeader left_align'>
          <div className='left_align' style={{width: '50%'}}>
            <button className='homeButton' onClick={this.onClickIrWelcome}></button>
            <button className='guiaButton' onClick={this.onClickIrAdmin}></button>
            <button onClick={this.onClickIrTestComponents}>COMPONENTE DE PRUEBAS</button>
          </div>
          <div className='left_align' style={{width: '50%'}}>
            <div className='right_align' style={{marginLeft: '10px'}}>
              <button className='salirButton right_align' onClick={this.onClickSalir}></button>
            </div>
            <div className='right_align'>
              <button type='button' className='mexico_flag'
                title={this.getText('MSG_514')} onClick={this.changeLanguage.bind(this, Constants.ES)} />
              <button type='button' className='united_states_flag'
                title={this.getText('MSG_515')} onClick={this.changeLanguage.bind(this, Constants.EN)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Header;
