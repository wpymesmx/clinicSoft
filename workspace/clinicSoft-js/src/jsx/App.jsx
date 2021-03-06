'use strict';

var React = require('react');
//mixins
var NavigatorMixin = require('./mixins/NavigatorMixin.js');
var AlertMixin = require('./mixins/AlertMixin.js');
//utils
var Constants = require('./utils/Constants.js');
//components
var Login = require('./Login.jsx');
var Home = require('./Home.jsx');
var AlertComponent = require('./components/AlertComponent.jsx');

var App = React.createClass({
  mixins: [NavigatorMixin(), AlertMixin()],
  getInitialState: function() {
    //console.log('# App->getInitialState #');
    return {
      componentKey: 'App',
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
  navigatorApp: function(viewName) {
    //console.log('# App->goTo-> ' + viewName);

    switch (viewName) {
      case Constants.LOGIN_VIEW:
        window.resetApp();
        this.setState({ mainComponent: (<Login/>) });
        break;
      case Constants.HOME_VIEW:
        this.setState({ mainComponent: (<Home/>) });
        break;
      default:
        console.log('App-> Vista no configurada ->' + viewName);
    }
  },
  alertFun: function(alertConfig) {
    //console.log('## alertFun ##');
    this.refs.alertComponent.alertFun(alertConfig);
  },
  render: function() {
    //console.log('# App->render #');
    var mainComponent = this.state.mainComponent == undefined ? (<Login />): this.state.mainComponent;

    return (
      <div className='app'>
        <AlertComponent ref='alertComponent'/>
        {mainComponent}
      </div>
    );
  }
});

module.exports = App;
