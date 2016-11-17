/**
* __title__ = 'Diseño y stylos del sistema.'
* __author__ = '@LLV'
* __date__ = '16/10/2016'
*/

'use strict';
var React = require('react');
//mixins
var NavigatorMixin = require('../mixins/NavigatorMixin.js');
var LanguageMixin = require('../mixins/LanguageMixin.js');
var AlertMixin = require('../mixins/AlertMixin.js');
//utils
var Constants = require('../utils/Constants.js');
//servicios
var pacienteService = require('../services/PacienteService.js');
//sweetalert for pupup
var swal=require('sweetalert');
var DataGridReact = require('./DataGridReact.jsx');
//components
var DatePickerReact = require('./DatePickerReact.jsx');

//componentes de la aplicacion
var PatientNew = require('./PatientNew.jsx');
var PatientEdit = require('./PatientEdit.jsx');

//@LLV Inicia Clase Principal Paciente.
var GraficGuide = React.createClass({
  mixins: [NavigatorMixin(), AlertMixin(), LanguageMixin()],
  getInitialState: function() {
  console.log('Entra clase guia grafica');
    return {
      componentKey: Constants.GUIA_VIEW,
      language: window.language,
      pac_id:'',
      nombre: '',
      paterno: '',
      materno:'',
      fechan:'',
      fechar:'',
      sexo:'',
      domicilio:'',
      celular:'',
      correo:'',
      ocupacion:'',
      tipo:'',
      foto:'',
      estado:'A',
      lista_pacientes: [],
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
    //console.log('# App->componentWillMount #');
    this.subscribeLanguage(this.state.componentKey, this.changeSessionLanguage);
  },

  //@LLV Método donde puedes cambiar el estado una vez que montaste el popup.
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
    //console.log('# App->componentWillUnmount #');
    this.unSubscribeLanguage(this.state.componentKey);
  },


  //@LLV Metodo principal que mostrara todos.
  render: function() {
    //console.log('# App->render #');
    var self = this;

    return (
     <div>
        <div className='panel panel-default'>
          <div className='panel panel-default'>
            <div className=''>Guia grafica</div>
           </div>
           <br/>
          <div className='panel-heading'>Busqueda de informacion</div>
              <div className='panel-body'>
                <div style={{width: '100%'}} className='panelForm'>
                  <div style={{width: '100%'}} className='row'>
                    <div style={{width: '25%'}} className='left_align'>
                      <input type='text' className='form-control' placeholder='' value='' onChange='' />
                    </div>
                    <div style={{width: '25%'}} className='left_align'>
                      <input type='text' className='form-control' placeholder='' value='' onChange='' />
                    </div>
                    <div style={{width: '25%'}} className='left_align'>
                      <input type='text' className='form-control' placeholder='' value='' onChange='' />
                    </div>
                    <div className='group-btn'>
                      <button className='btn btn-default buscarButton' type='button' title='' onClick='' />
                    </div>
                </div>
              </div>
          </div>
        </div>

        <br/><br/>
        <div className='panel panel-default'>
          <div className='panel-heading'>Tabla principal</div>
            <DataGridReact ref='' dataList=''
              headerOptions={[
                {property: '', label: 'Campo uno', placeholder: '', width: '15%',
                  isOrderBy: true, isFilterText: true},
                {property: '', label: 'Campo dos', placeholder: '', width: '15%',
                  isOrderBy: true, isFilterText: true},
                {property: '', label: 'Campo tres', placeholder: '', width: '15%', isOrderBy: true, isFilterText: true},
                {property: '', label: 'Campo cuatro', placeholder: '', width: '15%', isOrderBy: true, isFilterText: true},
                {property: '', label: 'Campo cinco', placeholder: '', width: '15%', isOrderBy: true, isFilterText: true},
                {property: '', label: 'Campo seis', placeholder: '', width: '10%', isOrderBy: true, isFilterText: true},
                {property: '', label: '', width: '7%'}
              ]}
              colOptions={[
                {property: '', width: '15%'},
                {property: '', width: '15%'},
                {property: '', width: '15%'},
                {property: '', width: '15%'},
                {property: '', width: '15%'},
                {property: '', width: '10%'},
                {property: '', width: '15%', textAlign: 'center', catalog:[{id: 'A', value: ''}, {id: 'I', value: ''}]},
                {prortype: '', width: '7%', type: 2, style: '', labelButton: ''}
              ]}/>
        </div>


        <br/><br/>
        <div className='panel-heading'>.</div>
        <div className='panel panel-default'>

                <div style={{width: '100%'}} className='panelForm center_align'>
                      <div className='panel panel-default'>
                         <div className='panel-heading'>Formularios</div>
                      </div>
                      <div style={{width: '75%'}} className='row center_align'>
                        <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          *{this.getText('MSG_500')}:
                        </div>
                        <div style={{width: '58%'}} className='left_align'>
                          <input type='text' className='form-control' placeholder='' value=''
                            onChange=''/>
                        </div>
                      </div>

                      <div style={{width: '75%'}} className='row'>
                        <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          *{this.getText('MSG_501')}:
                        </div>
                        <div style={{width: '58%'}} className='left_align'>
                          <input type='text' className='form-control' placeholder='' value=''
                            onChange=''/>
                        </div>
                      </div>

                      <div style={{width: '75%'}} className='row'>
                        <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          *{this.getText('MSG_502')}:
                        </div>
                        <div style={{width: '58%'}} className='left_align'>
                          <input type='text' className='form-control' placeholder='' value=''
                            onChange=''/>
                        </div>
                      </div>

                      {/*Fecha Nacimiento*/}
                      <div style={{width: '75%'}} className='row'>
                        <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          *{this.getText('MSG_506')}:
                        </div>
                        <div style={{width: '58%'}} className='left_align'>
                          <DatePickerReact   onDatePicked=''/>
                        </div>
                      </div>

                      {/*Fecha Registro*/}
                      <div style={{width: '75%'}} className='row'>
                        <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          *{this.getText('MSG_516')}:
                        </div>
                        <div style={{width: '58%'}} className='left_align'>
                          <DatePickerReact   onDatePicked='' />
                        </div>
                       </div>

                      {/*Sexo*/}
                      <div style={{width: '75%'}} className='row'>
                        <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          {this.getText('MSG_511')}:
                        </div>
                        <div style={{width: '58%'}} className='left_align'>
                          <div style={{width: '50%'}} className='left_align'>
                            <span style={{marginRight: '10%'}}>
                              <input type='radio' value='' checked='' onChange=''/>
                            </span>
                            <span>
                              {this.getText('MSG_512')}
                            </span>
                          </div>
                          <div style={{width: '50%'}} className='left_align'>
                            <span style={{marginRight: '10%'}}>
                              <input type='radio' value='' checked=''  onChange=''/>
                            </span>
                            <span>
                              {this.getText('MSG_513')}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div style={{width: '75%'}} className='row'>
                        <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          *{this.getText('MSG_105')}:
                        </div>
                        <div style={{width: '58%'}} className='left_align'>
                          <select value='' onChange=''>
                            <option value='0'>{this.getText('MSG_207')}</option>

                          </select>
                        </div>
                      </div>

                      <div style={{width: '75%'}} className='row'>
                        <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          {this.getText('MSG_4002')}:
                        </div>
                         <div style={{width: '58%'}} className='left_align'>
                            <div style={{width: '10%'}} className='left_align'>
                                    <span style={{marginRight: '10%'}}>
                                         <button type='button' className='btn btn-default detallePaciente'  title={this.getText('MSG_205')} style={{float: 'right'}} onClick=''/>
                                    </span>
                            </div>
                         </div>
                      </div>

                      <div style={{width: '75%'}} className='row'>
                        <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          {this.getText('MSG_4009')}:
                        </div>
                         <div style={{width: '58%'}} className='left_align'>
                            <div style={{width: '10%'}} className='left_align'>
                                    <span style={{marginRight: '10%'}}>
                                         <button type='button' className='btn btn-default historialPaciente'  title={this.getText('MSG_205')} style={{float: 'right'}} onClick=''/>
                                    </span>
                            </div>
                         </div>
                      </div>

                      <div style={{width: '75%'}} className='row'>
                        <div style={{width: '42%', textAlign: 'right', paddingRight: '10px'}} className='left_align'>
                          {this.getText('MSG_4010')}:
                        </div>
                         <div style={{width: '58%'}} className='left_align'>
                            <div style={{width: '10%'}} className='left_align'>
                                    <span style={{marginRight: '10%'}}>
                                         <button type='button' className='btn btn-default citasPaciente'  title={this.getText('MSG_205')} style={{float: 'right'}} onClick=''/>
                                    </span>
                            </div>
                         </div>
                      </div>

                </div>
        </div>

        <br/><br/>
           <div class="panel panel-default">
               <div class="panel-heading">Estilo de botones</div>
            </div>
             <div className='input-group' style={{align: 'center'}}>
                 <div className="btn-group btn-group-justified" role="group" aria-label="...">
                   <div className="btn-group" role="group">
                       <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value='Guardar' onClick='' />
                   </div>
                   <div className="btn-group" role="group">
                       <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value='Editar' onClick='' />
                   </div>
                   <div className="btn-group" role="group">
                       <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value='Eliminar' onClick='' />
                   </div>
                   <div className="btn-group" role="group">
                       <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value='Buscar' onClick='' />
                   </div>
                   <div className="btn-group" role="group">
                       <input className='btn btn-lg btn-primary btn-block btn-signin' type='button' value='Cancelar' onClick='' />
                   </div>
                </div>
             </div>

        </div>



    );
  }
});
module.exports = GraficGuide;
