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

//servicios
var validaService = require('../utils/ValidaService.js');

var DetallePaciente = React.createClass({
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
    var pacienteDto = this.state.pacienteDto;
    pacienteDto.paci_foto = fileBase64;
    this.setState({
      pacienteDto: pacienteDto
    });
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


  onChangeDireccion: function(evt) {
    var pacienteDto = this.state.pacienteDto;
    pacienteDto.paci_direccion = evt.target.value;
    this.setState({
      pacienteDto: pacienteDto
    });
  },
  onChangeCorreo: function(evt) {
    var pacienteDto = this.state.pacienteDto;
    pacienteDto.paci_correo = evt.target.value;
    this.setState({
      pacienteDto: pacienteDto
    });
  },
  onChangeOcupacion: function(evt) {
    var pacienteDto = this.state.pacienteDto;
    pacienteDto.paci_ocupacion = evt.target.value;
    this.setState({
      pacienteDto: pacienteDto
    });
  },
  onChangeTelefono: function(evt) {
    var pacienteDto = this.state.pacienteDto;

    if(validaService.isEmpty(evt.target.value) || validaService.isOnlyNumbers(evt.target.value)) {
        pacienteDto.paci_telefono = evt.target.value;
        this.setState({
          pacienteDto: pacienteDto
        });
    }
  },
  onChangeTipo: function(evt) {
    var pacienteDto = this.state.pacienteDto;
    pacienteDto.paci_tipo = evt.target.value;
    this.setState({
      pacienteDto: pacienteDto
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

    return (
      <div className={className}>
          <div className='fondoShow' style={{zIndex: this.state.zindex-1}}>&nbsp;</div>
          <div className={'panel panel-default popUpClassReporte'} style={{zIndex: this.state.zindex-1}}>
          <div className='panel-heading'>
            {this.getText('MSG_4011')}
          </div>

              <div className='panel-body'>
                  <div style={{width: '100%', paddingLeft:'10%', paddingRight:'20%' }} className='panelForm'>

                     <div style={{width: '100%'}} className='row'>
                        <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          {this.getText('MSG_517')}:
                          <img className='btn btn-default homePaciente'/>
                        </div>
                        <div style={{width: '58%'}} className='left_align'>
                          <input type='text' className='form-control' placeholder={this.getText('MSG_517')} value={this.state.pacienteDto.paci_direccion}
                            onChange={this.onChangeDireccion}/>
                        </div>
                     </div>

                     <div style={{width: '100%'}} className='row'>
                        <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          {this.getText('MSG_507')}:
                          <img className='btn btn-default telefonoPaciente'/>
                        </div>
                        <div style={{width: '58%'}} className='left_align'>
                          <input type='text' className='form-control' placeholder={this.getText('MSG_507')} value={this.state.pacienteDto.paci_telefono}
                            onChange={this.onChangeTelefono}/>
                        </div>
                     </div>

                     <div style={{width: '100%'}} className='row'>
                        <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          {this.getText('MSG_503')}:
                           <img className='btn btn-default correoPaciente'/>
                        </div>
                        <div style={{width: '58%'}} className='left_align'>
                          <input type='text' className='form-control' placeholder={this.getText('MSG_503')} value={this.state.pacienteDto.paci_correo}
                            onChange={this.onChangeCorreo}/>
                        </div>
                     </div>

                     <div style={{width: '100%'}} className='row'>
                        <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          {this.getText('MSG_4003')}:
                        </div>
                        <div style={{width: '58%'}} className='left_align'>
                          <input type='text' className='form-control' placeholder={this.getText('MSG_4003')} value={this.state.pacienteDto.paci_ocupacion}
                            onChange={this.onChangeOcupacion}/>
                        </div>
                     </div>

                     <div style={{width: '100%'}} className='row'>
                        <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          {this.getText('MSG_4004')}:
                        </div>
                        <div style={{width: '58%'}} className='left_align'>
                          <input type='text' className='form-control' placeholder={this.getText('MSG_4004')} value={this.state.pacienteDto.paci_tipo}
                            onChange={this.onChangeTipo}/>
                        </div>
                     </div>

                     <br></br>
                     <div style={{width: '100%'}} className='row'>
                            <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                              {this.getText('MSG_3037')}:
                              <img className='btn btn-default fotoPaciente'/>
                            </div>
                            <div style={{width: '58%'}} className='left_align'>
                                <InputFileReact className='form-control' ref='inputFile' extensions={['.png', '.gif', '.jpg']} onFileSelected={this.onFileSelected}/>
                            </div>

                            <div style={{width: '100%', textAlign: 'right', paddingRight: '22%'}} className='left_align'>
                                <div>
                                  <img style={{width: '150px', height: '150px'}} src={this.state.pacienteDto.paci_foto} />
                                </div>
                            </div>
                     </div>



                  </div>
                  <div className='panel-footer button-align-right'>
                  <div className='input-group' style={{align: 'center'}}>
                     <div className="btn-group btn-group-justified" role="group" aria-label="...">
                       <div className="btn-group" role="group">
                          <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_3020')}  onClick={this.onClickBack.bind(this,this.state.pacienteDto)} />
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

module.exports = DetallePaciente;
