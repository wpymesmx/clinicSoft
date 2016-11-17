'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
//listeners
var NavigatorListener = require('./listeners/NavigatorListener.js');
var AlertListener = require('./listeners/AlertListener.js');
var LanguageListener = require('./listeners/LanguageListener.js');
//components
var App = require('./App.jsx');
//Utilirias de ayuda
var Usuario = require('./utils/Usuario.js');
var Context = require('./utils/Context.js');
var Constants = require('./utils/Constants.js');

window.initApp = function() {
  console.log('# initApp Ver. 1.0 #');
  document.querySelector('body').style.width = window.innerWidth + 'px';
  document.querySelector('body').style.height = window.innerHeight + 'px';
  //establecer el lenguaje por default espaniol
  window.language = Constants.ES;
  ///cargar los listener para procesar mensajes de todos los subscriptores
  window.navigatorListener = NavigatorListener();
  window.alertListener = AlertListener();
  window.languageListener = LanguageListener();
  //configuracion de listeners en el objeto window
  window.addEventListener('resize', function(evt) {
    document.querySelector('body').style.width = window.innerWidth + 'px';
    document.querySelector('body').style.height = window.innerHeight + 'px';
  });
  window.addEventListener('hashchange', function(evt) {
    //console.log('## hashchange ##');
    //console.log('newURL-> ' + evt.newURL);
    //console.log('oldURL-> ' + evt.oldURL);
    //TODO ejecutar proceso de seguridad y page not found
  });
  window.addEventListener('keydown', function(evt) {
    /*console.log('evt.keyCode: ' + evt.keyCode);
    console.log('evt.key: ' + evt.key);
    console.log('evt.charCode: ' + evt.charCode);
    console.log('evt.which: ' + evt.which);
    console.log('evt.currentTarget: ' + evt.currentTarget);
    console.log('evt.target: ' + evt.target);
    console.log('evt.target.type: ' + evt.target.type);
    console.log('evt.target.tagName: ' + evt.target.tagName);*/
    /*for(var prop in evt.target) {
      try {
        console.log('prop: ' + prop + ', value: ' + evt.target[prop]);
      } catch(e) {}
    }*/
    //validar retorno de carro y prevenir que se salga de la aplicacion por error
    if(((evt.target instanceof HTMLBodyElement) || (evt.target instanceof HTMLButtonElement)
      || (evt.target instanceof HTMLSelectElement) || evt.target.tagName == 'SELECT' || evt.target.type == 'button'
      || evt.target.tagName == 'A' || evt.target.tagName == 'BUTTON' || evt.target.type == 'submit' || evt.target.tagName == 'IMG'
      || evt.target.type == 'radio' && evt.keyCode == 8)) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  });
  //funciones generales agregadas al objeto window
  window.resetApp = function() {
    var usuario = Usuario();
    var ctx = Context();
    ctx.put(Constants.USER, usuario);
    window.ctx = ctx;
  };
  //inicializamos nuestro usuario del sistema
  var usuario = Usuario();
  //inicializamos nuestro mapa de contexto del sistema
  //este contexto representa un mapa donde se almacena la informacion que sera compartida entre componentes
  var ctx = Context();
  ctx.put(Constants.USER, usuario);
  window.ctx = ctx;
  //pintamos nuestro componente de la aplicacion en el navegador
  ReactDOM.render(<App />, document.getElementById('app'));
};
