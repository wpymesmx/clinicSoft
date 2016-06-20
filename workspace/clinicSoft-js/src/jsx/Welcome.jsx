'use strict';

var React = require('react');
//mixins
var NavigatorMixin = require('./mixins/NavigatorMixin.js');
//utils
var Constants = require('./utils/Constants.js');

var Welcome = React.createClass({
  mixins: [NavigatorMixin()],
  getInitialState: function() {
    return {
    };
  },
  componentWillMount: function() {
    //console.log('# App->componentWillMount #');
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
  },
  goToLogin: function(evt) {
   this.goToComponent(Constants.LOGIN_VIEW);
  },
  render: function() {
    //console.log('# App->render #');
    return (
    <div><input type='button' value='exit' onClick={this.goToLogin}/></div>
    );
  }
});

module.exports = Welcome;
