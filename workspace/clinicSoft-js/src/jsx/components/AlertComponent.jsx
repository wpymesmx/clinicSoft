'use strict';

var React = require('react');
//mixins
var LanguageMixin = require('../mixins/LanguageMixin.js');
//utils
var Constants = require('../utils/Constants.js');
//components

/**
* componente utilizado para mostrar mensajes en forma de alert
*/
var AlertComponent = React.createClass({
  mixins: [LanguageMixin()],
  getDefaultProps: function() {
    //console.log('# Alert->getDefaultProps #');
    return {
      zindex: 2
    };
  },
  getInitialState: function() {
    //console.log('# Alert->getInitialState #');
    return {
      componentKey: 'Alert',
      language: window.language,
      show: false,
      zindex: this.props.zindex,
      alertConfig: {
        title: '',
        message: '',
        button_yes: false,
        button_no: false,
        onClickYes: undefined,
        onClickNo: undefined
      }
    };
  },
  componentWillMount: function() {
    //console.log('# Alert->componentWillMount #');
    this.subscribeLanguage(this.state.componentKey, this.changeSessionLanguage);
  },
  componentDidMount: function() {
    //console.log('# Alert->componentDidMount #');
  },
  componentWillReceiveProps: function(nextProps) {
    //console.log('# Alert->componentWillReceiveProps #');
  },
  shouldComponentUpdate: function() {
    //console.log('# Alert->shouldComponentUpdate #');
    return true;
  },
  componentWillUpdate: function() {
    //console.log('# Alert->componentWillUpdate #');
  },
  componentDidUpdate: function() {
    //console.log('# Alert->componentDidUpdate #');
  },
  componentWillUnmount: function() {
    //console.log('# Alert->componentWillUnmount #');
    this.unSubscribeLanguage(this.state.componentKey);
  },
  alertFun: function(alertConfig) {
    if(alertConfig.button_yes == undefined) {
      alertConfig.button_yes = false;
    }

    if(alertConfig.button_no == undefined) {
      alertConfig.button_no = false;
    }

    if(alertConfig.message == undefined) {
      alertConfig.message = '';
    }

    if(alertConfig.show == undefined) {
      alertConfig.show = false;
    }

    if(alertConfig.zindex == undefined) {
      alertConfig.zindex = this.state.zindex;
    }

    if(alertConfig.title == undefined) {
      alertConfig.title = '';
    }

    this.setState({
      show: alertConfig.show,
      zindex: alertConfig.zindex,
      alertConfig: {
        title: alertConfig.title,
        message: alertConfig.message,
        button_yes: alertConfig.button_yes,
        button_no: alertConfig.button_no,
        onClickYes: alertConfig.onClickYes,
        onClickNo: alertConfig.onClickNo
      }
    });
  },
  showAlert: function(alertConfig) {
    this.alertFun(alertConfig);
  },
  hideAlert: function() {
    this.setState({
      show: false,
      zindex: 2,
      alertConfig: {
        title: '',
        message: '',
        button_yes: false,
        button_no: false,
        onClickYes: undefined,
        onClickNo: undefined
      }
    });
  },
  onClickYes: function(evt){
    this.hideAlert();

    if(this.state.alertConfig.button_yes == true && this.state.alertConfig.onClickYes != undefined) {
      this.state.alertConfig.onClickYes();
    }
  },
  onClickNo: function(evt){
    this.hideAlert();

    if(this.state.alertConfig.button_no == true && this.state.alertConfig.onClickNo != undefined) {
      this.state.alertConfig.onClickNo();
    }
  },
  render: function() {
    //console.log('# Alert->render #');
    var CLASS_HIDDEN = 'componentHide';
    var CLASS_SHOW = 'componentShow';
    var classNameAlert = '';
    var divButtonYes = '';
    var divButtonNo = '';

    if(this.state.show == true) {
      classNameAlert = CLASS_SHOW;

    } else {
      classNameAlert = CLASS_HIDDEN;
    }

    if(this.state.alertConfig.button_yes == true) {
      divButtonYes = (<input type='button' value={this.getText('MSG_101')} className='btn btn-default' onClick={this.onClickYes} />);
    }

    if(this.state.alertConfig.button_no == true) {
      divButtonNo = (<input type='button' value={this.getText('MSG_102')} className='btn btn-default' onClick={this.onClickNo} />);
    }

    return (
      <div className={classNameAlert}>
        <div className='fondoShow' style={{zIndex: this.state.zindex-1}}>&nbsp;</div>
        <div className={'panel panel-primary popUpClass'} style={{zIndex: this.state.zindex-1}}>
          <div className='panel-heading'>
            {this.state.alertConfig.title}
          </div>
          <div className='panel-body'>
            <p>{this.state.alertConfig.message}</p>
          </div>
          <div className='panel-footer button-align-right'>
            <div className='input-group'>
              <span className='componentSpace'>
                {divButtonNo}
              </span>
              <span className='componentSpace'>
                {divButtonYes}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AlertComponent;
