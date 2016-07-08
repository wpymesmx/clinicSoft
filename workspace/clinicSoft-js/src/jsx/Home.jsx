'use strict';

var React = require('react');
//mixins
var NavigatorMixin = require('./mixins/NavigatorMixin.js');
//utils
var Constants = require('./utils/Constants.js');
//jsx components
var Welcome = require('./Welcome.jsx');
var Medicamento = require('./components/Medicamento.jsx');

var Home = React.createClass({
  mixins: [NavigatorMixin()],
  getInitialState: function() {
    //console.log('# Home->getInitialState #');
    return {
      componentKey: 'Home',
      mainComponent: undefined
    };
  },
  componentWillMount: function() {
    //console.log('# Home->componentWillMount #');
    this.subscribe(this.state.componentKey, this.navigatorApp);
  },
  componentDidMount: function() {
    //console.log('# Home->componentDidMount #');
  },
  componentWillReceiveProps: function(nextProps) {
    //console.log('# Home->componentWillReceiveProps #');
  },
  shouldComponentUpdate: function() {
    //console.log('# Home->shouldComponentUpdate #');
    return true
  },
  componentWillUpdate: function() {
    //console.log('# Home->componentWillUpdate #');
  },
  componentDidUpdate: function() {
    //console.log('# Home->componentDidUpdate #');
  },
  componentWillUnmount: function() {
    //console.log('# Home->componentWillUnmount #');
    this.unSubscribe(this.state.componentKey);
  },
  navigatorApp: function(viewName) {
    //console.log('# Home->goTo-> ' + viewName);

    switch (viewName) {
      case Constants.WELCOME_VIEW:
        this.setState({ mainComponent: (<Welcome/>) });
        break;

       case Constants.MEDICAMENTO_VIEW:
        this.setState({ mainComponent: (<Medicamento/>) });
        break;
      default:
        console.log('Home-> Vista no configurada' + viewName);
    }
  },
  onClickContadorMasMas: function(evt) {
    this.setState({
      contador: this.state.contador+1
    });
  },
  render: function() {
    //console.log('# Home->render #');
    var mainComponent = this.state.mainComponent == undefined ? (<Medicamento />) : this.state.mainComponent;

    return (
      <div className='home'>
        <div>header</div>
          <div>{mainComponent}</div>
        <div>footer</div>
      </div>
    );
  }
});

module.exports = Home;
