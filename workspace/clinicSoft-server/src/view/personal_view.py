__author__ = 'drunkenturtle'

import json
import traceback

from flask import Response
from flask import request

from Log4py import log4py
from src.view.util.ObjectEncoder import ObjectEncoder
from src.service.PersonalService import PersonalService
from src.common.AppException import AppException

def insert_personal():
  """
    metodo utilizado como punto de entrada todas las peticiones de insertar personal
  """
  log4py.info('# personal_view->insert_personal #')
  response = None
  payload = None
  jsonRequest = None
  personalService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    personalService = PersonalService()
    service_response = personalService.insert_personal(jsonRequest['usu_id'], jsonRequest['pers_nombre'], jsonRequest['pers_apellido_pat'],
                                                       jsonRequest['pers_apellido_mat'], jsonRequest['pers_cedula'], jsonRequest['pers_fechan'],
                                                       jsonRequest['pers_celular'], jsonRequest['pers_correo'], jsonRequest['pers_turno'],
                                                       jsonRequest['pers_sexo'])
    payload = json.dumps({ 'code': 200, 'message': 'OK', 'payload': service_response}, cls=ObjectEncoder)
    response = Response(payload, status=200, mimetype='application/json')

  except AppException as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': err.message, 'payload': None})
    response = Response(payload, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')

  return response

def update_personal():
  """
    metodo para actualizar los registros de personal
  """
  log4py.info('# personal_view->update_personal #')
  response = None
  payload = None
  jsonRequest = None
  personalService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    personalService = PersonalService()
    personalService.update_personal(jsonRequest['pers_id'], jsonRequest['usu_id'], jsonRequest['pers_nombre'], jsonRequest['pers_apellido_pat'],
                                   jsonRequest['pers_apellido_mat'], jsonRequest['pers_cedula'], jsonRequest['pers_fechan'],
                                   jsonRequest['pers_celular'], jsonRequest['pers_correo'], jsonRequest['pers_turno'],
                                   jsonRequest['pers_sexo'], jsonRequest['pers_estado'])
    payload = json.dumps({ 'code': 200, 'message': 'OK', 'payload': ''}, cls=ObjectEncoder)
    response = Response(payload, status=200, mimetype='application/json')

  except AppException as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': err.message, 'payload': None})
    response = Response(payload, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')

  return response

def activar_personal():
  """
    metodo para activar los registros de personal
  """
  log4py.info('# personal_view->activar_personal #')
  response = None
  payload = None
  jsonRequest = None
  personalService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    personalService = PersonalService()
    personalService.activar_personal(jsonRequest['pers_id'])
    payload = json.dumps({ 'code': 200, 'message': 'OK', 'payload': ''}, cls=ObjectEncoder)
    response = Response(payload, status=200, mimetype='application/json')

  except AppException as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': err.message, 'payload': None})
    response = Response(payload, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')

  return response

def inactivar_personal():
  """
    metodo para inactivar los registros de personal
  """
  log4py.info('# personal_view->inactivar_personal #')
  response = None
  payload = None
  jsonRequest = None
  personalService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    personalService = PersonalService()
    personalService.inactivar_personal(jsonRequest['pers_id'])
    payload = json.dumps({ 'code': 200, 'message': 'OK', 'payload': ''}, cls=ObjectEncoder)
    response = Response(payload, status=200, mimetype='application/json')

  except AppException as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': err.message, 'payload': None})
    response = Response(payload, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')

  return response

def getPersonalById():
  """
    metodo para obtener un objeto de personal
  """
  log4py.info('# personal_view->getPersonalById #')
  response = None
  payload = None
  jsonRequest = None
  personalService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    personalService = PersonalService()
    service_response = personalService.getPersonalById(jsonRequest['pers_id'])
    payload = json.dumps({ 'code': 200, 'message': 'OK', 'payload': service_response}, cls=ObjectEncoder)
    response = Response(payload, status=200, mimetype='application/json')

  except AppException as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': err.message, 'payload': None})
    response = Response(payload, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')

  return response

def getAllPersonal():
  """
    metodo para obtener todos los objetos de personal registrados en db, activos e inactivos
  """
  log4py.info('# personal_view->getAllPersonal #')
  response = None
  payload = None
  jsonRequest = None
  personalService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    personalService = PersonalService()
    service_response = personalService.getAllPersonal()

    payload = json.dumps({ 'code': 200, 'message': 'OK', 'payload': service_response}, cls=ObjectEncoder)
    response = Response(payload, status=200, mimetype='application/json')

  except AppException as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': err.message, 'payload': None})
    response = Response(payload, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')

  return response

def getPersonalByFilter():
  """
    metodo para obtener todos los objetos de personal aplicado un fitro en la busqueda
  """
  log4py.info('# personal_view->getPersonalByFilter #')
  response = None
  payload = None
  jsonRequest = None
  personalService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    personalService = PersonalService()
    service_response = personalService.getPersonalByFilter(jsonRequest['usu_id'], jsonRequest['pers_nombre'], jsonRequest['pers_apellido_pat'],
                                                   jsonRequest['pers_apellido_mat'], jsonRequest['pers_cedula'], jsonRequest['pers_fechan'],
                                                   jsonRequest['pers_celular'], jsonRequest['pers_correo'], jsonRequest['pers_turno'],
                                                   jsonRequest['pers_sexo'], jsonRequest['pers_estado'])
    payload = json.dumps({ 'code': 200, 'message': 'OK', 'payload': service_response}, cls=ObjectEncoder)
    response = Response(payload, status=200, mimetype='application/json')

  except AppException as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': err.message, 'payload': None})
    response = Response(payload, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')

  return response
