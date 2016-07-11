import json
import traceback
from flask import Response
from flask import request
from Log4py import log4py
from pickle import dump, dumps, load, loads

from src.view.util.ObjectEncoder import ObjectEncoder
from src.service.MedicamentoService import MedicamentoService

def insertar_medicamento():
  """
    metodo utilizado como punto de entrada para gestion de medicament
  """
  log4py.info('## insertar_medicamento  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    medicamentService = MedicamentoService()
    service_response = medicamentService.insertar_medicamento(jsonRequest['nombre_comercial'], jsonRequest['nombre_generico'], jsonRequest['farmaceutica'], jsonRequest['elaborado_en'],jsonRequest['condicion_venta'],jsonRequest['estado'])

    response = Response(service_response, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')

  return response

def actualizar_medicamento():
  """
    metodo utilizado para actualizar un medicamento
  """
  log4py.info('## actualizar_medicamento  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    medicamentService = MedicamentoService()
    service_response = medicamentService.update_medicamento(jsonRequest['nombre_comercial'], jsonRequest['nombre_generico'], jsonRequest['farmaceutica'], jsonRequest['elaborado_en'], jsonRequest['condicion_venta'])

    response = Response(service_response, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')

  return response

def buscar_medicamento():
  """
    metodo utilizado para buscar un medicamento
  """
  log4py.info('##  busca_medicament  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    medicamentService = MedicamentoService()
    service_response = medicamentService.buscar_medicamento(jsonRequest['nombre_comercial'], jsonRequest['nombre_generico'])
    pickled_obj = dumps(service_response)
    print(pickled_obj)
    response = Response(pickled_obj, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')
  return response

def eliminar_medicamento():
  """
  metodo utilizado como punto de entrada para gestion de medicament
  """
  log4py.info('## medicament_view metodo delete ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    medicamentService = MedicamentoService()
    service_response = medicamentService.eliminar_medicamento(jsonRequest['med_id'])
    response = Response(service_response, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')

  return response
