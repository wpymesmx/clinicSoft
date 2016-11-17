/**
* __title__ = 'Dashboard Estado De Caducidad.'
* __author__ = '@LLV'
* __date__ = '12/09/2016'
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
var Highcharts = require('../utils/Highcharts.js');
var ReporteMedicamentos = require('./ReporteMedicamentos.jsx');

//servicios
var medicamentoService = require('../services/MedicamentoService.js');
var validaService = require('../utils/ValidaService.js');

var DashboardDrugs = React.createClass({
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
      fecha_actual:'',
      fecha_caducidad:'',
      nombre_comercial:'',
      nombre_generico:'',
      presentacion:'',
      estado_medicamento:'',
      existencia:'',
      f1:'',
      f2:'',
      banEstadoCaducidad:'',
      banEstadoAgotados:'',
      dias:0,
      paramDay:150,
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
    var self = this;
    var onSuccess = function(response) {
      console.log('# success  #');
      self.setState({
        lista_medicament: response.payload
      });
    };
    var params = {
        'dem_id': this.state.id_med
    };
    medicamentoService.dashbordMedicamento(params, onSuccess, this.onError, this.onFail);
    self.onClickGetRealDay();
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
      self.updateGrafica(response.payload);
    };
    var params = {
        'dem_id': id_med
    };
    medicamentoService.dashbordMedicamento(params, onSuccess, this.onError, this.onFail);
    self.onClickGetRealDay();
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

   //@LLV Método utilizado para limpiar componentes.
  onClickClean: function(evt) {
    var self = this;
  },

  //@LLV Metódo que obtiena la fecha actual.
  onClickGetRealDay:function(evt){
    var self = this;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }
    var today = dd+'/'+mm+'/'+yyyy;
    console.log('Valor de hoy: ');
    console.log(today);
    self.setState({
       fecha_actual: today
    });
  },

  //@LLV  Se recuperan los datos generales y la fecha de caducidad del medicamento.
  updateGrafica: function(lista_medicament){
    var self = this;
    var fecha_caducidad='';
    var nombre_comercial='';
    var presentacion='';
    var existencia='';
    var imagen='';

    if(lista_medicament.length > 0) {
      var rows_detalles = self.state.lista_medicament.map(function(auxDetalle,index) {
        fecha_caducidad=auxDetalle.dem_fecha_caducidad;
        nombre_comercial=auxDetalle.med_nombre_comercial;
        presentacion=auxDetalle.dem_presentacion;
        existencia=auxDetalle.dem_en_existencia;
        imagen=auxDetalle.dem_imagen;
      });
    }
    var aux_nombre_comercial=nombre_comercial;
    var aux_presentacion=presentacion;
    var aux_existencia=existencia;

    self.setState({
      image64: imagen
    });

    console.log('Consulta Fecha Caducidad: ');
    console.log(fecha_caducidad);
    var str = fecha_caducidad;
    var auxFecha = str.slice(0,10);

    //@LLV Código para dar formato a la fecha de caducidad.
    var fecha = new Date(auxFecha);
    var dd = fecha.getDate()+1;
    var mm = fecha.getMonth()+1;
    var yyyy = fecha.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }
    var fecha = dd+'/'+mm+'/'+yyyy;

    //@LLV Fecha de caducidad con formato
    console.log('Fecha Caducidad: ');
    console.log(fecha);
    var f2=fecha;

    //@LLV Fecha actual con formato.
    var f1=this.state.fecha_actual;
    console.log('Fecha Actual: ');
    console.log(this.state.fecha_actual);

    //@LLV Código para realizar la resta de las fechas
     var aFecha1 = f1.split('/');
     var aFecha2 = f2.split('/');
     var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]);
     var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]);
     var dif = fFecha2 - fFecha1;
     var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
     console.log('La diferencia en dias es:');
     console.log(dias);

     //@LLV Código para determinar el estado de caducidad.
     var banEstadoCaducidad='';
     var  aux_day = self.getText('MSG_3046');
     var  aux_restan = self.getText('MSG_3047');
     if(dias==0){
          banEstadoCaducidad = self.getText('MSG_3044');
          //@LLV Datos que se enviaran como parametros a la grafica.
          console.log('El estado del medicamento es:');
          console.log(banEstadoCaducidad);
          console.log('Valor que lleva el parametro dias');
          console.log(dias);
          Highcharts.gauge({dias,banEstadoCaducidad,aux_day,aux_restan});
     }

     if(dias<=200){
         banEstadoCaducidad = self.getText('MSG_3045');
         //@LLV Datos que se enviaran como parametros a la grafica.
         console.log('El estado del medicamento es:');
         console.log(banEstadoCaducidad,aux_day,aux_restan);
         console.log('Valor que lleva el parametro dias');
         console.log(dias);
         Highcharts.gauge({dias,banEstadoCaducidad,aux_day,aux_restan});
     }

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
            <td className='table-bordered-dash '>{self.getText('MSG_3019')}</td><td className='table-bordered-dashDos'>{auxDetalle.dem_fecha_caducidad}</td>
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
            {this.getText('MSG_3038')}
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
                        <div id='container'>&nbsp;</div>
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

module.exports = DashboardDrugs;
