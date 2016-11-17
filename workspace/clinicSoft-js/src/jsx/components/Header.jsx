'use strict';

var React = require('react');
//mixins
var NavigatorMixin = require('../mixins/NavigatorMixin.js');
var AlertMixin = require('../mixins/AlertMixin.js');
//utils
var Constants = require('../utils/Constants.js');
//components

var Header = React.createClass({
  mixins: [NavigatorMixin(), AlertMixin()],
  getInitialState: function() {
    //console.log('# App->getInitialState #');
    return {
      componentKey: 'Header',
      mainComponent: undefined
    };
  },
  componentWillMount: function() {
    //console.log('# App->componentWillMount #');
    this.subscribe(this.state.componentKey, this.navigatorApp);
    this.subscribeAlert(this.state.componentKey, this.alertFun);
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
  render: function() {
    //console.log('# App->render #');

    return (
      <div className='headerMain'>
        <div className='clinicLogo left_align'>&nbsp;</div>
        <div className='headerCenter left_align'>&nbsp;</div>
        <div className='headerSalir left_align'>
          <button className='salirButton' onClick={this.onClickSalir}></button>
        </div>
        <div>
          <button className='homeButton' onClick={this.onClickIrWelcome}></button>
          <button onClick={this.onClickIrTestComponents}>COMPONENTE DE PRUEBAS</button>
        </div>
      </div>
    );
  }
});

module.exports = Header;
