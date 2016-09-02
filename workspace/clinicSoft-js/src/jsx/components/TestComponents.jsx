'use strict';

var React = require('react');
//mixins
var LanguageMixin = require('../mixins/LanguageMixin.js');
var NavigatorMixin = require('../mixins/NavigatorMixin.js');
var AlertMixin = require('../mixins/AlertMixin.js');
//utils
var Constants = require('../utils/Constants.js');
var DataGridReact = require('./DataGridReact.jsx');

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
      dataList: []
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
  addDataList: function(evt) {
    var index = this.state.dataList.length+1;
    var data = {
      col1: ('col'+index),
      col2: ('col'+index),
      col3: ('col'+index),
      col4: ('col'+index),
      col5: ('col'+index)
    };
    var dataList = this.state.dataList;

    dataList.push(data);
    this.setState({
      dataList: dataList
    });
  },
  onClickButton: function(dataObj, index, evt) {
    console.log('index->' + index);
    console.log('data->' + JSON.stringify(dataObj));
  },
  render: function() {
    //console.log('# App->render #');
    return (
      <div style={{width: '100%', height: '100%'}}>
        <button onClick={this.addDataList}>add data list</button>
        <DataGridReact dataList={this.state.dataList}
          headerOptions={[
            {label:'Columna1', width: '20%', headerStyle:''},
            {label:'Columna2', width: '20%', headerStyle:''},
            {label:'Columna3', width: '20%', headerStyle:''},
            {label:'Columna4', width: '20%', headerStyle:''},
            {label:'Columna5', width: '20%', headerStyle:''}
          ]}
          colOptions={[
            {property: 'col1', width: '20%', type: 1},
            {property: 'col2', width: '20%', type: 1},
            {property: 'col3', width: '20%', type: 1},
            {property: 'col4', width: '20%', type: 1},
            {property: 'col5', width: '20%',
              type: 2, buttonStyle: 'detalleButton', onClickButton: this.onClickButton, labelButton: 'Ver detalle'}
          ]}/>
      </div>
    );
  }
});

module.exports = TestComponents;
