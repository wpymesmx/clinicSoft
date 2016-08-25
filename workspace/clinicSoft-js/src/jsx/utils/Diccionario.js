'use strict';

/**
* caracteres con acento:
* a 00E1
* e 00E9
* o 00F3
* u 00FA
* n 00F1
* No olvidar substituir los caracteres especiales por unicodigo
**/
var Diccionario = {
  ES: {
    MSG_100: 'ESPAÑOL',
    MSG_101: 'Aceptar',
    MSG_102: 'Cancelar',
    MSG_103: 'No se ha podido acceder al servidor, por favor de revizar su conex\u00F3n a internet.',
    MSG_104: 'Olvidaste tu contrase\u00F1a',
    MSG_105: 'Usuario',
    MSG_106: 'Contrase\u00F1a',
    MSG_107: 'Ingresar',
    MSG_108: 'Usuario o contrase\u00F1a son incorrectos, favor de verificarlos.',
    MSG_109: 'El nombre comercial del medicamento es requerido, favor de llenarlo.',
    MSG_110: 'El nombre comercial del medicamento ya se encuentra registrado.',
    MSG_200: 'Editar',
    MSG_201: 'Detalle',
    MSG_202: 'ACTIVO',
    MSG_203: 'INACTIVO',
    MSG_204: 'Buscar',
    MSG_205: 'Nuevo',
    MSG_206: 'Guardar',
    MSG_207: 'Seleccione una opci\u00F3n',
    //generales de negocio
    MSG_500: 'Nombre',
    MSG_501: 'Apellido paterno',
    MSG_502: 'Apellido materno',
    MSG_503: 'Correo electr\u00F3nico',
    MSG_504: 'Estatus',
    MSG_505: 'Cedula',
    MSG_506: 'Fecha de nacimiento',
    MSG_507: 'Tel\u00E9fono',
    MSG_508: 'Horario',
    MSG_509: 'Matutino',
    MSG_510: 'Vespertino',
    MSG_511: 'Sexo',
    MSG_512: 'Masculino',
    MSG_513: 'Femenino',
    //mensajes para manejo de personal
    MSG_1000: 'Gestion de personal',
    MSG_1001: 'Agregar nuevo personal',
    MSG_1002: 'Editar personal',
    MSG_1003: 'El personal se guardo correctamente',
    //mensajes para manejo de errores
    MSG_2001: 'El nombre del personal es obligatorio.',
    MSG_2002: 'El apellido paterno del personal es obligatorio.',
    MSG_2003: 'El apellido materno del personal es obligatorio.',
    MSG_2004: 'El n\u00FAmero de tel\u00E9fono es obligatorio.',
    MSG_2005: 'El correo electr\u00F3nico es obligatorio.',
    MSG_2006: 'Es obligatorio seleccionar un usuario para el personal.'
  },
  EN: {
    MSG_100: 'English',
    MSG_101: 'Accept',
    MSG_102: 'Cancel',
    MSG_103: 'There is no access to server, pleace check your internet connection.',
    MSG_104: 'Forgot my password',
    MSG_105: 'User',
    MSG_106: 'Password',
    MSG_107: 'Sign in',
    MSG_108: 'User or password is incorrect, plece check it.',
    MSG_109: 'The trade name of the drug is required, please fill.',
    MSG_110: 'The trade name of the drug is register.',
    MSG_200: 'Edit',
    MSG_201: 'Detail',
    MSG_202: 'ACTIVE',
    MSG_203: 'INACTIVE',
    MSG_204: 'Serch',
    MSG_205: 'New',
    MSG_206: 'Save',
    MSG_207: 'Select an option',
    //generales de negocio
    MSG_500: 'Name',
    MSG_501: 'First name',
    MSG_502: 'Last name',
    MSG_503: 'Email',
    MSG_504: 'Status',
    MSG_505: 'Professional license',
    MSG_506: 'Birth date',
    MSG_507: 'Phone number',
    MSG_508: 'Schedule',
    MSG_509: 'Morning',
    MSG_510: 'Evening',
    MSG_511: 'Sex',
    MSG_512: 'Male',
    MSG_513: 'Female',
    //mensajes para manejo de personal
    MSG_1000: 'Personal administration',
    MSG_1001: 'Add new personal',
    MSG_1002: 'Edit personal',
    MSG_1003: 'Personal was saved successfully',
    //mensajes para manejo de errores
    MSG_2001: 'Personal name is required.',
    MSG_2002: 'Personal first name is required.',
    MSG_2003: 'Personal last name is required.',
    MSG_2004: 'Phone number is required.',
    MSG_2005: 'Email is required.',
    MSG_2006: 'User is required.'
  }
};

module.exports = Diccionario;
