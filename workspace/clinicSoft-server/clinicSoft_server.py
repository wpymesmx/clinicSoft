__author__ = 'drunkenturtle'

from flask import Flask
from flask import request
from flask import Response
from flask import redirect
from flask import url_for
import json
import traceback
import re

from Log4py import log4py
from src.filter.security_filter import valida_token
from src.view.login_view import login_view
from src.view.usuario_view import insertar_usuario
from jwt.exceptions import DecodeError
from src.view.medicamento_view import insertar_medicamento
from src.view.medicamento_view import buscar_medicamento
from src.view.medicamento_view import eliminar_medicamento
from src.view.medicamento_view import actualizar_medicamento
from src.view.medicamento_view import llenar_combo_medicamento

#Crear objeto de servidor flask
app = Flask(__name__)

@app.before_request
def do_before_request():
  """
    funcion que se ejecuta antes de cada peticion o request
    utilizada para ejecutar filtros de validacion o seguridad
    si se regresa un response ya no se ejecuta el request que se solicito
  """
  log4py.info('## do_before_request ##')
  filter_result = None
  payload = None
  jsonRequest = None

  try:
    #validar si se debe filtrar el patron /*/admin/*
    #todo lo que sea admin debe pasar por el filtro de seguridad
    if(re.match('\/{1}[a-zA-Z]*\/{1}admin\/{1}[a-zA-Z]*\/?', request.path)):
      filter_result = valida_token(request.args.get('Web_Token'))

      if(filter_result):
        log4py.info('Token correcto...')

      else:
        payload = json.dumps({'code': 500, 'message': 'Token incorrecto', 'payload': None})
        return Response(payload, status=500, mimetype='application/json')

    else:
      log4py.info('La expresion fallo o es un path sin configuracion, se deja continuar...')

  except DecodeError as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Token invalido', 'payload': None})
    return Response(payload, status=500, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error al intentar filtrar la peticion', 'payload': None})
    return Response(payload, status=500, mimetype='application/json')

@app.after_request
def do_after_request(response):
  """
    funcion que se ejecuta despues de cada peticion o request
    aqui se configura el servidor para especificar las cabeceras y cross origin
  """
  log4py.info('## do_after_request ##')
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Credentials', False)
  response.headers.add('Access-Control-Allow-Headers', 'Origin, Content-type, Authorization, WithCredentials, Web_Token, Accept')
  response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  #Establecer Access-Control-Max-Age a 1 en desarrollo para indicar que solo guarde cache el navegador por 1 segundo
  #y quitar esta opcion en produccion para que el navegador decida cuando limpiar cache
  response.headers.add('Access-Control-Max-Age', '1')

  return response

@app.errorhandler(404)
def page_not_found(error):
  """
    funcion que se ejecuta siempre que una peticion request no encuentra la URL
  """
  log4py.error('## page_not_found ##')
  return 'This page does not exist', 404

@app.errorhandler(Exception)
def exception_error_handler(error):
  """
    funcion que se ejecuta si una excepcion es lanzada por el servidor
  """
  log4py.error('## exception_error_handler ##')
  log4py.error(error)

##################################
## Inicio del servidor Flask #####
##################################
if __name__ == '__main__':
  log4py.info('## iniciando servidor clinicSoft  ##')
  #Inicio de sesion del usuario o login
  app.add_url_rule(rule='/clinicSoft/login', view_func=login_view, methods=['POST'])
  #Administracion de usuarios
  app.add_url_rule(rule='/clinicSoft/admin/usuario/insertar', view_func=insertar_usuario, methods=['POST'])
  #Administracion de medicamentos
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/insertar', view_func=insertar_medicamento, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/buscar', view_func=buscar_medicamento, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/llenarCombo', view_func=llenar_combo_medicamento, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/eliminar', view_func=eliminar_medicamento, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/actualizar', view_func=actualizar_medicamento, methods=['POST'])
  app.run(debug=True, port=8080)
