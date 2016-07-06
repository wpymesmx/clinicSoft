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

window.addEventListener('resize', function(evt) {
  document.querySelector('body').style.width = window.innerWidth + 'px';
  document.querySelector('body').style.height = window.innerHeight + 'px';
});

window.addEventListener('hashchange', function(evt) {
  console.log('## hashchange ##');
  //console.log('newURL-> ' + evt.newURL);
  //console.log('oldURL-> ' + evt.oldURL);
  //TODO ejecutar proceso de seguridad y page not found
});

window.resetApp = function() {
  var usuario = Usuario();
  var ctx = Context();
  ctx.put(Constants.USER, usuario);
  window.ctx = ctx;
};

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
