'use strict';

var React = require('react');
//mixins
var LanguageMixin = require('../mixins/LanguageMixin.js');
//utils
var Constants = require('../utils/Constants.js');
//components
/**
* componente utilizado para la gestion de alta de medicamentos
*/
var MedicamentoAlta = React.createClass({
  mixins: [LanguageMixin()],
  getDefaultProps: function() {
    //console.log('# MedicamentoAlta->getDefaultProps #');
    return {
      zindex: 2
    };
  },
  getInitialState: function() {
    //console.log('# MedicamentoAlta->getInitialState #');
    return {
      componentKey: 'MedicamentoAlta',
      language: window.language,
      show: false,
      zindex: this.props.zindex
    };
  },
  componentWillMount: function() {
    //console.log('# MedicamentoAlta->componentWillMount #');
    this.subscribeLanguage(this.state.componentKey, this.changeSessionLanguage);
  },
  componentDidMount: function() {
    //console.log('# MedicamentoAlta->componentDidMount #');
  },
  componentWillReceiveProps: function(nextProps) {
    //console.log('# MedicamentoAlta->componentWillReceiveProps #');
  },
  shouldComponentUpdate: function() {
    //console.log('# MedicamentoAlta->shouldComponentUpdate #');
    return true;
  },
  componentWillUpdate: function() {
    //console.log('# MedicamentoAlta->componentWillUpdate #');
  },
  componentDidUpdate: function() {
    //console.log('# MedicamentoAlta->componentDidUpdate #');
  },
  componentWillUnmount: function() {
    //console.log('# MedicamentoAlta->componentWillUnmount #');
    this.unSubscribeLanguage(this.state.componentKey);
  },
  show: function() {
    //aqui limpiar componente
    this.setState({
      show: true
    });
  },
  hide: function() {
    //aqui limpiar componente
    this.setState({
      show: false
    });
  },
  onClickCerrar: function(evt) {
    this.setState({
      show: false
    });
  },
  render: function() {
    //console.log('# MedicamentoAlta->render #');
    var CLASS_HIDDEN = 'componentHide';
    var CLASS_SHOW = 'componentShow';
    var className = '';

    className = (this.state.show == true ? CLASS_SHOW : CLASS_HIDDEN);

    return (
      <div className={className}>
        <div className='fondoShow' style={{zIndex: this.state.zindex-1}}>&nbsp;</div>
        <div className={'panel panel-primary popUpClass'} style={{zIndex: this.state.zindex-1}}>
          <div className='panel-heading'>
            Titulo del componente
          </div>
          <div className='panel-body'>
            body del componente
          </div>
          <div className='panel-footer button-align-right'>
            <div className='input-group'>
              <span className='componentSpace'>
                <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value='Cerrar' onClick={this.onClickCerrar} />
              </span>
              <span className='componentSpace'>
                aqui puede ir un boton 2
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MedicamentoAlta;
