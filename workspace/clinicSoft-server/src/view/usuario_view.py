__author__ = 'drunkenturtle'

import json
import traceback

from flask import Response
from flask import request

from Log4py import log4py
from src.view.util.ObjectEncoder import ObjectEncoder
from src.service.UsuarioService import UsuarioService

def getAllUsers():
  """
    Servicio RestFul utilizado para obtener todos los usuarios activos del sistema
  """
  log4py.info('## usuario_view->getAllUsers ##')
  response = None
  payload = None
  jsonRequest = None
  usuarioService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    usuarioService = UsuarioService()
    service_response = usuarioService.getAllUsers()
    payload = json.dumps({'code': 200, 'message': 'OK', 'payload': service_response}, cls=ObjectEncoder)
    response = Response(payload, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')

  return response
