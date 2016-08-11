'use strict';

var React = require('react');
//mixins
var NavigatorMixin = require('../mixins/NavigatorMixin.js');
var AlertMixin = require('../mixins/AlertMixin.js');
//utils
var Constants = require('../utils/Constants.js');
//components
var DatePickerReact = require('./DatePickerReact.jsx');

var TestComponents = React.createClass({
  mixins: [NavigatorMixin(), AlertMixin()],
  getInitialState: function() {
    //console.log('# App->getInitialState #');
    return {
      componentKey: 'Test',
      mainComponent: undefined,
      datePicked: ''
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
  onDatePicked: function(datePicked, evt) {
    console.log('datePicked->' + datePicked);

    this.setState({
      datePicked: (datePicked.getDate() + '/' + (datePicked.getMonth()+1) + '/' + datePicked.getFullYear())
    });
  },
  render: function() {
    //console.log('# App->render #');

    return (
      <div style={{width: '100%', height: '100%'}}>
        <DatePickerReact inputLabel='Fecha de cosulta:' onDatePicked={this.onDatePicked}/>
        <div>
          Fecha seleccionada: {this.state.datePicked}
        </div>
      </div>
    );
  }
});

module.exports = TestComponents;
