'use strict';

var React = require('react');
//utils
var Constants = require('../utils/Constants.js');
//components

/**
* componente utilizado como wrap de paneles o ventanas
*/
var PanelReact = React.createClass({
  mixins: [],
  getDefaultProps: function() {
    //console.log('# Alert->getDefaultProps #');
    return {
      zindex: 2
    };
  },
  getInitialState: function() {
    //console.log('# Alert->getInitialState #');
    return {
      show: false,
      zindex: this.props.zindex,
      mouseDown: false,
      mouseDownCornerUp: false,
      mouseDownCornerBottom: false,
      mouseDownCornerLeft: false,
      mouseDownCornerRight: false,
      mouseDownCornerBottomRight: false,
      mouseDownCornerBottomLeft: false,
      mouseDownCornerUpLeft: false,
      mouseDownCornerUpRight: false,
      top: 15,
      left: 20,
      bottom: 50,
      right: 20,
      mouseX: 0,
      mouseY: 0,
      smoothX: 0.14,
      smoothY: 0.19,
      topBak: 0,
      leftBak: 0,
      bottomBak: 0,
      rightBak: 0,
      isResizeFull: false,
      title: this.props.title
    };
  },
  componentWillMount: function() {
    //console.log('# Alert->componentWillMount #');
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
  },
  show: function(alertConfig) {
    this.setState({
      show: true
    });
  },
  hide: function() {
    this.setState({
      show: false,
      top: 15,
      left: 20,
      bottom: 50,
      right: 20,
      topBak: 0,
      leftBak: 0,
      bottomBak: 0,
      rightBak: 0,
      isResizeFull: false
    });
  },
  onMouseDownPanelMove: function(evt) {
    window.addEventListener('mousemove', this.onMousePanelMove);
    window.addEventListener('mouseup', this.onMouseUp);
    this.setState({
      mouseDown: true,
      mouseX: evt.pageX,
      mouseY: evt.pageY,
    });
  },
  onMouseUp: function(evt) {
    window.removeEventListener('mousemove', this.onMousePanelMove);
    window.removeEventListener('mousemove', this.onResizeCornerBottomRight);
    window.removeEventListener('mousemove', this.onResizeCornerBottomLeft);
    window.removeEventListener('mousemove', this.onResizeCornerUpLeft);
    window.removeEventListener('mousemove', this.onResizeCornerUpRight);
    window.removeEventListener('mousemove', this.onResizeCornerUp);
    window.removeEventListener('mousemove', this.onResizeCornerBottom);
    window.removeEventListener('mousemove', this.onResizeCornerLeft);
    window.removeEventListener('mousemove', this.onResizeCornerRight);
    window.removeEventListener('mouseup', this.onMouseUp);
    this.setState({
      mouseDown: false,
      mouseDownCornerUp: false,
      mouseDownCornerBottom: false,
      mouseDownCornerLeft: false,
      mouseDownCornerRight: false,
      mouseDownCornerBottomRight: false,
      mouseDownCornerBottomLeft: false,
      mouseDownCornerUpLeft: false,
      mouseDownCornerUpRight: false,
    });
  },
  onMousePanelMove: function(evt) {
    var top = this.state.top;
    var left = this.state.left;
    var bottom = this.state.bottom;
    var right = this.state.right;

    if(this.state.mouseDown) {
      if(evt.pageX > this.state.mouseX) {
        left = this.state.left + ((evt.pageX - this.state.mouseX)/100) + this.state.smoothX;
        right = this.state.right - ((evt.pageX - this.state.mouseX)/100) - this.state.smoothX;

      } else if(evt.pageX < this.state.mouseX) {
        left = this.state.left - ((this.state.mouseX - evt.pageX)/100) - this.state.smoothX;
        right = this.state.right + ((this.state.mouseX - evt.pageX)/100) + this.state.smoothX;
      }

      if(evt.pageY > this.state.mouseY) {
        top = this.state.top + ((evt.pageY - this.state.mouseY)/100) + this.state.smoothY;
        bottom = this.state.bottom - ((evt.pageY - this.state.mouseY)/100) - this.state.smoothY;

      } else if(evt.pageY < this.state.mouseY) {
        top = this.state.top - ((this.state.mouseY - evt.pageY)/100) - this.state.smoothY;
        bottom = this.state.bottom + ((this.state.mouseY - evt.pageY)/100) + this.state.smoothY;
      }

      this.setState({
        top: top,
        left: left,
        bottom: bottom,
        right: right,
        mouseX: evt.pageX,
        mouseY: evt.pageY,
        topBak: 0,
        leftBak: 0,
        bottomBak: 0,
        rightBak: 0,
        isResizeFull: false
      });
    }
  },
  onMouseDownCornerBottomRight: function(evt) {
    window.addEventListener('mousemove', this.onResizeCornerBottomRight);
    window.addEventListener('mouseup', this.onMouseUp);
    this.setState({
      mouseDownCornerBottomRight: true,
      mouseX: evt.pageX,
      mouseY: evt.pageY,
    });
  },
  onResizeCornerBottomRight: function(evt) {
    var bottom = this.state.bottom;
    var right = this.state.right;

    if(this.state.mouseDownCornerBottomRight) {
      if(evt.pageX > this.state.mouseX) {
        right = this.state.right - ((evt.pageX - this.state.mouseX)/100) - this.state.smoothX;

      } else if(evt.pageX < this.state.mouseX) {
        right = this.state.right + ((this.state.mouseX - evt.pageX)/100) + this.state.smoothX;
      }

      if(evt.pageY > this.state.mouseY) {
        bottom = this.state.bottom - ((evt.pageY - this.state.mouseY)/100) - this.state.smoothY;

      } else if(evt.pageY < this.state.mouseY) {
        bottom = this.state.bottom + ((this.state.mouseY - evt.pageY)/100) + this.state.smoothY;
      }

      this.setState({
        bottom: bottom,
        right: right,
        mouseX: evt.pageX,
        mouseY: evt.pageY,
        topBak: 0,
        leftBak: 0,
        bottomBak: 0,
        rightBak: 0,
        isResizeFull: false
      });
    }
  },
  onMouseDownCornerBottomLeft: function(evt) {
    window.addEventListener('mousemove', this.onResizeCornerBottomLeft);
    window.addEventListener('mouseup', this.onMouseUp);
    this.setState({
      mouseDownCornerBottomLeft: true,
      mouseX: evt.pageX,
      mouseY: evt.pageY,
    });
  },
  onResizeCornerBottomLeft: function(evt) {
    var left = this.state.left;
    var bottom = this.state.bottom;

    if(this.state.mouseDownCornerBottomLeft) {
      if(evt.pageX > this.state.mouseX) {
        left = this.state.left + ((evt.pageX - this.state.mouseX)/100) + this.state.smoothX;

      } else if(evt.pageX < this.state.mouseX) {
        left = this.state.left - ((this.state.mouseX - evt.pageX)/100) - this.state.smoothX;
      }

      if(evt.pageY > this.state.mouseY) {
        bottom = this.state.bottom - ((evt.pageY - this.state.mouseY)/100) - this.state.smoothY;

      } else if(evt.pageY < this.state.mouseY) {
        bottom = this.state.bottom + ((this.state.mouseY - evt.pageY)/100) + this.state.smoothY;
      }

      this.setState({
        left: left,
        bottom: bottom,
        mouseX: evt.pageX,
        mouseY: evt.pageY,
        topBak: 0,
        leftBak: 0,
        bottomBak: 0,
        rightBak: 0,
        isResizeFull: false
      });
    }
  },
  onMouseDownCornerUpLeft: function(evt) {
    window.addEventListener('mousemove', this.onResizeCornerUpLeft);
    window.addEventListener('mouseup', this.onMouseUp);
    this.setState({
      mouseDownCornerUpLeft: true,
      mouseX: evt.pageX,
      mouseY: evt.pageY,
    });
  },
  onResizeCornerUpLeft: function(evt) {
    var top = this.state.top;
    var left = this.state.left;

    if(this.state.mouseDownCornerUpLeft) {
      if(evt.pageX > this.state.mouseX) {
        left = this.state.left + ((evt.pageX - this.state.mouseX)/100) + this.state.smoothX;

      } else if(evt.pageX < this.state.mouseX) {
        left = this.state.left - ((this.state.mouseX - evt.pageX)/100) - this.state.smoothX;
      }

      if(evt.pageY > this.state.mouseY) {
        top = this.state.top + ((evt.pageY - this.state.mouseY)/100) + this.state.smoothY;

      } else if(evt.pageY < this.state.mouseY) {
        top = this.state.top - ((this.state.mouseY - evt.pageY)/100) - this.state.smoothY;
      }

      this.setState({
        top: top,
        left: left,
        mouseX: evt.pageX,
        mouseY: evt.pageY,
        topBak: 0,
        leftBak: 0,
        bottomBak: 0,
        rightBak: 0,
        isResizeFull: false
      });
    }
  },
  onMouseDownCornerUpRight: function(evt) {
    window.addEventListener('mousemove', this.onResizeCornerUpRight);
    window.addEventListener('mouseup', this.onMouseUp);
    this.setState({
      mouseDownCornerUpRight: true,
      mouseX: evt.pageX,
      mouseY: evt.pageY,
    });
  },
  onResizeCornerUpRight: function(evt) {
    var top = this.state.top;
    var right = this.state.right;

    if(this.state.mouseDownCornerUpRight) {
      if(evt.pageX > this.state.mouseX) {
        right = this.state.right - ((evt.pageX - this.state.mouseX)/100) - this.state.smoothX;

      } else if(evt.pageX < this.state.mouseX) {
        right = this.state.right + ((this.state.mouseX - evt.pageX)/100) + this.state.smoothX;
      }

      if(evt.pageY > this.state.mouseY) {
        top = this.state.top + ((evt.pageY - this.state.mouseY)/100) + this.state.smoothY;

      } else if(evt.pageY < this.state.mouseY) {
        top = this.state.top - ((this.state.mouseY - evt.pageY)/100) - this.state.smoothY;
      }

      this.setState({
        top: top,
        right: right,
        mouseX: evt.pageX,
        mouseY: evt.pageY,
        topBak: 0,
        leftBak: 0,
        bottomBak: 0,
        rightBak: 0,
        isResizeFull: false
      });
    }
  },
  onMouseDownCornerUp: function(evt) {
    window.addEventListener('mousemove', this.onResizeCornerUp);
    window.addEventListener('mouseup', this.onMouseUp);
    this.setState({
      mouseDownCornerUp: true,
      mouseX: evt.pageX,
      mouseY: evt.pageY,
    });
  },
  onResizeCornerUp: function(evt) {
    var top = this.state.top;

    if(this.state.mouseDownCornerUp) {
      if(evt.pageY > this.state.mouseY) {
        top = this.state.top + ((evt.pageY - this.state.mouseY)/100) + this.state.smoothY;

      } else if(evt.pageY < this.state.mouseY) {
        top = this.state.top - ((this.state.mouseY - evt.pageY)/100) - this.state.smoothY;
      }

      this.setState({
        top: top,
        mouseX: evt.pageX,
        mouseY: evt.pageY,
        topBak: 0,
        leftBak: 0,
        bottomBak: 0,
        rightBak: 0,
        isResizeFull: false
      });
    }
  },
  onMouseDownCornerBottom: function(evt) {
    window.addEventListener('mousemove', this.onResizeCornerBottom);
    window.addEventListener('mouseup', this.onMouseUp);
    this.setState({
      mouseDownCornerBottom: true,
      mouseX: evt.pageX,
      mouseY: evt.pageY,
    });
  },
  onResizeCornerBottom: function(evt) {
    var bottom = this.state.bottom;

    if(this.state.mouseDownCornerBottom) {
      if(evt.pageY > this.state.mouseY) {
        bottom = this.state.bottom - ((evt.pageY - this.state.mouseY)/100) - this.state.smoothY;

      } else if(evt.pageY < this.state.mouseY) {
        bottom = this.state.bottom + ((this.state.mouseY - evt.pageY)/100) + this.state.smoothY;
      }

      this.setState({
        bottom: bottom,
        mouseX: evt.pageX,
        mouseY: evt.pageY,
        topBak: 0,
        leftBak: 0,
        bottomBak: 0,
        rightBak: 0,
        isResizeFull: false
      });
    }
  },
  onMouseDownCornerLeft: function(evt) {
    window.addEventListener('mousemove', this.onResizeCornerLeft);
    window.addEventListener('mouseup', this.onMouseUp);
    this.setState({
      mouseDownCornerLeft: true,
      mouseX: evt.pageX,
      mouseY: evt.pageY,
    });
  },
  onResizeCornerLeft: function(evt) {
    var left = this.state.left;

    if(this.state.mouseDownCornerLeft) {
      if(evt.pageX > this.state.mouseX) {
        left = this.state.left + ((evt.pageX - this.state.mouseX)/100) + this.state.smoothX;

      } else if(evt.pageX < this.state.mouseX) {
        left = this.state.left - ((this.state.mouseX - evt.pageX)/100) - this.state.smoothX;
      }

      this.setState({
        left: left,
        mouseX: evt.pageX,
        mouseY: evt.pageY,
        topBak: 0,
        leftBak: 0,
        bottomBak: 0,
        rightBak: 0,
        isResizeFull: false
      });
    }
  },
  onMouseDownCornerRight: function(evt) {
    window.addEventListener('mousemove', this.onResizeCornerRight);
    window.addEventListener('mouseup', this.onMouseUp);
    this.setState({
      mouseDownCornerRight: true,
      mouseX: evt.pageX,
      mouseY: evt.pageY,
    });
  },
  onResizeCornerRight: function(evt) {
    var right = this.state.right;

    if(this.state.mouseDownCornerRight) {
      if(evt.pageX > this.state.mouseX) {
        right = this.state.right - ((evt.pageX - this.state.mouseX)/100) - this.state.smoothX;

      } else if(evt.pageX < this.state.mouseX) {
        right = this.state.right + ((this.state.mouseX - evt.pageX)/100) + this.state.smoothX;
      }

      this.setState({
        right: right,
        mouseX: evt.pageX,
        mouseY: evt.pageY,
        topBak: 0,
        leftBak: 0,
        bottomBak: 0,
        rightBak: 0,
        isResizeFull: false
      });
    }
  },
  onClickClosePanel: function(evt) {
    this.setState({
      show: false
    });

    if(this.props.onClosePanel != unidefined) {
      this.props.onClosePanel(evt);
    }
  },
  onClickResizePanel: function(evt) {
    if(this.state.isResizeFull) {
      this.setState({
        top: this.state.topBak,
        left: this.state.leftBak,
        bottom: this.state.bottomBak,
        right: this.state.rightBak,
        topBak: 0,
        leftBak: 0,
        bottomBak: 0,
        rightBak: 0,
        isResizeFull: false
      });

    } else {
      this.setState({
        top: 0.2,
        left: 0.2,
        bottom: 1.5,
        right: 0.5,
        topBak: this.state.top,
        leftBak: this.state.left,
        bottomBak: this.state.bottom,
        rightBak: this.state.right,
        isResizeFull: true
      });
    }
  },
  render: function() {
    //console.log('# Alert->render #');
    var CLASS_HIDDEN = 'componentHide';
    var CLASS_SHOW = 'componentShow';
    var classNameAlert = '';
    var classNamePanelReactResize = '';

    if(this.state.show == true) {
      classNameAlert = CLASS_SHOW;

    } else {
      classNameAlert = CLASS_HIDDEN;
    }

    if(this.state.isResizeFull) {
      classNamePanelReactResize = 'panelReactResizeActual';

    } else {
      classNamePanelReactResize = 'panelReactResize';
    }

    return (
      <div className={classNameAlert}>
        <div className='fondoShow' style={{zIndex: this.state.zindex-1}}>&nbsp;</div>
        <div className='popUpClass'
          style={{zIndex: this.state.zindex, top: (this.state.top + '%'), left: (this.state.left + '%'),
                  bottom: (this.state.bottom + '%'), right: (this.state.right + '%')}}>

          <div className='' style={{width: '100%', height: '1%', float: 'left'}}>
            <div className='cornerUpLeft' style={{width: '4%', height: '100%', float: 'left'}} onMouseDown={this.onMouseDownCornerUpLeft}>&nbsp;</div>
            <div className='cornerUp' style={{width: '92%', height: '100%', float: 'left'}} onMouseDown={this.onMouseDownCornerUp}>&nbsp;</div>
            <div className='cornerUpRight' style={{width: '4%', height: '100%', float: 'left'}} onMouseDown={this.onMouseDownCornerUpRight}>&nbsp;</div>
          </div>

          <div className='' style={{width: '100%', height: '99%', float: 'left'}}>
            <div className='' style={{width: '0.5%', height: '100%', float: 'left'}}>
              <div className='cornerUpLeft' style={{width: '100%', height: '4%', float: 'left'}} onMouseDown={this.onMouseDownCornerUpLeft}>&nbsp;</div>
              <div className='cornerLeft' style={{width: '100%', height: '92%', float: 'left'}} onMouseDown={this.onMouseDownCornerLeft}>&nbsp;</div>
              <div className='cornerBottomLeft' style={{width: '100%', height: '4%', float: 'left'}} onMouseDown={this.onMouseDownCornerBottomLeft}>&nbsp;</div>
            </div>

            <div className='' style={{width: '99%', height: '100%', float: 'left', overflow: 'hidden'}}>
              <div className='panelReactHeader' style={{width: '100%', height: '24px', overflowX: 'hidden'}} onMouseDown={this.onMouseDownPanelMove}>
                <div className='' style={{width: '90%', height: '100%', float: 'left', overflow: 'hidden'}}>
                  {this.state.title}
                </div>
                <div className='' style={{width: '10%', height: '100%', float: 'left'}}>
                  <div className={classNamePanelReactResize} style={{width: '50%', height: '100%', float: 'left', padding: '0.1%', overflow: 'hidden'}}
                    onClick={this.onClickResizePanel}> &nbsp; </div>
                  <div className='panelReactClose' style={{width: '50%', height: '100%', float: 'left', padding: '0.1%', overflow: 'hidden'}}
                    onClick={this.onClickClosePanel}> &nbsp; </div>
                </div>
              </div>
              <div className='panelReactBody' style={{width: '100%', overflowY: 'auto', padding: '0.2%'}}>
                {this.props.children}
              </div>
            </div>

            <div className='' style={{width: '0.5%', height: '99%', float: 'left'}}>
              <div className='cornerUpRight' style={{width: '100%', height: '4%', float: 'left'}} onMouseDown={this.onMouseDownCornerUpRight}>&nbsp;</div>
              <div className='cornerRight' style={{width: '100%', height: '93%', float: 'left'}} onMouseDown={this.onMouseDownCornerRight}>&nbsp;</div>
              <div className='cornerBottomRight' style={{width: '100%', height: '4%', float: 'left'}} onMouseDown={this.onMouseDownCornerBottomRight}>&nbsp;</div>
            </div>
          </div>

          <div className='' style={{width: '100%', height: '1%', float: 'left'}}>
            <div className='cornerBottomLeft' style={{width: '4%', height: '100%', float: 'left'}} onMouseDown={this.onMouseDownCornerBottomLeft}>&nbsp;</div>
            <div className='cornerBottom' style={{width: '92%', height: '100%', float: 'left'}} onMouseDown={this.onMouseDownCornerBottom}>&nbsp;</div>
            <div className='cornerBottomRight' style={{width: '4%', height: '100%', float: 'left'}} onMouseDown={this.onMouseDownCornerBottomRight}>&nbsp;</div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PanelReact;
