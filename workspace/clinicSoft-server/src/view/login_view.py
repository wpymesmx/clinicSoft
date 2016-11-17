__author__ = 'drunkenturtle'

import json
import traceback

from flask import Response
from flask import request

from Log4py import log4py
from src.view.util.ObjectEncoder import ObjectEncoder
from src.service.LoginService import LoginService
from src.common.AppException import AppException

def login_view():
  """
    metodo utilizado como punto de entrada para iniciar sesion en la aplicacion
  """
  log4py.info('## login_view  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    log4py.info('user-> {0}'.format(jsonRequest['user']))
    log4py.info('passwd-> {0}'.format(jsonRequest['passwd']))

    loginService = LoginService()
    service_response = loginService.login(jsonRequest['user'], jsonRequest['passwd'])

    payload = json.dumps({ 'code': 200, 'message': 'OK', 'payload': service_response}, cls=ObjectEncoder)
    response = Response(payload, status=200, mimetype='application/json')

  except AppException as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': err.message, 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')

  return response
