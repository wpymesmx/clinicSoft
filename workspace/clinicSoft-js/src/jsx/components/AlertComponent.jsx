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
      zindex: 99
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
      },
      mouseDown: false,
      mouseDownCornerBottomRight: false,
      top: 15,
      left: 20,
      bottom: 50,
      right: 20,
      mouseX: 0,
      mouseY: 0
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
      },
      mouseDown: false,
      mouseDownCornerBottomRight: false,
      top: 10,
      left: 26,
      bottom: 38,
      right: 23,
      mouseX: 0,
      mouseY: 0
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
  onMouseDown: function(evt) {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
    this.setState({
      mouseDown: true,
      mouseX: evt.pageX,
      mouseY: evt.pageY,
    });
  },
  onMouseUp: function(evt) {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
    this.setState({
      mouseDown: false,
      mouseDownCornerBottomRight: false
    });
  },
  onMouseMove: function(evt) {
    var top = this.state.top;
    var left = this.state.left;
    var bottom = this.state.bottom;
    var right = this.state.right;
    var smoothX = 0.14;
    var smoothY = 0.19;

    if(this.state.mouseDown) {
      if(evt.pageX > this.state.mouseX) {
        left = this.state.left + ((evt.pageX - this.state.mouseX)/100) + smoothX;
        right = this.state.right - ((evt.pageX - this.state.mouseX)/100) - smoothX;

      } else if(evt.pageX < this.state.mouseX) {
        left = this.state.left - ((this.state.mouseX - evt.pageX)/100) - smoothX;
        right = this.state.right + ((this.state.mouseX - evt.pageX)/100) + smoothX;
      }

      if(evt.pageY > this.state.mouseY) {
        top = this.state.top + ((evt.pageY - this.state.mouseY)/100) + smoothY;
        bottom = this.state.bottom - ((evt.pageY - this.state.mouseY)/100) - smoothY;

      } else if(evt.pageY < this.state.mouseY) {
        top = this.state.top - ((this.state.mouseY - evt.pageY)/100) - smoothY;
        bottom = this.state.bottom + ((this.state.mouseY - evt.pageY)/100) + smoothY;
      }

      this.setState({
        top: top,
        left: left,
        bottom: bottom,
        right: right,
        mouseX: evt.pageX,
        mouseY: evt.pageY
      });
    }
  },
  onMouseDownCornerBottomRight: function(evt) {
    this.setState({
      mouseDownCornerBottomRight: true,
      mouseX: evt.pageX,
      mouseY: evt.pageY,
    });
  },
  onResizeCornerBottomRight: function(evt) {
    var bottom = this.state.bottom;
    var right = this.state.right;
    var smoothX = 0.25;
    var smoothY = 0.17;

    if(this.state.mouseDownCornerBottomRight) {
      if(evt.pageX > this.state.mouseX) {
        right = this.state.right - ((evt.pageX - this.state.mouseX)/100) - smoothX;

      } else if(evt.pageX < this.state.mouseX) {
        right = this.state.right + ((this.state.mouseX - evt.pageX)/100) + smoothX;
      }

      if(evt.pageY > this.state.mouseY) {
        bottom = this.state.bottom - ((evt.pageY - this.state.mouseY)/100) - smoothY;

      } else if(evt.pageY < this.state.mouseY) {
        bottom = this.state.bottom + ((this.state.mouseY - evt.pageY)/100) + smoothY;
      }

      this.setState({
        bottom: bottom,
        right: right,
        mouseX: evt.pageX,
        mouseY: evt.pageY
      });
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
        <div ref='miAlert' className={'panel panel-primary popUpClass'}
          style={{zIndex: this.state.zindex-1, top: (this.state.top + '%'), left: (this.state.left + '%'),
                  bottom: (this.state.bottom + '%'), right: (this.state.right + '%')}}>
          <div className='panel-heading' onMouseDown={this.onMouseDown}>
            {this.state.alertConfig.title}
          </div>
          <div className='panel-body' style={{height: '73%', backgroundColor: '#FFFFFF'}}>
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
