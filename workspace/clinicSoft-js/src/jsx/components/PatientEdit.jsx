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

var DetallePaciente = require('./DetallePacienteEdit.jsx');

var EditarHistorialPaciente = require('./EditarHistorialPaciente.jsx');

//components
var DatePickerReact = require('./DatePickerReact.jsx');

//@LLV Inicio de la clase PatientNew.
var PatientEdit = React.createClass({
  mixins: [LanguageMixin(),AlertMixin()],
  getDefaultProps: function() {
    //console.log('# PatientNew->getDefaultProps #');
    return {
      zindex: 2
    };
  },
  getInitialState: function() {
    //console.log('# PatientEdit->getInitialState #');
    return {
      componentKey: 'PatientEdit',
      language: window.language,
      show: false,
      zindex: this.props.zindex,
      maleSelected: true,
      femaleSelected: false,
      activoSelected: true,
      inactivoSelected: false,
      paciente:'',
      userList: [],
      lista_pacientes: [],
      index:0,
      id_pac:'',
      usu_id:'',
      nombre: '',
      nombre_original:'',
      paterno: '',
      materno:'',
      fechan:'',
      fechar:'',
      sexo:'M',
      ban:true,
      ban_nombre:0,
      detalle:'',
      datePicked:'',
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
  onClickDetallePaciente: function(index,evt) {
    var self = this;
    var lista_pacientes=self.state.lista_pacientes;
    var detalle= lista_pacientes[index];
    console.log('Valor que se envia en direccion');
    console.log(detalle.pac_direccion);

    var onSuccess = function(response) {
      console.log('# success  #');
    };
    //Oculto el popup de PatientEdit
    self.hide();
    //Muestro el popup de DetallePaciente
    self.refs.detallePaciente.show(self.state.nombre_original,self.state.paciente,detalle);
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
    this.refs.editaHistorial.show(self.state.nombre_original,self.state.paciente,self.state.pacienteDto,id_pac);
     self.setState({
       ban: false
     });
  },

  onChangeSex: function(index) {
    var lista_pacientes=this.state.lista_pacientes;
    var detalle= lista_pacientes[index];
    var sexo=detalle.pac_sexo;
    if(sexo=='M'){
          this.state.maleSelected=true;
          this.state.femaleSelected=false;
          this.state.lista_pacientes=lista_pacientes;
    }
    if(sexo=='F'){
          this.state.maleSelected=false;
          this.state.femaleSelected=true;
          this.state.lista_pacientes=lista_pacientes;
    }
  },


  onChangeNombre: function(index,evt) {
    var lista_pacientes=this.state.lista_pacientes;
    var detalle= lista_pacientes[index];
    detalle.pac_nombre=evt.target.value;
    this.setState({
      lista_pacientes: lista_pacientes,
    });
  },

  onChangePaterno: function(index,evt) {
    var lista_pacientes=this.state.lista_pacientes;
    var detalle= lista_pacientes[index];
    detalle.pac_paterno=evt.target.value;
    this.setState({
      lista_pacientes: lista_pacientes
    });
  },
  onChangeMaterno: function(index,evt) {
    var lista_pacientes=this.state.lista_pacientes;
    var detalle= lista_pacientes[index];
    detalle.pac_materno=evt.target.value
    this.setState({
      lista_pacientes: lista_pacientes
    });
  },
  onChangeEstado: function(evt) {
    this.setState({
      estado: evt.target.value
    });
  },

  show: function(nombre_original,paciente,pacienteDto) {
    //aqui limpiar componente
    var self = this;
    console.log('#Lo que llega PAC_ID#');
    console.log(paciente.pac_id);
    console.log('#Lo que llega NOMBRE#');
    console.log(paciente.pac_nombre);

    console.log("Lo que llega de direccion");
    console.log(pacienteDto.paci_direccion);

    var onSuccess = function(response) {
        self.setState({
          show: true,
          pacienteDto:pacienteDto,
          lista_pacientes: response.payload,
          paciente:paciente,
          nombre_original:paciente.pac_nombre,
          id_pac:paciente.pac_id
        });
    };
    var params = {
        'pac_id': paciente.pac_id
    };
    pacienteService.buscaDatosPaciente(params, onSuccess, this.onError, this.onFail);
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
      maleSelected:'',
      femaleSelected:'',
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
      usu_id:0,
      pac_id:''
    });
  },

  //@LLV Método para vlaidar los campos obligatorios en el formulario.
  validaFormulario: function() {
    var self = this;
    var response = {
      isError: false,
      message: ''
    };
   if(self.state.lista_pacientes.length > 0) {
      var rows_detalles = self.state.lista_pacientes.map(function(auxDetalle) {
        console.log(auxDetalle.pac_nombre);
        if(validaService.isEmpty(auxDetalle.pac_nombre)) {
           return {isError: true, message: self.getText('MSG_4005')};
        }
        if(validaService.isEmpty(auxDetalle.pac_apellido_paterno)) {
           return {isError: true, message: self.getText('MSG_4006')};
        }
        if(validaService.isEmpty(auxDetalle.pac_apellido_materno)) {
           return {isError: true, message: self.getText('MSG_4007')};
        }
        if(self.state.usu_id == 0) {
           return {isError: true, message: this.getText('MSG_2006')};
        }
    });
    }
    return response;
  },

  //@LLV Método para mensaje de paciente esxistente.
  validaExiste: function() {
    var self = this;
    var res = {isError: true, message: self.getText('MSG_110')};
    return res;
  },

  onClickMale: function(index,evt) {
      var lista_pacientes=this.state.lista_pacientes;
      var detalle= lista_pacientes[index];
      detalle.pac_sexo=evt.target.value;
      console.log('#entra masculino#');
      console.log(detalle.pac_sexo);
      this.setState({
          maleSelected: true,
          femaleSelected: false,
          lista_pacientes: lista_pacientes
      });
  },
  onClickFemale: function(index,evt) {
      var lista_pacientes=this.state.lista_pacientes;
      var detalle= lista_pacientes[index];
      detalle.pac_sexo=evt.target.value;
      console.log('#entra femenino#');
      console.log(detalle.pac_sexo);
      this.setState({
          maleSelected: false,
          femaleSelected: true,
          lista_pacientes: lista_pacientes
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
  onChangeUserIdSelected: function(index,evt) {
    var lista_pacientes=this.state.lista_pacientes;
    var detalle= lista_pacientes[index];
    detalle.usu_id=evt.target.value;
    this.setState({
      lista_pacientes:lista_pacientes
    });
  },
  onFechanPicked: function(datePicked, evt) {
    var lista_pacientes=this.state.lista_pacientes;
    var detalle= lista_pacientes[index];
    detalle.pac_fechan=evt.target.value

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
    console.log('#FECHA DE NACIEMINETO#');
    this.setState({
      lista_pacientes: fecha
    });
  },
  onDatePickedDos: function(datePicked, evt) {
    console.log('datePicked->' + datePicked);
    var lista_pacientes=this.state.lista_pacientes;
    var detalle= lista_pacientes[index];
    detalle.pac_fechar=evt.target.value
    this.setState({
      lista_pacientes:lista_pacientes
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
  onClickEditar: function(evt) {
    var self = this;
    var rows_datos=[];
    var nombre='';
    var paterno='';
    var materno='';
    var usu_id='';
    var fechan='';
    var fechar='';
    var sex='';
    var direccion='';
    var telefono='';
    var correo='';
    var ocupacion='';
    var tipo='';
    var foto='';
    var estado='';
    var pac_id=0;
    var ban_nombre=self.state.nombre_original;

    rows_datos = self.state.lista_pacientes.map(function(objPaciente,index) {
        pac_id=objPaciente.pac_id;
        nombre=objPaciente.pac_nombre;
        console.log('LO QUE SE RECUPERA DE LA LISTA');
        console.log(objPaciente.pac_nombre);
        paterno=objPaciente.pac_paterno;
        materno=objPaciente.pac_materno;
        usu_id=objPaciente.usu_id;
        fechan=objPaciente.pac_fechan
        fechar=objPaciente.pac_fechar;
        sex=objPaciente.pac_sexo;
        direccion=self.state.pacienteDto.paci_direccion;
        telefono=self.state.pacienteDto.paci_telefono;
        correo=self.state.pacienteDto.paci_correo;
        ocupacion=self.state.pacienteDto.paci_ocupacion;
        tipo=self.state.pacienteDto.paci_tipo;
        foto=self.state.pacienteDto.paci_foto;
        estado='A';
    });

    var onSuccess = function(response) {
        console.log('# success  #');
        var id_paciente=response.payload;
        console.log(id_paciente);

        if(id_paciente.length > 0 && ban_nombre!=nombre) {
            var res = self.validaExiste();
            self.showInfo(res.message, {zindex: 4});
        } else{
            var params = {
              'pac_id':pac_id,
              'usu_id': usu_id,
              'pac_nombre': nombre,
              'pac_apellido_paterno': paterno,
              'pac_apellido_materno': materno,
              'pac_fechan':fechan,
              'pac_fechar':fechar,
              'pac_sexo': sex,
              'pac_domicilio': direccion,
              'pac_celular': telefono,
              'pac_correo': correo,
              'pac_ocupac': ocupacion,
              'pac_tipo': tipo,
              'pac_foto': foto,
              'pac_estado': estado
            };
            swal({title: 'Confirmar Edición?',
               text: 'Desea Continuar Con La Edición Del Paciente!',
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
                         pacienteService.updatePaciente(params, onSuc, self.onError, self.onFail),
                         swal('Aceptar!','Paciente Editado Con Exito.','success');
                         self.setState({
                            ban: false
                         });
                     }else {
                        swal('Cancelar', 'La Edición Del Paciente Fue Cancelado.', 'error');
                     }
                   });
        }
    };

    var response = self.validaFormulario();
    console.log('#Valores de entrada metodo existe#');
    console.log(ban_nombre,nombre,paterno,materno);
    console.log('#Entra a validar#');
        if(!response.isError) {
            var params = {
              'nombre': nombre,
              'paterno': paterno,
              'materno': materno,
            };
            pacienteService.existePaciente(params, onSuccess, self.onError, self.onFail);
        } else {
          self.showInfo(response.message, {zindex: 4});
    }

  },

  //Función principal que renderiza los componentes.
  render: function() {
    //console.log('# PatientEdit->render #');
    var self = this;
    var CLASS_HIDDEN = 'componentHide';
    var CLASS_SHOW = 'componentShow';
    var className = '';
    var usersListOptions = [];
    var rows_datos=[];
    className = (this.state.show == true ? CLASS_SHOW : CLASS_HIDDEN);

    if(this.state.userList != undefined && this.state.userList.length > 0) {
      usersListOptions = this.state.userList.map(function(user, index) {
        return (<option key={('user_option_' + index)} value={user.usu_id}>{user.usu_login}</option>);
      });

    }


      rows_datos = self.state.lista_pacientes.map(function(objPaciente,index) {
         self.onChangeSex(index);
          return (
           <table style={{width: '100%', textAlign: 'right', paddingRight: '10px'}}>
           <tr><td>
            <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{self.getText('MSG_500')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={self.getText('MSG_500')} value={objPaciente.pac_nombre}
                    onChange={self.onChangeNombre.bind(self,index)}/>
                </div>
            </div>
            </td></tr>

            <tr><td>
            <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{self.getText('MSG_501')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={self.getText('MSG_501')} value={objPaciente.pac_paterno}
                    onChange={self.onChangePaterno.bind(self,index)}/>
                </div>
            </div>
            </td></tr>

            <tr><td>

            <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{self.getText('MSG_502')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <input type='text' className='form-control' placeholder={self.getText('MSG_502')} value={objPaciente.pac_materno}
                    onChange={self.onChangeMaterno.bind(self,index)}/>
                </div>
            </div>
            </td></tr>
            <tr><td>

            <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{self.getText('MSG_506')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                     <DatePickerReact  datePicked={objPaciente.pac_fechan} onDatePicked={self.onDatePickedUno} />
                </div>
            </div>

            </td></tr>
            <tr><td>

            <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  *{self.getText('MSG_516')}:
                </div>
                <div style={{width: '58%'}} className='left_align'>
                  <DatePickerReact datePicked={objPaciente.pac_fechar} onDatePicked={self.onDatePickedDos} />
                </div>
            </div>
            </td></tr>

               <tr><td>
                  <div style={{width: '100%'}} className='row'>
                    <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                      {self.getText('MSG_511')}:
                    </div>
                    <div style={{width: '25%'}} className='left_align'>
                      <div style={{width: '50%'}} className='left_align'>
                        <span style={{marginRight: '10%'}}>
                          <input type='radio' value='M' checked={self.state.maleSelected} onChange={self.onClickMale.bind(self,index)}/>
                        </span>
                        <span>
                          {self.getText('MSG_512')}
                        </span>
                      </div>
                      <div style={{width: '50%'}} className='left_align'>
                        <span style={{marginRight: '10%'}}>
                          <input type='radio' value='F' checked={self.state.femaleSelected}  onChange={self.onClickFemale.bind(self,index)}/>
                        </span>
                        <span>
                          {self.getText('MSG_513')}
                        </span>
                      </div>
                    </div>
                  </div>
               </td></tr>

               <tr><td>
                    <div style={{width: '100%'}} className='row'>
                        <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          *{self.getText('MSG_105')}:
                        </div>
                        <div style={{width: '15%'}} className='left_align'>
                          <select value={objPaciente.usu_id} onChange={self.onChangeUserIdSelected.bind(self,index)}>
                            <option value='0'>{self.getText('MSG_207')}</option>
                            {usersListOptions}
                          </select>
                        </div>
                    </div>

               </td></tr>

               <tr><td>
                 <div style={{width: '100%'}} className='row'>
                <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                  {self.getText('MSG_4002')}:
                </div>
                 <div style={{width: '58%'}} className='left_align'>
                    <div style={{width: '10%'}} className='left_align'>
                            <span style={{marginRight: '10%'}}>
                                 <button type='button' className='btn btn-default detallePaciente'  title={self.getText('MSG_205')} style={{float: 'right'}} onClick={self.onClickDetallePaciente.bind(self,index)}/>
                            </span>
                    </div>
                 </div>
              </div>

              </td></tr>

            </table>
        );

      });


    return (
    <div>
      <DetallePaciente ref='detallePaciente' papa={self}/>
       <EditarHistorialPaciente ref='editaHistorial' papa={self}/>
      <div className={className}>
        <div className='fondoShow' style={{zIndex: this.state.zindex-1}}>&nbsp;</div>
        <div className={'panel panel-default popUpClassPaciente'} style={{zIndex: this.state.zindex-1}}>
          <div className='panel-heading'>
             {this.getText('MSG_4012')}
          </div>
          <div className='panel-body'>
            <div style={{width: '80%'}} className='panelForm'>
              {rows_datos}

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
                   <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value={this.getText('MSG_206')}  onClick={this.onClickEditar}/>
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

module.exports = PatientEdit;
