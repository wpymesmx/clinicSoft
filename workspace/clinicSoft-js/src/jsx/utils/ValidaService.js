'use strict';

var ValidaService = {
  isEmpty: function(obj, opt) {
    var resp = false;

    if(obj == undefined || (''+obj).trim() == '') {
      resp = true;
    }

    return resp;
  },
	isOnlyNumbers: function(obj, opt) {
    var resp = false;
    var regx = /^\d*$/g;

    if(!this.isEmpty(obj) && regx.test(obj)) {
        resp = true;
    }

    return resp;
  },
  isMaxLength: function(obj, opt) {
    var resp = false;

    if(!this.isEmpty(obj) && obj.length > opt.maxLength) {
        resp = true;
    }

    return resp;
  },
  isDecimal: function(obj, opt) {
    var resp = false;
    // #otra posible validacion  /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/;
    var regx = /^-{0,1}\d*\.{0,1}\d+$/;

    if(!this.isEmpty(obj) && regx.test(obj)) {
        resp = true;
    }

    return resp;
  },
  isHoraMinuto: function(obj, opt) {
    var resp = false;
    //HORA:MINUTO
    //var regx = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    //MINUTO:SEGUNDO
    var regx = /^[0-5][0-9]:[0-5][0-9]$/;

    if(!this.isEmpty(obj) && regx.test(obj)) {
        resp = true;
    }

    return resp;
  },
  isAlfaNumeric: function(obj, opt) {
    var resp = false;
    var regx = /^[0-9A-Za-z\u00f1\u00d1\u00dc\u00fc\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da]+$/;

    if(!this.isEmpty(obj) && regx.test(obj)) {
        resp = true;
    }

    return resp;
  }
};

module.exports = ValidaService;
