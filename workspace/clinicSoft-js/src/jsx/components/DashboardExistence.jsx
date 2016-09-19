/**
* __title__ = 'Dashboard Existencia De Medicamentos.'
* __author__ = '@LLV'
* __date__ = '17/09/2016'
*/

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
var HighchartsPie = require('../utils/HighchartsPie.js');
var ReporteMedicamentos = require('./ReporteMedicamentos.jsx');

//servicios
var medicamentoService = require('../services/MedicamentoService.js');
var validaService = require('../utils/ValidaService.js');

var DashboardExistence = React.createClass({
  mixins: [LanguageMixin(),AlertMixin()],
  getDefaultProps: function() {
    //console.log('# DashboardDrugs->getDefaultProps #');
    return {
      zindex: 4
    };
  },

  getInitialState: function() {
    //console.log('# App->getInitialState #');
    return {
      componentKey: 'DashboardDrugs',
      mainComponent: undefined,
      language: window.language,
      zindex: this.props.zindex,
      image64: '',
      lista_medicament:[],
      id_med:0,
      dem_id:0,
      nombre_comercial:'',
      nombre_generico:'',
      presentacion:'',
      existencia:0,
      cantidad_maxima:0,
      cantidad_minima:0,
      imagen:''
    };
  },
  componentWillMount: function() {
     var self = this;
    //console.log('# App->componentWillMount #');
    self.subscribeLanguage(self.state.componentKey, self.changeSessionLanguage);
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
     var self = this;
    //console.log('# App->componentWillUnmount #');
    self.unSubscribeLanguage(self.state.componentKey);
  },
  onFileSelected: function(fileName, fileBase64) {
    //console.log('fileName:' + fileName + ', fileBase64:' + fileBase64);
    this.setState({
      image64: fileBase64
    });
  },
  show: function(id_med) {
    var self = this;
    var onSuccess = function(response) {
      console.log('# success  #');
      self.setState({
        show: true,
        id_med:id_med,
        lista_medicament: response.payload
      });
      self.updateGraficPie(response.payload);
    };
    var params = {
        'dem_id': id_med
    };
    medicamentoService.dashbordMedicamento(params, onSuccess, this.onError, this.onFail);
  },
  hide: function() {
    //aqui limpiar componente
    this.setState({
      show: false
    });
  },
  //@LLV Método que cierra el popup y limpia componentes.
  onClickClose: function(evt) {
    this.setState({
      show: false,
      ban:true
    });
  },
  //@LLV Método que retorna a la ventana anterior.
  onClickBack: function(evt) {
    //Oculto el popup de DashboardDrugs
    var onSuccess = function(response) {
      console.log('# success  #');
    };
    this.hide();
    //Muestro el popup de ReportMedicament
    this.props.papa.show();
  },

  //@LLV  Metodo que obtiene el total de medicamentos.
  updateGraficPie: function(lista_medicament){
    var self = this;
    var cantidad_maxima=0;
    var cantidad_minima=0;
    var nombre_comercial='';
    var presentacion='';
    var existencia=0;
    var imagen='';

    if(lista_medicament.length > 0) {
      var rows_detalles = self.state.lista_medicament.map(function(auxDetalle,index) {
        cantidad_maxima=auxDetalle.dem_cantidad_maxima;
        cantidad_minima=auxDetalle.dem_cantidad_minima;
        nombre_comercial=auxDetalle.med_nombre_comercial;
        presentacion=auxDetalle.dem_presentacion;
        existencia=auxDetalle.dem_en_existencia;
        imagen=auxDetalle.dem_imagen;
      });
    }
    var aux_nombre_comercial=nombre_comercial;
    var aux_presentacion=presentacion;
    var aux_existencia=existencia;
    var aux_cantidad_maxima=cantidad_maxima;
    var aux_cantidad_minima=cantidad_minima;

    //@LLV Código para determinar el estado de existencia.
    var restaMedicament=aux_cantidad_maxima - aux_existencia;
    var title = self.getText('MSG_3041');
    var title_existen = self.getText('MSG_3042');
    var title_consumidos = self.getText('MSG_3043');
    HighchartsPie.gauge({restaMedicament,aux_existencia,title,title_existen,title_consumidos});

    self.setState({
      image64: imagen
    });
  },

  //@LLV Inicia el render de los componentes react.
  render: function() {
   //console.log('# DetalleMedicamentoAlta->render #');
    var listaDetallesDivDashboard = (<div></div>);
    var self = this;
    var CLASS_HIDDEN = 'componentHide';
    var CLASS_SHOW = 'componentShow';
    var className = '';
    className = (self.state.show == true ? CLASS_SHOW : CLASS_HIDDEN);

    if(self.state.lista_medicament.length > 0) {
      var rows_detalles = self.state.lista_medicament.map(function(auxDetalle,index) {
        return (
          <tr key={auxDetalle.id_med}>
            <td className='table-bordered-dash'>{self.getText('MSG_3001')}</td><td className='table-bordered-dashDos'>{auxDetalle.med_nombre_comercial}</td>
            <td className='table-bordered-dash'>{self.getText('MSG_3010')}</td><td className='table-bordered-dashDos'>{auxDetalle.dem_presentacion}</td>
          </tr>
        );
      });
    }

    if(self.state.lista_medicament.length > 0) {
      var rows_detallesdos = self.state.lista_medicament.map(function(auxDetalle,index) {
        return (
          <tr key={auxDetalle.id_med} className='table tr:nth-child(even)'>
            <td className='table-bordered-dash'>{self.getText('MSG_3013')}</td><td className='table-bordered-dashDos'>{auxDetalle.dem_en_existencia}</td>
            <td className='table-bordered-dash '>{self.getText('MSG_3012')}</td><td className='table-bordered-dashDos'>{auxDetalle.dem_cantidad_minima}</td>
           </tr>
        );
      });
    }

    listaDetallesDivDashboard = (
        <div className='panelScrollDashboard'>
          <table className='table table-bordered table-hover'>
           <tbody>
            {rows_detalles}
            {rows_detallesdos}
           </tbody>
          </table>
        </div>
      );

    return (
      <div className={className}>
          <div className='fondoShow' style={{zIndex: this.state.zindex-1}}>&nbsp;</div>
          <div className={'panel panel-default popUpClassDashboard'} style={{zIndex: this.state.zindex-1}}>
          <div className='panel-heading'>
            {this.getText('MSG_3040')}
          </div>

              <div className='panel-body'>
                  <div style={{width: '100%', paddingLeft:'10%', paddingRight:'10%' }} className='panelForm'>

                    <div style={{paddingLeft:'37%' , paddingRight:'35%'}} className='row'>
                        <img style={{width: '150px', height: '150px'}} src={this.state.image64}/>
                    </div>
                    <br></br>
                    {listaDetallesDivDashboard}
                    <br></br>
                    <div style={{width: '100%'}} className='row'>
                        <div id='contain'>&nbsp;</div>
                    </div>

                  </div>
                  <div className='panel-footer button-align-right'>
                  <div className='input-group' style={{align: 'center'}}>
                     <div className="btn-group btn-group-justified" role="group" aria-label="...">
                       <div className="btn-group" role="group">
                           <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_102')} onClick={this.onClickClose} />
                       </div>
                       <div className="btn-group" role="group">
                          <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_3020')}  onClick={this.onClickBack} />
                       </div>
                    </div>
                  </div>
                 </div>
              </div>
          </div>
      </div>

    );
  }
});

module.exports = DashboardExistence;
