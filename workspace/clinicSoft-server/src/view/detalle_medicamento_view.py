__author__ = '@LLV'
import json
import traceback
from flask import Response
from flask import request
from Log4py import log4py
from pickle import dump, dumps, load, loads

from src.service.DetalleMedicamentoService import DetalleMedicamentoService

def insert_medicament():
  """
    metodo utilizado como punto de entrada para gestion de medicament
  """
  log4py.info('## detalle_medicament_view  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None
  try:
    jsonRequest = request.get_json(force=True)
    detMedicamentService = DetalleMedicamentoService()
    service_response = detMedicamentService.insert_detalle_medicamento(jsonRequest['dem_id'], jsonRequest['med_fk'], jsonRequest['alm_fk'], jsonRequest['dem_cantidad_max'], jsonRequest['dem_cantidad_min'],
                                                                       jsonRequest['dem_existencia'],jsonRequest['dem_descripcion'],jsonRequest['dem_indicaciones'],jsonRequest['dem_dosis'],jsonRequest['dem_estado'])
    payload = json.dumps({
      'code': 200,
      'message': 'OK',
      'payload': service_response
    })
    response = Response(payload, status=200, mimetype='application/json')
  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')
  return response

def update_detalle_medicament():
  """
    metodo utilizado para actualizar un medicamento
  """
  log4py.info('## detalle_medicament_view  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    detMedicamentService = DetalleMedicamentoService()
    service_response = detMedicamentService.update_detalle_medicamento(jsonRequest['dem_id'], jsonRequest['alm_fk'], jsonRequest['dem_cantidad_max'], jsonRequest['dem_cantidad_min'],
                                                                       jsonRequest['dem_existencia'],jsonRequest['dem_descripcion'],jsonRequest['dem_indicaciones'],jsonRequest['dem_dosis'],jsonRequest['dem_estado'])
    payload = json.dumps({
      'code': 200,
      'message': 'OK',
      'payload': service_response
    })

    response = Response(payload, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')

  return response

def delete_detalle_medicament():
  """
  metodo utilizado como punto de entrada para gestion de medicament
  """
  log4py.info('## detallle_medicament_view metodo delete ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    detMedicamentService = DetalleMedicamentoService()
    service_response = detMedicamentService.elimina_detalle_medicamento(jsonRequest['med_id'],jsonRequest['med_estado'])
    payload = json.dumps({
      'code': 200,
      'message': 'OK',
      'payload': service_response
    })
    response = Response(payload, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')

  return response