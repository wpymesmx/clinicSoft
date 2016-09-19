/**
* __title__ = 'Reporte Medicamentos.'
* __author__ = '@LLV'
* __date__ = '08/09/2016'
*/

'use strict';
var React = require('react');
//mixins
var LanguageMixin = require('../mixins/LanguageMixin.js');
//utils
var Constants = require('../utils/Constants.js');
//components
/**
* componente utilizado para reportes de medicamentos
*/

//sweetalert for pupup
var swal=require('sweetalert');

//servicios
var medicamentoService = require('../services/MedicamentoService.js');
//Importo valida service
var validaService = require('../utils/ValidaService.js');

//importamos para vetanas de errores o información
var AlertMixin = require('../mixins/AlertMixin.js');

//importamos la clase de dashboard.
var DashboardDrugs = require('./DashboardDrugs.jsx');

//importamos la clase de dashboard.
var DashboardExistence = require('./DashboardExistence.jsx');

//@LLV Inicio de la clase Reporte Medicamentos.
var ReporteMedicamentos = React.createClass({
  mixins: [LanguageMixin(),AlertMixin()],
  getDefaultProps: function() {
    //console.log('# ReporteMedicamentos->getDefaultProps #');
    return {
      zindex: 2
    };
  },
  getInitialState: function() {
    //console.log('# MedicamentoAlta->getInitialState #');
    return {
      componentKey: 'ReporteMedicamentos',
      language: window.language,
      show: false,
      zindex: this.props.zindex,
      nombre_comercial: '',
      nombre_aux: '',
      nombre_generico: '',
      farmaceutica: '',
      elaborado_en: '',
      presentacion:'',
      fecha_alta: '',
      fecha_caducidad: '',
      condicion_venta: '',
      codigo_barras:'',
      descripcion:'',
      estado:'A',
      nombre_grupo:'',
      lista_id: [],
      lista_medicamentos:[],
      lista_presentacion:[],
      lista_descripcion:[],
      lista_farmaceutica:[],
      lista_nombre_comercial:[],
      lista_nombre_generico:[],
      lista_nombre_grupos:[],
      id_med: 0,
      ban:true,
      comboPresentacionValue:0,
      comboNombreComercialValue:0,
      comboNombreGenericoValue:0,
      comboDescripcionValue:0,
      comboFarmaceuticaValue:0,
      comboGrupoValue:0
    };
  },
  componentWillMount: function() {
    //console.log('# ReporteMedicamentos->componentWillMount #');
    this.subscribeLanguage(this.state.componentKey, this.changeSessionLanguage);
  },
  componentDidMount: function() {
    //console.log('# ReporteMedicamentos->componentDidMount #');
  },
  componentWillReceiveProps: function(nextProps) {
    //console.log('# ReporteMedicamentos->componentWillReceiveProps #');
  },
  shouldComponentUpdate: function() {
    //console.log('# ReporteMedicamentos->shouldComponentUpdate #');
    return true;
  },
  componentWillUpdate: function() {
    //console.log('# ReporteMedicamentos->componentWillUpdate #');
  },
  componentDidUpdate: function() {
    //console.log('# ReporteMedicamentos->componentDidUpdate #');
  },
  componentWillUnmount: function() {
    //console.log('# ReporteMedicamentos->componentWillUnmount #');
    this.unSubscribeLanguage(this.state.componentKey);
  },
  //@LLV Método que muestra la siguiente ventana.
  onClickSiguiente: function(id_med,evt) {
    var self = this;
    console.log('#id_med que envia.#');
    console.log(id_med);
    var onSuccess = function(response) {
      console.log('# success  #');
    };
    //Oculto el popup de ReporteMedicamentos
    this.hide();
    //Muestro el popup de DashboardDrugs
    this.refs.dashboardDrugs.show(id_med);
     self.setState({
       ban: false
     });
  },

  //@LLV Método que muestra la siguiente ventana.
  onClickGraphyPie: function(id_med,evt) {
    var self = this;
    console.log('#id_med que envia.#');
    console.log(id_med);
    var onSuccess = function(response) {
      console.log('# success  #');
    };
    //Oculto el popup de ReporteMedicamentos
    this.hide();
    //Muestro el popup de DashboardDrugs
    this.refs.dashboardExistence.show(id_med);
     self.setState({
       ban: false
     });
  },

  onChangePresentacion: function(evt) {
    this.setState({
      presentacion: evt.target.value
    });
  },
  onChangeNombreComercial: function(evt) {
    this.setState({
      nombre_comercial: evt.target.value
    });
  },
  onChangeNombreGenerico: function(evt) {
    this.setState({
      nombre_generico: evt.target.value
    });
  },
  onChangeFarmaceutica: function(evt) {
    this.setState({
      farmaceutica: evt.target.value
    });
  },
  onChangeGrupo: function(evt) {
    this.setState({
      nombre_grupo: evt.target.value
    });
  },
  onChangeElaboradoEn: function(evt) {
    this.setState({
      elaborado_en: evt.target.value
    });
  },
  onChangeCondicionVenta: function(evt) {
    this.setState({
      condicion_venta: evt.target.value
    });
  },
  onChangeEstado: function(evt) {
    this.setState({
      estado: evt.target.value
    });
  },
  show: function() {
    //aqui limpiar componente
    this.setState({
      show: true
    });

    var self = this;
    var onSuccess = function(response) {
      console.log('# success  #');
      self.setState({
        lista_medicamentos: response.payload
      });
    };
    var params = {
        'codigo_barras': this.state.codigo_barras,
        'nombre_comercial': this.state.nombre_comercial,
        'nombre_generico': this.state.nombre_generico,
        'fecha_alta':this.state.fecha_alta,
        'fecha_caducidad':this.state.fecha_caducidad,
        'presentacion':this.state.presentacion,
        'descripcion': this.state.descripcion,
        'farmaceutica': this.state.farmaceutica,
        'grupo':this.state.nombre_grupo
    };
    medicamentoService.reporteMedicamentos(params, onSuccess, this.onError, this.onFail);

    //@LLV Se llama el servicio que llena el combo presentación.
     var onSuccess = function(response) {
      console.log('# success  #');
      self.setState({
        lista_presentacion: response.payload
      });
    };
    var params = {
    };
    medicamentoService.llenaComboPresentacion(params, onSuccess, this.onError, this.onFail);

    //@LLV Se llama el servicio que llena el combo de nombres comerciales.
     var onSuccess = function(response) {
      console.log('# success  #');
      self.setState({
        lista_nombre_comercial: response.payload
      });
    };
    var params = {
    };
    medicamentoService.llenaComboNombreComercial(params, onSuccess, this.onError, this.onFail);

    //@LLV Se llama el servicio que llena el combo de nombres genericos.
     var onSuccess = function(response) {
      console.log('# success  #');
      self.setState({
        lista_nombre_generico: response.payload
      });
    };
    var params = {
    };
    medicamentoService.llenaComboNombreGenerico(params, onSuccess, this.onError, this.onFail);

     //@LLV Se llama el servicio que llena el combo de forma farmaceutica.
     var onSuccess = function(response) {
      console.log('# success  #');
      self.setState({
        lista_descripcion: response.payload
      });
    };
    var params = {
    };
    medicamentoService.llenaComboDescripcion(params, onSuccess, this.onError, this.onFail);

    //@LLV Se llama el servicio que llena el combo de farmaceutica.
    var onSuccess = function(response) {
      console.log('# success  #');
      self.setState({
        lista_farmaceutica: response.payload
      });
    };
    var params = {
    };
    medicamentoService.llenaComboFarmaceutica(params, onSuccess, this.onError, this.onFail);

    //@LLV Se llama el servicio que llena el combo de grupos.
    var onSuccess = function(response) {
      console.log('# success  #');
      self.setState({
        lista_nombre_grupos: response.payload
      });
    };
    var params = {
    };
    medicamentoService.llenaComboNombreGrupo(params, onSuccess, this.onError, this.onFail);

  },

  hide: function() {
    //aqui limpiar componente
    this.setState({
      show: false
    });
  },

  onChangeComboPresentacion: function(evt) {
      var self = this;
      var idSelect=evt.target.value;
      self.setState({
          comboPresentacionValue: evt.target.value
      });
      if(self.state.lista_presentacion.length>0 && idSelect>0){
          var rows_presentacion = self.state.lista_presentacion.map(function(objPresentacion) {
              if(objPresentacion.gru_id==idSelect){
                  self.setState({
                       presentacion: objPresentacion.gru_nombre
                  });
              }
          });
      }else{
           self.setState({
                presentacion: ''
           });
      }
  },

  onChangeComboDescripcion: function(evt) {
      var self = this;
      var idSelect=evt.target.value;
      self.setState({
          comboDescripcionValue: evt.target.value
      });

      console.log(idSelect);

      if(self.state.lista_descripcion.length>0 && idSelect>0){
          var rows_descripcion = self.state.lista_descripcion.map(function(objDescripcion) {
              if(objDescripcion.gru_id==idSelect){
                  self.setState({
                       descripcion: objDescripcion.gru_nombre
                  });
              }
          });
      }else{
           self.setState({
                descripcion: ''
           });
      }
  },

  onChangeComboFarmaceutica: function(evt) {
      var self = this;
      var idSelect=evt.target.value;
      self.setState({
          comboFarmaceuticaValue: evt.target.value
      });
      if(self.state.lista_farmaceutica.length>0 && idSelect>0){
          var rows_farmaceutica = self.state.lista_farmaceutica.map(function(objFarmaceutica) {
              if(objFarmaceutica.gru_id==idSelect){
                  self.setState({
                       farmaceutica: objFarmaceutica.gru_nombre
                  });
              }
          });
      }else{
           self.setState({
                farmaceutica: ''
           });
      }

  },

  onChangeComboNombreComercial: function(evt) {
      var self = this;
      var idSelect=evt.target.value;
      self.setState({
          comboNombreComercialValue: evt.target.value
      });
      if(self.state.lista_nombre_comercial.length>0 && idSelect>0){
      var rows_nombreComercial = self.state.lista_nombre_comercial.map(function(objNombresComercial) {
          if(objNombresComercial.gru_id==idSelect){
              self.setState({
                 nombre_comercial: objNombresComercial.gru_nombre
              });
          }
      });
    }else{
           self.setState({
                nombre_comercial: ''
           });
      }
  },

  onChangeComboNombreGenerico: function(evt) {
      var self = this;
      var idSelect=evt.target.value;
      self.setState({
          comboNombreGenericoValue: evt.target.value
      });
      if(self.state.lista_nombre_generico.length>0 && idSelect>0){
          var rows_nombreGenericos = self.state.lista_nombre_generico.map(function(objNombresGenericos) {
              if(objNombresGenericos.gru_id==idSelect){
                  self.setState({
                     nombre_generico: objNombresGenericos.gru_nombre
                  });
              }
          });
      }else{
           self.setState({
                nombre_generico: ''
           });
      }
  },

  onChangeComboGrupo: function(evt) {
      var self = this;
      var idSelect=evt.target.value;
      self.setState({
          comboGrupoValue: evt.target.value
      });
      if(self.state.lista_nombre_grupos.length>0 && idSelect>0){
          var rows_nombreGenericos = self.state.lista_nombre_grupos.map(function(objNombresGrupos) {
              if(objNombresGrupos.gru_id==idSelect){
                  self.setState({
                     nombre_grupo: objNombresGrupos.gru_nombre
                  });
              }
          });
      }else{
           self.setState({
                nombre_grupo: ''
           });
      }
  },

  //@LLV Método que cierra popup y limpia componentes.
  onClickCerrar: function(evt) {
    this.setState({
      show: false,
      ban:true
    });
    this.state.nombre_comercial='',
    this.state.nombre_generico='',
    this.state.farmaceutica='',
    this.state.elaborado_en='',
    this.state.condicion_venta='',
    this.state.comboPresentacionValue='',
    this.state.comboNombreComercialValue='',
    this.state.comboNombreGenericoValue='',
    this.state.comboDescripcionValue='',
    this.state.comboFarmaceuticaValue='',
    this.state.comboGrupoValue='',
    this.state.nombre_grupo=''
  },

  //@LLV Método para reporte de medicamentos
  onClickBuscar: function(evt) {
    var self = this;
    var onSuccess = function(response) {
      console.log('# success  #');
      self.setState({
        lista_medicamentos: response.payload
      });
    };
    var params = {
        'codigo_barras': this.state.codigo_barras,
        'nombre_comercial': this.state.nombre_comercial,
        'nombre_generico': this.state.nombre_generico,
        'fecha_alta':this.state.fecha_alta,
        'fecha_caducidad':this.state.fecha_caducidad,
        'presentacion':this.state.presentacion,
        'descripcion': this.state.descripcion,
        'farmaceutica': this.state.farmaceutica,
        'grupo': this.state.nombre_grupo
    };
    medicamentoService.reporteMedicamentos(params, onSuccess, this.onError, this.onFail);
  },

  //Función principal que renderiza los componentes.
  render: function() {
    //console.log('# MedicamentoAlta->render #');
     var listaDetallesDiv = (<div></div>);
    var self = this;
    var CLASS_HIDDEN = 'componentHide';
    var CLASS_SHOW = 'componentShow';
    var className = '';
    className = (this.state.show == true ? CLASS_SHOW : CLASS_HIDDEN);

     if(self.state.lista_medicamentos.length > 0) {
      var rows_detalles = self.state.lista_medicamentos.map(function(auxDetalle,index) {
        var id_med=auxDetalle.dem_id;
        return (
          <tr key={auxDetalle.id_med}>
            <td><div style={{width: '100%', paddingLeft:'25%', paddingRight:'10%', paddingTop:'6.5%' }}>
               <button className='grafic2d' title={self.getText('MSG_3039')} onClick={self.onClickSiguiente.bind(self,id_med)}/>
            </div> </td>
            <td><div style={{width: '100%', paddingLeft:'25%', paddingRight:'10%', paddingTop:'1%' }}>
                <button className='graficPie' title={self.getText('MSG_3013')}  onClick={self.onClickGraphyPie.bind(self,id_med)}/>
            </div> </td>
            <td>{auxDetalle.codigo_barras}</td>
            <td>{auxDetalle.med_nombre_comercial}</td>
            <td>{auxDetalle.med_nombre_generico}</td>
            <td>{auxDetalle.dem_fecha_alta}</td>
            <td>{auxDetalle.dem_fecha_caducidad}</td>
            <td>{auxDetalle.dem_presentacion}</td>
            <td>{auxDetalle.dem_descripcion}</td>
            <td>{auxDetalle.dem_farmaceutica}</td>
            <td>{auxDetalle.dem_grupo}</td>
          </tr>
        );
      });
    }


     listaDetallesDiv = (
        <div className='panelScrollDetalle' >
          <table className='table table-bordered table-hover'>
           <tbody>
             <tr className='alert alert-success default' role='alert'>

               <td>{this.getText('MSG_3039')}</td>
               <td>{this.getText('MSG_3013')}</td>
               <td>{this.getText('MSG_3014')}</td>
               <td>{this.getText('MSG_3001')}</td>
               <td>{this.getText('MSG_3002')}</td>
               <td>{this.getText('MSG_3018')}</td>
               <td>{this.getText('MSG_3019')}</td>
               <td>{this.getText('MSG_3010')}</td>
               <td>{this.getText('MSG_3014')}</td>
               <td>{this.getText('MSG_3003')}</td>
               <td>{this.getText('MSG_3021')}</td>
            </tr>
            {rows_detalles}
           </tbody>
          </table>
        </div>
      );

    //@LLV recorre lista de presentacion
    var listaPresentacionComboOption = [];
    if(self.state.lista_presentacion.length>0){
      var rows_presentacion = self.state.lista_presentacion.map(function(presentacion,index) {
        return (<option key={('user_option_' + index)} value={presentacion.gru_id}>{presentacion.gru_nombre}</option>);
      });
      listaPresentacionComboOption.push(rows_presentacion);
    }

    //@LLV recorre lista de nombres comerciales
    var listaNombresComercialesComboOption = [];
    var i=0;
    if(self.state.lista_nombre_comercial.length>0){
      var rows_nombreComercial = self.state.lista_nombre_comercial.map(function(nombreComercial) {
        return (
           <option value={nombreComercial.gru_id}>{nombreComercial.gru_nombre}</option>
        );
      });
      listaNombresComercialesComboOption.push(rows_nombreComercial);
    }

    //@LLV recorre lista de nombres genericos
    var listaNombresGenericosComboOption = [];
    if(self.state.lista_nombre_generico.length>0){
      var rows_nombreGenericos = self.state.lista_nombre_generico.map(function(nombreGenerico) {
        return (
           <option value={nombreGenerico.gru_id}>{nombreGenerico.gru_nombre}</option>
        );
      });
      listaNombresGenericosComboOption.push(rows_nombreGenericos);
    }

    //@LLV recorre lista de descripcion
    var listaDescripcionComboOption = [];
    if(self.state.lista_descripcion.length>0){
      var rows_descripcion = self.state.lista_descripcion.map(function(descripcion) {
        return (
           <option value={descripcion.gru_id}>{descripcion.gru_nombre}</option>
        );
      });
      listaDescripcionComboOption.push(rows_descripcion);
    }

    //@LLV recorre lista de farmaceuticas
    var listaFarmaceuticaComboOption = [];
    if(self.state.lista_farmaceutica.length>0){
      var rows_farmaceutica = self.state.lista_farmaceutica.map(function(farmaceutica) {
        return (
           <option value={farmaceutica.gru_id}>{farmaceutica.gru_nombre}</option>
        );
      });
      listaFarmaceuticaComboOption.push(rows_farmaceutica);
    }

    //@LLV recorre lista de grupos
    var listaGruposComboOption = [];
    if(self.state.lista_nombre_grupos.length>0){
      var rows_grupos = self.state.lista_nombre_grupos.map(function(grupo) {
        return (
           <option value={grupo.gru_id}>{grupo.gru_nombre}</option>
        );
      });
      listaGruposComboOption.push(rows_grupos);
    }

    return (
    <div>
      <DashboardDrugs ref='dashboardDrugs' papa={self}/>
      <DashboardExistence ref='dashboardExistence' papa={self}/>
      <div className={className}>
        <div className='fondoShow' style={{zIndex: this.state.zindex-1}}>&nbsp;</div>
        <div className={'panel panel-default popUpClassReporte'} style={{zIndex: this.state.zindex-1}}>
          <div className='panel-heading'>
            {this.getText('MSG_3036')}
          </div>
          <div className='panel-body'>
           <div style={{width: '100%', paddingLeft:'10%', paddingRight:'10%' }} className='panelForm'>

           <table>

            <tr>
               <td>
                   Nombre comercial:
               </td>
               <td>
                   <input type='text' className='form-control' placeholder={this.getText('MSG_3002')} value={this.state.nombre_comercial}
                   onChange={this.onChangeNombreComercial}/>
               </td>
               <td>
                   <select className='form-control' value={this.state.comboNombreComercialValue} onChange={this.onChangeComboNombreComercial} >
                      <option value='0'>{this.getText('MSG_207')}</option>
                      {listaNombresComercialesComboOption}
                   </select>
               </td>
           </tr>

           <tr>
               <td>
                   {this.getText('MSG_3002')}:
               </td>
               <td>
                   <input type='text' className='form-control' placeholder={this.getText('MSG_3002')} value={this.state.nombre_generico}
                   onChange={this.onChangeNombreGenerico}/>
               </td>
               <td>
                   <select className='form-control' value={this.state.comboNombreGenericoValue} onChange={this.onChangeComboNombreGenerico} >
                      <option value='0'>{this.getText('MSG_207')}</option>
                      {listaNombresGenericosComboOption}
                   </select>
               </td>
           </tr>

           <tr>
               <td>
                   {this.getText('MSG_3010')}:
               </td>
               <td>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3010')} value={this.state.presentacion}
                  onChange={this.onChangePresentacion}/>
               </td>
               <td>
                   <select className='form-control' value={this.state.comboPresentacionValue} onChange={this.onChangeComboPresentacion}>
                      <option value='0'>{this.getText('MSG_207')}</option>
                      {listaPresentacionComboOption}
                   </select>
               </td>
           </tr>

           <tr>
               <td>
                   {this.getText('MSG_3014')}:
               </td>
               <td>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3014')} value={this.state.descripcion}
                  onChange={this.onChangeDescripcion}/>
               </td>
               <td>
                   <select className='form-control' value={this.state.comboDescripcionValue} onChange={this.onChangeComboDescripcion}>
                      <option value='0'>{this.getText('MSG_207')}</option>
                      {listaDescripcionComboOption}
                   </select>
               </td>
           </tr>


           <tr>
               <td>
                   {this.getText('MSG_3003')}:
               </td>
               <td>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3003')} value={this.state.farmaceutica}
                  onChange={this.onChangeFarmaceutica}/>
               </td>
               <td>
                   <select className='form-control' value={this.state.comboFarmaceuticaValue} onChange={this.onChangeComboFarmaceutica}>
                      <option value='0'>{this.getText('MSG_207')}</option>
                      {listaFarmaceuticaComboOption}
                   </select>
               </td>
           </tr>

           <tr>
               <td>
                   {this.getText('MSG_3021')}:
               </td>
               <td>
                  <input type='text' className='form-control' placeholder={this.getText('MSG_3021')} value={this.state.nombre_grupo}
                  onChange={this.onChangeGrupo}/>
               </td>
               <td>
                   <select className='form-control' value={this.state.comboGrupoValue} onChange={this.onChangeComboGrupo}>
                      <option value='0'>{this.getText('MSG_207')}</option>
                      {listaGruposComboOption}
                   </select>
               </td>
           </tr>



           </table>

            </div>
            {listaDetallesDiv}

         </div>
        <div className='panel-footer button-align-right'>
          <div className='input-group' style={{align: 'center'}}>
             <div className="btn-group btn-group-justified" role="group" aria-label="...">
               <div className="btn-group" role="group">
                   <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_102')} onClick={this.onClickCerrar} />
               </div>
               <div className="btn-group" role="group">
                   <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_204')} onClick={this.onClickBuscar} />
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

module.exports = ReporteMedicamentos;
