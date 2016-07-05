__author__ = '@LLV'
import json
import traceback
from flask import Response
from flask import request
from Log4py import log4py

from src.service.MedicoService import MedicoService

def insert_medico():
  """
    metodo utilizado como punto de entrada para registrar un médico
  """
  log4py.info('## medico_view método insert  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None
  try:
    jsonRequest = request.get_json(force=True)
    medicoService = MedicoService()
    service_response = medicoService.insert_medico(jsonRequest['medi_id'], jsonRequest['med_cedula'], jsonRequest['med_nombre'],
                                                   jsonRequest['med_ape_pat'], jsonRequest['med_ape_mat'], jsonRequest['med_fechan'],
                                                   jsonRequest['med_celular'],jsonRequest['med_correo'],jsonRequest['med_turno'],jsonRequest['med_sexo'])
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

def update_medico():
  """
    metodo utilizado para actualizar un medicamento
  """
  log4py.info('## medico_view metodo update  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    medicoService = MedicoService()
    service_response = medicoService.update_medico(jsonRequest['medi_id'], jsonRequest['med_cedula'], jsonRequest['med_nombre'],
                                                   jsonRequest['med_ape_pat'], jsonRequest['med_ape_mat'], jsonRequest['med_fechan'],
                                                   jsonRequest['med_celular'],jsonRequest['med_correo'],jsonRequest['med_turno'],jsonRequest['med_sexo'])
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

def delete_medico():
  """
  metodo utilizado como punto de entrada para eliminar un registro en medico
  """
  log4py.info('## medico_view metodo delete ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    medicoService = MedicoService()
    service_response = medicoService.elimina_medico(jsonRequest['med_id'], jsonRequest['medi_estado'])
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