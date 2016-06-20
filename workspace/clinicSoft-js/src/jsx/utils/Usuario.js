'use strict';

var Usuario = function() {
  var user = {
    idUser: undefined,
    name: undefined,
    jws: undefined,
    isValidJws: false
  };

  return {
    setJws: function(jws) {
      user.jws = jws;
      user.isValidJws = true;
    },
    getJws: function() {
      return user.jws;
    },
    setIdUser: function(idUser) {
      user.idUser = idUser;
    },
    getIdUser: function() {
      return user.idUser;
    },
    setName: function(name) {
      user.name = name;
    },
    getName: function() {
      return user.name;
    },
    isValidJws: function() {
      if(user != undefined && user.jws != undefined && user.jws.trim() != '') {
        user.isValidJws = true;

      } else {
        user.isValidJws = false;
      }

      return user.isValidJws;
    }
  };
};

module.exports = Usuario;
