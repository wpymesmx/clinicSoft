'use strict';

var React = require('react');
//mixins
var LanguageMixin = require('../mixins/LanguageMixin.js');
var NavigatorMixin = require('../mixins/NavigatorMixin.js');
var AlertMixin = require('../mixins/AlertMixin.js');
//utils
var Constants = require('../utils/Constants.js');
var DataGridReact = require('./DataGridReact.jsx');
var InputFileReact = require('./InputFileReact.jsx');
var Highcharts = require('../utils/Highcharts.js');
var PanelReact = require('./PanelReact.jsx');

var TestComponents = React.createClass({
  mixins: [NavigatorMixin(), AlertMixin()],
    getDefaultProps: function() {
    //console.log('# MedicamentoAlta->getDefaultProps #');
    return {
    };
  },
  getInitialState: function() {
    //console.log('# App->getInitialState #');
    return {
      componentKey: Constants.TEST_COMPONENTS_VIEW,
      language: window.language,
      image64: ''
    };
  },
  componentWillMount: function() {
    //console.log('# App->componentWillMount #');
    this.subscribe(this.state.componentKey, this.navigatorApp);
    this.subscribeAlert(this.state.componentKey, this.alertFun);
  },
  componentDidMount: function() {
    //console.log('# App->componentDidMount #');
    Highcharts.gauge({});
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
  onFileSelected: function(fileName, fileBase64) {
    //console.log('fileName:' + fileName + ', fileBase64:' + fileBase64);
    this.setState({
      image64: fileBase64
    });
  },
  onClickShowPanel: function(evt) {
    debugger;
    this.refs.miPanel.show();
  },
  render: function() {
    //console.log('# App->render #');
    return (
      <div style={{width: '100%', height: '100%'}}>
        <InputFileReact ref='inputFile' extensions={['.png', '.gif', '.jpg']} onFileSelected={this.onFileSelected}/>
        <div>
          <img style={{width: '300px', height: '300px'}} src={this.state.image64} />
        </div>
        <div style={{width: '300px', height: '300px', backgroundImage: 'url(' + this.state.image64 + ')'}} >&nbsp;</div>
        <div id='container'>&nbsp;</div>
        <PanelReact ref='miPanel' title='Componente Panel de prueba'>
          <div style={{width: '100%', height: '100%'}}>
            <input type='text' value='sdadsa' />
            <input type='text' value='sdadsa' />
            <input type='text' value='sdadsa' />
            <input type='text' value='sdadsa' />
            <input type='text' value='sdadsa' />
            <input type='text' value='sdadsa' />
            <input type='text' value='sdadsa' />
            <input type='text' value='sdadsa' />
            <input type='text' value='sdadsa' />
            <input type='text' value='sdadsa' />
            <input type='text' value='sdadsa' />
            <input type='text' value='sdadsa' />
            <input type='text' value='sdadsa' />
            <input type='text' value='sdadsa' />
            <input type='text' value='sdadsa' />
            <input type='text' value='sdadsa' />
          </div>
        </PanelReact>
        <button onClick={this.onClickShowPanel}>show panel</button>
      </div>
    );
  }
});

module.exports = TestComponents;
