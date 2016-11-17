/**
* __title__ = 'Detalle Del Paciente.'
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
var PatientNew = require('./PatientNew.jsx');
var DatePickerReact = require('./DatePickerReact.jsx');
//servicios
var validaService = require('../utils/ValidaService.js');
var pacienteService = require('../services/PacienteService.js');

var InputFileReactDoc = require('./InputFileReactDoc.jsx');

var EditarHistorialPaciente = React.createClass({
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
      pacienteDto:{
          paci_image64: '',
          paci_direccion:'',
          paci_telefono:'',
          paci_correo:'',
          paci_ocupacion:'',
          paci_tipo:'',
          paci_foto:'',
          nombre_doc:''
      },
      id_pac:'',
      nombre_original:'',
      paciente:'',
      lista_historial_pacientes:'',
      doc_analisis:''
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
  onFileSelected: function(fileName, fileBase64,index) {
    console.log('fileName:' + fileName + ', fileBase64:' + fileBase64);
    var decodedData = window.open(fileBase64);
    this.setState({
      doc_analisis: fileBase64
    });
  },
  onClickDocumento: function(index,evt) {
    var lista_historial_pacientes=this.state.lista_historial_pacientes;
    var detalle= lista_historial_pacientes[index];
    var fileBase64=detalle.his_analisis;
    console.log('fileName:' + fileName + ', fileBase64:' + fileBase64);
    var decodedData = window.open(fileBase64);
  },
  show: function(nombre_original,paciente,pacienteDto,id_pac) {
    //aqui limpiar componente
    console.log('/*Into onClickBuscar*/');
    var self = this;
    var onSuccess = function(response) {
      console.log('# success  #');
      console.log(response.payload);
      self.setState({
          show: true,
          id_pac:id_pac,
          nombre_original:nombre_original,
          paciente:paciente,
          pacienteDto:pacienteDto,
          lista_historial_pacientes: response.payload
      });
    };
    var params = {
        'id_pac': self.state.id_pac
    };
    console.log('*Parametro enviado para buscar detalles*');
    console.log(self.state.id_pac);
    pacienteService.buscarHistorial(params, onSuccess, self.onError, self.onFail);
    self.onClickGetRealDay();
  },
  hide: function() {
    //aqui limpiar componente
    this.setState({
      show: false
    });
  },

  //@LLV Método que retorna a la ventana anterior.
  onClickBack: function(pacienteDto,evt) {
    //Oculto el popup de DashboardDrugs
    var onSuccess = function(response) {
      console.log('# success  #');
    };
    this.hide();
    //Muestro el popup de ReportMedicament
    this.props.papa.show(this.state.nombre_original,this.state.paciente,this.state.pacienteDto);
  },
  onChangeEnfermedad: function(evt) {
      this.setState({
         enfermedad: evt.target.value
      });
  },
  onChangeSintoma: function(evt) {
    this.setState({
         sintoma: evt.target.value
    });
  },
  onChangeNombreAnalisis: function(evt) {
    this.setState({
         nombre_doc: evt.target.value
    });
  },
  onChangeEnfermedadEditar: function(index,evt) {
    var lista_historial_pacientes=this.state.lista_historial_pacientes;
    var detalle= lista_historial_pacientes[index];
    detalle.his_nombre=evt.target.value
    this.setState({
      lista_historial_pacientes: lista_historial_pacientes
    });
  },
  onChangeSintomaEditar: function(index,evt) {
    var lista_historial_pacientes=this.state.lista_historial_pacientes;
    var detalle= lista_historial_pacientes[index];
    detalle.his_sintoma=evt.target.value
    this.setState({
      lista_historial_pacientes: lista_historial_pacientes
    });
  },
  onChangeFechaAltaEditar: function(index,evt) {
    var lista_historial_pacientes=this.state.lista_historial_pacientes;
    var detalle= lista_historial_pacientes[index];
    detalle.his_fecha=evt.target.value
    this.setState({
      lista_historial_pacientes: lista_historial_pacientes
    });
  },
  onChangeEstadoEditar: function(index,evt) {
    var lista_historial_pacientes=this.state.lista_historial_pacientes;
    var detalle= lista_historial_pacientes[index];
    detalle.his_estado=evt.target.value
    this.setState({
      lista_historial_pacientes: lista_historial_pacientes
    });
  },
  onDatePicked: function(datePicked, evt) {
    console.log('datePicked->' + datePicked);
    this.setState({
      fecha_alta: (datePicked.getDate() + '/' + (datePicked.getMonth()+1) + '/' + datePicked.getFullYear())
    });
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
       fecha_alta: today
    });
  },

  //@LLV Método para vlaidar los campos obligatorios en el formulario.
  validaFormulario: function() {
    var response = {
      isError: false,
      message: ''
    };
    if(validaService.isEmpty(this.state.enfermedad)) {
       var self = this;
       return {isError: true, message: self.getText('MSG_4017')};
    }
    if(validaService.isEmpty(this.state.sintoma)) {
       var self = this;
       return {isError: true, message: self.getText('MSG_4018')};
    }
    return response;
  },

  //@LLV Método utilizado para validar los campos de entrada para la edición.
  validaCamposEdicion: function(index) {
    var self = this;
    var response = {
      isError: false,
      message: ''
    };
    var detalles_historial=this.state.lista_historial_pacientes[index];

    if(validaService.isEmpty(detalles_historial.his_nombre)) {
      return {isError: true, message: self.getText('MSG_4017')};
    }
    if(validaService.isEmpty(detalles_historial.his_sintoma)) {
      return {isError: true, message: self.getText('MSG_4018')};
    }
    if(validaService.isEmpty(detalles_historial.his_fecha)) {
      return {isError: true, message: self.getText('MSG_4019')};
    }
    if(validaService.isEmpty(detalles_historial.his_estado)) {
      return {isError: true, message: self.getText('MSG_4020')};
    }
    return response;
  },

  //@LLV Método utilizado para relaizar un insert a BD.
  onClickGuardar: function(evt) {
    var self = this;
    var pac_id='';
    var his_nombre='';
    var his_sintoma='';
    var his_fecha='';
    console.log('Valor de doc_analisis:');
    console.log(self.state.doc_analisis);
    var params = {
      'pac_id':self.state.id_pac,
      'his_nombre':self.state.enfermedad,
      'his_sintoma':self.state.sintoma,
      'his_fecha':self.state.fecha_alta,
      'his_analisis':self.state.doc_analisis
    };
    var paramsAnalisis = {
      'his_id':self.state.id_pac,
      'ana_nombre':self.state.nombre_doc,
      'ana_analisis':self.state.doc_analisis
    };
    console.log(self.state.sintoma);
    swal({title: 'Confirmar Registro?',
       text: 'Desea Continuar Con El Registro Del Historial!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Si,Guardar!',
          cancelButtonText: 'No,Cancelar!',
          closeOnConfirm: false,
          closeOnCancel: false
          },
          function(isConfirm){
             if (isConfirm) {
                 var onSuc = function(res) {
                   console.log('# success  #');
                 };
                 pacienteService.insertHistorial(params, onSuc, self.onError, self.onFail),
                 pacienteService.insertAnalisis(paramsAnalisis, onSuc, self.onError, self.onFail),
                 swal('Aceptar!','Historial Registrado Con Exito.','success');
                 self.setState({
                    ban: false
                 });
             }else {
                swal('Cancelar', 'El Registro Del Historial Fue Cancelado.', 'error');
             }
           });
    var response = this.validaFormulario();
  },
  //@LLV Método utilizado para relaizar un insert a BD.
  onClickEditar: function(index,evt) {
    var onSuccess = function(response) {
        console.log('# success  #');
    };
    var self = this;
    var response = this.validaCamposEdicion(index);
    if(!response.isError) {
        var detalles_historial=this.state.lista_historial_pacientes[index];
            var params = {
               'his_id': detalles_historial.his_id,
               'pac_id': detalles_historial.pac_id,
               'his_nombre': detalles_historial.his_nombre,
               'his_sintoma': detalles_historial.his_sintoma,
               'his_fecha': detalles_historial.his_fecha,
               'his_estado':  detalles_historial.his_estado
            };
            console.log(params);
            swal({title: 'Confirmar Edición?',
               text: 'Desea Continuar Con La Edición Del Historial!',
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#DD6B55',
                  confirmButtonText: 'Si,Guardar!',
                  cancelButtonText: 'No,Cancelar!',
                  closeOnConfirm: false,
                  closeOnCancel: false
                  },
                  function(isConfirm){
                     if (isConfirm) {
                         pacienteService.updateHistorial(params, onSuccess, self.onError, self.onFail),
                         swal('Aceptar!','Historial Editado Con Exito.',
                        'success');
                     }else {
                        swal('Cancelar', 'La Edición Fue Cancelada.', 'error');
                     }
                   });
    } else {
        self.showInfo(response.message, {zindex: 6});
    }
  },
  onClickBuscar: function(evt) {
    console.log('/*Into onClickBuscar*/');
    var self = this;
    var onSuccess = function(response) {
      console.log('# success  #');
      console.log(response.payload);
      self.setState({
        lista_historial_pacientes: response.payload
      });
    };
    var params = {
        'id_pac': self.state.id_pac
    };
    console.log('*Parametro enviado para buscar detalles*');
    console.log(self.state.id_pac);
    pacienteService.buscarHistorial(params, onSuccess, self.onError, self.onFail);
  },
  //@LLV Inicia el render de los componentes react.
  render: function() {
   //console.log('# DetalleMedicamentoAlta->render #');
    var listaDetallesDiv = (<div></div>);
    var self = this;
    var CLASS_HIDDEN = 'componentHide';
    var CLASS_SHOW = 'componentShow';
    var className = '';
    className = (self.state.show == true ? CLASS_SHOW : CLASS_HIDDEN);
    var rows_detalles = [];
     if(self.state.lista_historial_pacientes.length > 0) {
      rows_detalles = self.state.lista_historial_pacientes.map(function(detalle,index) {
        return (
          <tr key={detalle.his_id}>
            <td><button className='saveButton' title={self.getText('MSG_206')}  onClick={self.onClickEditar.bind(self,index)}/></td>
            <td><input style={{width: '315px'}} type='text' className='form-control' placeholder={self.getText('MSG_3014')}  value={detalle.his_nombre} onChange={self.onChangeEnfermedadEditar.bind(self,index)}/></td>
            <td><input style={{width: '315px'}} type='text' className='form-control' placeholder={self.getText('MSG_3010')}  value={detalle.his_sintoma} onChange={self.onChangeSintomaEditar.bind(self,index)}/></td>
            <td><input style={{width: '120px'}} type='text' className='form-control' placeholder={self.getText('MSG_3018')}  value={detalle.his_fecha} onChange={self.onChangeFechaAltaEditar.bind(self,index)}/></td>
            <td><input style={{width: '315px'}} type='text' className='form-control' placeholder={self.getText('MSG_3010')}  value={detalle.his_estado} onChange={self.onChangeEstadoEditar.bind(self,index)}/></td>
            <td><div  style={{width: '200px'}}>
                 <InputFileReact  className='form-control' ref='inputFile' extensions={['.png', '.gif', '.jpg']} onFileSelected={self.onFileSelectedDos}/>
            </div></td>
            <td>
                <a href={detalle.his_analisis}>{detalle.his_estado}</a>
            </td>
          </tr>
        );
      });
     }

     if(self.state.lista_historial_pacientes.length > 0){
          listaDetallesDiv = (
            <div className='panelScrollDetalle' >
              <table className='table table-bordered table-hover'>
               <tbody>
                 <tr className='alert alert-success default' role='alert'>
                   <td>{this.getText('MSG_206')}</td>
                   <td>*{this.getText('MSG_4014')}</td>
                   <td>*{this.getText('MSG_4015')}</td>
                   <td>*{this.getText('MSG_3018')}</td>
                   <td>Estado</td>
                   <td>*{this.getText('MSG_4016')}</td>
                   <td>Archivo</td>
                </tr>
                {rows_detalles}
               </tbody>
              </table>
            </div>
          );
      }

    return (
      <div className={className}>
          <div className='fondoShow' style={{zIndex: this.state.zindex-1}}>&nbsp;</div>
          <div className={'panel panel-default popUpClassDetalles'} style={{zIndex: this.state.zindex-1}}>
          <div className='panel-heading'>
            Historial Paciente
          </div>
              <div className='panel-body'>
                  <div style={{width: '100%', paddingLeft:'10%', paddingRight:'20%' }} className='panelForm'>

                     <div style={{width: '100%'}} className='row'>
                        <div style={{width: '15%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          Padecimiento:

                        </div>
                        <div style={{width: '80%'}} className='left_align'>
                            <textarea  rows='3' cols='20'  className='form-control' placeholder={this.getText('MSG_517')} value={this.state.pacienteDto.paci_direccion}
                            onChange={this.onChangeEnfermedad}> here</textarea>
                        </div>
                     </div>
                     <br/>

                     <div style={{width: '100%'}} className='row'>
                        <div style={{width: '15%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          Sintoma:

                        </div>
                        <div style={{width: '80%'}} className='left_align'>
                           <textarea  rows='3' cols='20'  className='form-control' placeholder={this.getText('MSG_517')} value={this.state.pacienteDto.paci_direccion}
                            onChange={this.onChangeSintoma}> here</textarea>
                        </div>
                     </div>

                     <br/>
                     <div style={{width: '100%'}} className='row'>
                        <div style={{width: '20%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          *{this.getText('MSG_3018')}:
                        </div>
                        <div style={{width: '58%'}} className='left_align'>
                          <DatePickerReact inputLabel='' onDatePicked={this.onFechanPicked} />
                        </div>
                     </div>

                     <br/>
                     <div style={{width: '100%'}} className='row'>
                        <div style={{width: '27%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          *Nombre del análisis:
                        </div>
                        <div style={{width: '58%'}} className='left_align'>
                          <input type='text' className='form-control' placeholder='Nombre del análisis' value={this.state.nombre_doc}
                            onChange={this.onChangeNombreAnalisis}/>
                        </div>
                     </div>

                     <br/>
                     <div style={{width: '100%'}} className='row'>
                        <div style={{width: '30%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          Adjuntar análisis clinico:
                        </div>

                         <div style={{width: '58%'}} className='left_align'>
                                <InputFileReactDoc className='form-control'  readonly='true' ref='inputFile' extensions={['.docx', '.pdf', '.xlsx']} onFileSelected={this.onFileSelected}/>
                         </div>
                     </div>

                     <br/>
                  </div>

                 <div className='panel button-align-right'>
                      <div>
                          {listaDetallesDiv}
                      </div>
                 </div>

                  <div className='panel-footer button-align-right'>
                      <div className='input-group' style={{align: 'center'}}>
                         <div className="btn-group btn-group-justified" role="group" aria-label="...">
                           <div className="btn-group" role="group">
                               <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_3020')} onClick={this.onClickBack.bind(this,this.state.pacienteDto)} />
                           </div>
                           <div className="btn-group" role="group">
                               <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_204')}  onClick={this.onClickBuscar} />
                           </div>
                           <div className="btn-group" role="group">
                               <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_206')}  onClick={this.onClickGuardar} />
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

module.exports = EditarHistorialPaciente;
