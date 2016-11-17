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

var HistorialPaciente = React.createClass({
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
      id_pac:'',
      enfermedad:'',
      sintoma:'',
      documento:'',
      fecha_alta:'',
      pacienteDto:{
        paci_image64: '',
        paci_direccion:'',
        paci_telefono:'',
        paci_correo:'',
        paci_ocupacion:'',
        paci_tipo:'',
        paci_foto:''
      }
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
  },
  show: function(id_pac) {
    console.log('# id_pac que recibe cuando cargo el popup histprial paciente.#');
    console.log(id_pac);
    //aqui limpiar componente
    this.setState({
      show: true,
      id_pac:id_pac
    });
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
    this.props.papa.show(pacienteDto);
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

  onDatePicked: function(datePicked, evt) {
    console.log('datePicked->' + datePicked);
    this.setState({
      fecha_alta: (datePicked.getDate() + '/' + (datePicked.getMonth()+1) + '/' + datePicked.getFullYear())
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
       return {isError: true, message: self.getText('MSG_109')};
    }
    if(validaService.isEmpty(this.state.sintoma)) {
       var self = this;
       return {isError: true, message: self.getText('MSG_109')};
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
    var params = {
      'pac_id':self.state.id_pac,
      'his_nombre':self.state.enfermedad,
      'his_sintoma':self.state.sintoma,
      'his_fecha':self.state.fecha_alta
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

  //@LLV Inicia el render de los componentes react.
  render: function() {
   //console.log('# DetalleMedicamentoAlta->render #');
    var listaDetallesDivDashboard = (<div></div>);
    var self = this;
    var CLASS_HIDDEN = 'componentHide';
    var CLASS_SHOW = 'componentShow';
    var className = '';
    className = (self.state.show == true ? CLASS_SHOW : CLASS_HIDDEN);

    return (
      <div className={className}>
          <div className='fondoShow' style={{zIndex: this.state.zindex-1}}>&nbsp;</div>
          <div className={'panel panel-default popUpClassReporte'} style={{zIndex: this.state.zindex-1}}>
          <div className='panel-heading'>
            {this.getText('MSG_4013')}
          </div>

              <div className='panel-body'>
                  <div style={{width: '100%', paddingLeft:'10%', paddingRight:'20%' }} className='panelForm'>

                     <div style={{width: '100%'}} className='row'>
                        <div style={{width: '15%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          *{this.getText('MSG_4014')}
                        </div>
                        <div style={{width: '80%'}} className='left_align'>
                            <textarea  rows='3' cols='20'  className='form-control' placeholder={this.getText('MSG_4014')} value={this.state.enfermedad}
                            onChange={this.onChangeEnfermedad}> here</textarea>
                        </div>
                     </div>
                     <br/>

                     <div style={{width: '100%'}} className='row'>
                        <div style={{width: '15%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          *{this.getText('MSG_4015')}
                        </div>
                        <div style={{width: '80%'}} className='left_align'>
                           <textarea  rows='3' cols='20'  className='form-control' placeholder={this.getText('MSG_4015')} value={this.state.sintoma}
                            onChange={this.onChangeSintoma}> here</textarea>
                        </div>
                     </div>

                      <br/>
                     <div style={{width: '100%'}} className='row'>
                        <div style={{width: '20%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          *{this.getText('MSG_3018')}:
                        </div>
                        <div style={{width: '58%'}} className='left_align'>
                          <DatePickerReact inputLabel='' onDatePicked={this.onDatePicked} />
                        </div>
                     </div>

                     <br/>
                     <div style={{width: '100%'}} className='row'>
                        <div style={{width: '30%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          {this.getText('MSG_4016')}
                        </div>
                         <div style={{width: '60%'}} className='left_align'>
                            <div style={{width: '10%'}} className='left_align'>
                                    <span style={{marginRight: '10%'}}>
                                         <button type='button' className='btn btn-default adjuntarDocumento'  title={this.getText('MSG_205')} style={{float: 'right'}} onClick=''/>
                                    </span>
                            </div>
                         </div>
                     </div>
                     <br/>

                  </div>
                  <div className='panel-footer button-align-right'>
                  <div className='input-group' style={{align: 'center'}}>
                     <div className="btn-group btn-group-justified" role="group" aria-label="...">
                       <div className="btn-group" role="group">
                           <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_3020')} onClick={this.onClickBack.bind(this,this.state.pacienteDto)} />
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

module.exports = HistorialPaciente;
