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
    MSG_109: 'El nombre comercial del medicamento es requerido, favor de llenarlo.'
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
    MSG_109: 'The trade name of the drug is required , please fill.'
  }
};

module.exports = Diccionario;
