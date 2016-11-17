__author__ = '@LLV'
import json
import traceback
from flask import Response
from flask import request
from Log4py import log4py

from src.service.PacienteService import PacienteService

def insert_paciente():
  """
    metodo utilizado como punto de entrada para registrar un médico
  """
  log4py.info('## paciente_view método insert  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None
  try:
    jsonRequest = request.get_json(force=True)
    pacienteService = PacienteService()
    service_response = pacienteService.insert_paciente(jsonRequest['pac_id'], jsonRequest['pac_nombre'], jsonRequest['pac_apellido_paterno'],
                                                   jsonRequest['pac_apellido_materno'], jsonRequest['pac_fechan'], jsonRequest['pac_sexo'],
                                                   jsonRequest['pac_domicilio'],jsonRequest['pac_celular'],jsonRequest['pac_correo'],
                                                   jsonRequest['pac_ocupac'],jsonRequest['pac_tipo'])
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

def update_paciente():
  """
    metodo utilizado para actualizar un medicamento
  """
  log4py.info('## paciente_view metodo update  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    medicoService = PacienteService()
    service_response = medicoService.update_paciente(jsonRequest['pac_id'], jsonRequest['pac_nombre'], jsonRequest['pac_apellido_paterno'],
                                                   jsonRequest['pac_apellido_materno'], jsonRequest['pac_fechan'], jsonRequest['pac_sexo'],
                                                   jsonRequest['pac_domicilio'],jsonRequest['pac_celular'],jsonRequest['pac_correo'],
                                                   jsonRequest['pac_ocupac'],jsonRequest['pac_tipo'])
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

def delete_paciente():
  """
  metodo utilizado como punto de entrada para eliminar un registro en paciente
  """
  log4py.info('## paciente_view metodo delete ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    pacienteService = PacienteService()
    service_response = pacienteService.elimina_paciente(jsonRequest['pac_id'],jsonRequest['pac_estado'])
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