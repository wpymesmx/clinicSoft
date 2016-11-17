'use strict';

var React = require('react');
//mixins
var NavigatorMixin = require('../mixins/NavigatorMixin.js');
var AlertMixin = require('../mixins/AlertMixin.js');
//utils
var Constants = require('../utils/Constants.js');
//components

var Footer = React.createClass({
  mixins: [NavigatorMixin(), AlertMixin()],
  getInitialState: function() {
    //console.log('# App->getInitialState #');
    return {
      componentKey: Constants.FOOTER_VIEW,
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
  render: function() {
    //console.log('# App->render #');

    return (
      <div className='footerMain'>
        <p>aqui va el footer</p>
      </div>
    );
  }
});

module.exports = Footer;
