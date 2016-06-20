__author__ = 'drunkenturtle'

import json
import traceback

from flask import Response
from flask import request

from Log4py import log4py
from src.view.util.ObjectEncoder import ObjectEncoder
from src.service.UsuarioService import UsuarioService

def insertar_usuario():
  """
    Servicio RestFul utilizado para agregar un nuevo usuario en el sistema
  """
  log4py.info('## insertar_usuario ##')
  response = None
  payload = None
  jsonRequest = None
  usuarioService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    #log4py.info('user-> {0}'.format(jsonRequest['user']))
    #log4py.info('passwd-> {0}'.format(jsonRequest['passwd']))
    #log4py.info('JWS-> {0}'.format(request.headers['JWS']))
    usuarioService = UsuarioService()
    service_response = usuarioService.insertar_usuario(jsonRequest['user'], jsonRequest['passwd'])

    payload = json.dumps({ 'code': 200, 'message': 'OK', 'payload': service_response}, cls=ObjectEncoder)
    response = Response(payload, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')

  return response
