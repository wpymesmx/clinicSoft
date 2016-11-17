/**
* __title__ = 'Alta de paciente.'
* __author__ = '@LLV'
* __date__ = '22/09/2016'
*/

'use strict';
var React = require('react');
//mixins
var LanguageMixin = require('../mixins/LanguageMixin.js');
//utils
var Constants = require('../utils/Constants.js');
//components
/**
* componente utilizado para la gestion de alta de pacientes
*/

//sweetalert for pupup
var swal=require('sweetalert');

//servicios
var pacienteService = require('../services/PacienteService.js');
var userService = require('../services/UserService.js');
//Importo valida service
var validaService = require('../utils/ValidaService.js');

//importamos para vetanas de errores o información
var AlertMixin = require('../mixins/AlertMixin.js');

var DetallePaciente = require('./DetallePaciente.jsx');

var HistorialPaciente = require('./HistorialPaciente.jsx');

//components
var DatePickerReact = require('./DatePickerReact.jsx');

//@LLV Inicio de la clase PatientNew.
var PatientNew = React.createClass({
  mixins: [LanguageMixin(),AlertMixin()],
  getDefaultProps: function() {
    //console.log('# PatientNew->getDefaultProps #');
    return {
      zindex: 2
    };
  },
  getInitialState: function() {
    //console.log('# MedicamentoAlta->getInitialState #');
    return {
      componentKey: 'PatientNew',
      language: window.language,
      show: false,
      zindex: this.props.zindex,
      maleSelected: true,
      femaleSelected: false,
      activoSelected: true,
      inactivoSelected: false,
      userList: [],
      id_pac:'',
      usu_id:'',
      nombre: '',
      paterno: '',
      materno:'',
      fechan:'',
      fechar:'',
      sexo:'F',
      direccion:'',
      telefono:'',
      correo:'',
      ocupacion:'',
      tipo:'',
      foto:'',
      estado:'A',
      ban:true,
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
    //console.log('# MedicamentoAlta->componentWillMount #');
    this.subscribeLanguage(this.state.componentKey, this.changeSessionLanguage);
  },
  componentDidMount: function() {
    //console.log('# MedicamentoAlta->componentDidMount #');
    var self = this;
    var onSuccess = function(response) {
      self.setState({
        userList: response.payload
      });
    };
    var params = {};
    userService.getAllUsers(params, onSuccess, this.onError, this.onFail);
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
  //@LLV Método que muestra la siguiente ventana.
  onClickSiguiente: function(id_med,evt) {
    var self = this;
    console.log('#id_med que enviara a la ventana de detalles.#');
    console.log(id_med);
    var onSuccess = function(response) {
      console.log('# success  #');
    };
    //Oculto el popup de MedicamentoAlta
    this.hide();
    //Muestro el popup de DetalleMedicamentoAlta
    this.refs.detallePaciente.show();
     self.setState({
       ban: false
     });
  },
  //@LLV Método que muestra la siguiente ventana.
  onClickHistorial: function(id_pac,evt) {
    var self = this;
    console.log('#id_med que enviara a la ventana de historial.#');
    console.log(id_pac);
    var onSuccess = function(response) {
      console.log('# success  #');
    };
    //Oculto el popup de PatientNew
    this.hide();
    //Muestro el popup de HistrialPaciente
    this.refs.historialPaciente.show(id_pac);
     self.setState({
       ban: false
     });
  },
  onChangeNombre: function(evt) {
    this.setState({
      nombre: evt.target.value
    });
  },
  onChangePaterno: function(evt) {
    this.setState({
      paterno: evt.target.value
    });
  },
  onChangeMaterno: function(evt) {
    this.setState({
      materno: evt.target.value
    });
  },
  onChangeEstado: function(evt) {
    this.setState({
      estado: evt.target.value
    });
  },

  show: function(pacienteDto) {
    //aqui limpiar componente
    this.setState({
      show: true,
      pacienteDto:pacienteDto
    });
    this.onClickGetRealDay();
  },

  hide: function() {
    //aqui limpiar componente
    this.setState({
      show: false
    });
  },

  //@LLV Método que cierra popup y limpia componentes.
  onClickCerrar: function(evt) {
    this.setState({
      show: false,
      ban:true,
      nombre:'',
      paterno:'',
      materno:'',
      fechan:'',
      fechar:'',
      sexo:'M',
      direccion:'',
      telefono:'',
      ocupacion:'',
      tipo:'',
      foto:'',
      estado:'',
      usu_id:''
    });
  },

  //@LLV Método para vlaidar los campos obligatorios en el formulario.
  validaFormulario: function() {
    var response = {
      isError: false,
      message: ''
    };
    if(validaService.isEmpty(this.state.nombre)) {
       var self = this;
       return {isError: true, message: self.getText('MSG_4005')};
    }
    if(validaService.isEmpty(this.state.paterno)) {
       var self = this;
       return {isError: true, message: self.getText('MSG_4006')};
    }
    if(validaService.isEmpty(this.state.materno)) {
       var self = this;
       return {isError: true, message: self.getText('MSG_4007')};
    }
    if(this.state.usu_id == 0) {
      return {isError: true, message: this.getText('MSG_2006')};
    }
    return response;
  },

  //@LLV Método para mensaje de paciente esxistente.
  validaExiste: function() {
    var self = this;
    var res = {isError: true, message: self.getText('MSG_110')};
    return res;
  },
  onClickMale: function(evt) {
    var sexo = this.state.sexo;
    sexo = 'M';
    this.setState({
      maleSelected: true,
      femaleSelected: false,
      sexo: sexo
    });
  },
  onClickFemale: function(evt) {
    var sexo = this.state.sexo;
    sexo = 'F';
    this.setState({
      maleSelected: false,
      femaleSelected: true,
      sexo: sexo
    });
  },
  onClickActivo: function(evt) {
    var estado = this.state.estado;

    estado = 'A';
    this.setState({
      activoSelected: true,
      inactivoSelected: false,
      estado: estado
    });
  },
  onClickInactivo: function(evt) {
    var estado = this.state.estado;

    estado = 'I';
    this.setState({
      activoSelected: false,
      inactivoSelected: true,
      estado: estado
    });
  },
  onChangeUserIdSelected: function(evt) {
    var usu_id = this.state.usu_id;

    usu_id = evt.target.value;
    this.setState({
      usu_id: usu_id
    });
  },
  onFechanPicked: function(datePicked, evt) {
    console.log('onFechanPicked->' + datePicked);
    var auxFechaN= (datePicked.getFullYear() + '-' + (datePicked.getMonth()+1) + '-' + datePicked.getDate());
    var fecha = new Date(auxFechaN);
    var dd = datePicked.getDate();
    var mm = datePicked.getMonth()+1;
    var yyyy = datePicked.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }
    var fecha = yyyy+'-'+mm+'-'+dd;
    this.setState({
      fechan: fecha
    });


  },
  onDatePickedDos: function(datePicked, evt) {
    console.log('datePicked->' + datePicked);
    console.log('Lo que lleva fecha actual');

    this.setState({
      fechar: (datePicked.getDate() + '/' + (datePicked.getMonth()+1) + '/' + datePicked.getFullYear())
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
       fechar: today
    });
  },

  //@LLV Método utilizado para relaizar un insert a BD.
  onClickGuardar: function(evt) {
    var self = this;
    var onSuccess = function(response) {
        console.log('# success  #');
        var id_paciente=response.payload;
        console.log(id_paciente);
        var res = self.validaExiste();
        console.log('Valores que lleva fecha nac, fecha reg');
        console.log(self.state.fechan,  self.state.fechar);
        console.log('#Lo que lleva ocupacion#');
        console.log(self.state.pacienteDto.paci_ocupacion);
        if(id_paciente.length > 0) {
           self.showInfo(res.message, {zindex: 4});
        } else{
            var params = {
              'usu_id': self.state.usu_id,
              'pac_nombre': self.state.nombre,
              'pac_apellido_paterno': self.state.paterno,
              'pac_apellido_materno': self.state.materno,
              'pac_fechan':self.state.fechan,
              'pac_fechar': self.state.fechar,
              'pac_sexo': self.state.sexo,
              'pac_domicilio': self.state.pacienteDto.paci_direccion,
              'pac_celular': self.state.pacienteDto.paci_telefono,
              'pac_correo': self.state.pacienteDto.paci_correo,
              'pac_ocupac': self.state.pacienteDto.paci_ocupacion,
              'pac_tipo': self.state.pacienteDto.paci_tipo,
              'pac_foto': self.state.pacienteDto.paci_foto,
              'estado': self.state.estado
            };
            swal({title: 'Confirmar Registro?',
               text: 'Desea Continuar Con El Registro Del Paciente!',
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
                           var id=res.payload;
                            self.setState({
                                id_pac: id
                            });
                            console.log('#Recupera el numero de PAC_ID insertado#');
                            console.log(self.state.id_pac);
                            console.log(id);
                         };
                         pacienteService.insertPaciente(params, onSuc, self.onError, self.onFail),
                         swal('Aceptar!','Paciente Registrado Con Exito.','success');
                         self.setState({
                            ban: false
                         });
                     }else {
                        swal('Cancelar', 'El Registro Del Paciente Fue Cancelado.', 'error');
                     }
                   });
        }
    };
    var response = this.validaFormulario();
    if(!response.isError) {
        var params = {
          'nombre': this.state.nombre,
          'paterno': this.state.paterno,
          'materno': this.state.materno,
        };
        pacienteService.existePaciente(params, onSuccess, this.onError, this.onFail);
    } else {
      self.showInfo(response.message, {zindex: 4});
    }
  },

  //Función principal que renderiza los componentes.
  render: function() {
    //console.log('# PatientNew->render #');
    var self = this;
    var CLASS_HIDDEN = 'componentHide';
    var CLASS_SHOW = 'componentShow';
    var className = '';
    var usersListOptions = [];
    className = (this.state.show == true ? CLASS_SHOW : CLASS_HIDDEN);

    if(this.state.userList != undefined && this.state.userList.length > 0) {
      usersListOptions = this.state.userList.map(function(user, index) {
        return (<option key={('user_option_' + index)} value={user.usu_id}>{user.usu_login}</option>);
      });
    }

    return (
    <div>
      <DetallePaciente ref='detallePaciente' papa={self}/>
      <HistorialPaciente ref='historialPaciente' papa={self}/>
      <div className={className}>
        <div className='fondoShow' style={{zIndex: this.state.zindex-1}}>&nbsp;</div>
        <div className={'panel panel-default popUpClassPaciente'} style={{zIndex: this.state.zindex-1}}>
          <div className='panel-heading'>
             {this.getText('MSG_4001')}
          </div>
          <div className='panel-body'>


            <div style={{width: '80%'}} className='panelForm'>
                  <div style={{width: '100%'}} className='row'>
                    <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                      *{this.getText('MSG_500')}:
                    </div>
                    <div style={{width: '58%'}} className='left_align'>
                      <input type='text' className='form-control' placeholder={this.getText('MSG_500')} value={this.state.nombre}
                        onChange={this.onChangeNombre}/>
                    </div>
                  </div>

                  <div style={{width: '100%'}} className='row'>
                    <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                      *{this.getText('MSG_501')}:
                    </div>
                    <div style={{width: '58%'}} className='left_align'>
                      <input type='text' className='form-control' placeholder={this.getText('MSG_501')} value={this.state.paterno}
                        onChange={this.onChangePaterno}/>
                    </div>
                  </div>

                  <div style={{width: '100%'}} className='row'>
                    <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                      *{this.getText('MSG_502')}:
                    </div>
                    <div style={{width: '58%'}} className='left_align'>
                      <input type='text' className='form-control' placeholder={this.getText('MSG_502')} value={this.state.materno}
                        onChange={this.onChangeMaterno}/>
                    </div>
                  </div>

                  {/*Fecha Nacimiento*/}
                  <div style={{width: '100%'}} className='row'>
                    <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                      *{this.getText('MSG_506')}:
                    </div>
                    <div style={{width: '58%'}} className='left_align'>
                      <DatePickerReact   onDatePicked={this.onFechanPicked}/>
                    </div>
                  </div>

                  {/*Fecha Registro*/}
                  <div style={{width: '100%'}} className='row'>
                    <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                      *{this.getText('MSG_516')}:
                    </div>
                    <div style={{width: '58%'}} className='left_align'>
                      <DatePickerReact   onDatePicked={this.onDatePickedDos} />
                    </div>
                   </div>

                  {/*Sexo*/}
                  <div style={{width: '100%'}} className='row'>
                    <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                      {this.getText('MSG_511')}:
                    </div>
                    <div style={{width: '58%'}} className='left_align'>
                      <div style={{width: '50%'}} className='left_align'>
                        <span style={{marginRight: '10%'}}>
                          <input type='radio' value='M' checked={this.state.maleSelected} onChange={this.onClickMale}/>
                        </span>
                        <span>
                          {this.getText('MSG_512')}
                        </span>
                      </div>
                      <div style={{width: '50%'}} className='left_align'>
                        <span style={{marginRight: '10%'}}>
                          <input type='radio' value='F' checked={this.state.femaleSelected}  onChange={this.onClickFemale}/>
                        </span>
                        <span>
                          {this.getText('MSG_513')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{width: '100%'}} className='row'>
                    <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                      *{this.getText('MSG_105')}:
                    </div>
                    <div style={{width: '58%'}} className='left_align'>
                      <select value={this.state.usu_id} onChange={this.onChangeUserIdSelected}>
                        <option value='0'>{this.getText('MSG_207')}</option>
                        {usersListOptions}
                      </select>
                    </div>
                  </div>

                  <div style={{width: '100%'}} className='row'>
                    <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                      {this.getText('MSG_4002')}:
                    </div>
                     <div style={{width: '58%'}} className='left_align'>
                        <div style={{width: '10%'}} className='left_align'>
                                <span style={{marginRight: '10%'}}>
                                     <button type='button' className='btn btn-default detallePaciente'  title={this.getText('MSG_205')} style={{float: 'right'}} onClick={this.onClickSiguiente}/>
                                </span>
                        </div>
                     </div>
                  </div>

                  <div style={{width: '100%'}} className='row'>
                    <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                      {this.getText('MSG_4009')}:
                    </div>
                     <div style={{width: '58%'}} className='left_align'>
                        <div style={{width: '10%'}} className='left_align'>
                                <span style={{marginRight: '10%'}}>
                                     <button type='button' className='btn btn-default historialPaciente'  title={this.getText('MSG_205')} style={{float: 'right'}} onClick={this.onClickHistorial.bind(this,this.state.id_pac)}/>
                                </span>
                        </div>
                     </div>
                  </div>

                  <div style={{width: '100%'}} className='row'>
                    <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                      {this.getText('MSG_4010')}:
                    </div>
                     <div style={{width: '58%'}} className='left_align'>
                        <div style={{width: '10%'}} className='left_align'>
                                <span style={{marginRight: '10%'}}>
                                     <button type='button' className='btn btn-default citasPaciente'  title={this.getText('MSG_205')} style={{float: 'right'}} onClick={this.onClickSiguiente}/>
                                </span>
                        </div>
                     </div>
                  </div>
            </div>
           </div>
                <div className='panel-footer button-align-right'>
                  <div className='input-group' style={{align: 'center'}}>
                     <div className="btn-group btn-group-justified" role="group" aria-label="...">
                       <div className="btn-group" role="group">
                           <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_102')} onClick={this.onClickCerrar} />
                       </div>
                       <div className="btn-group" role="group">
                           <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_206')} onClick={this.onClickGuardar} />
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

module.exports = PatientNew;
