__author__ = '@LLV'
import json
import traceback
from flask import Response
from flask import request
from Log4py import log4py

from src.view.util.ObjectEncoder import ObjectEncoder
from src.service.PacienteService import PacienteService

def insert_detalle_paciente():
  """
    metodo utilizado como punto de entrada para registrae un historial clinico.
  """
  log4py.info('## insert_detalle_paciente método insert  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None
  try:
    jsonRequest = request.get_json(force=True)
    pacienteService = PacienteService()
    service_response = pacienteService.insert_detalle_paciente(jsonRequest['pac_id'], jsonRequest['his_nombre'], jsonRequest['his_sintoma'],jsonRequest['his_fecha'],jsonRequest['his_analisis'])
    payload = json.dumps({
     'code': 200,
     'message': 'OK',
     'payload': service_response
    }, cls=ObjectEncoder)
    print(payload)
    response = Response(payload, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')
  return response

def insert_analisis():
  """
    metodo utilizado como punto de entrada para registrar un analisis clinico.
  """
  log4py.info('## insert_analisis método insert  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None
  try:
    jsonRequest = request.get_json(force=True)
    pacienteService = PacienteService()
    service_response = pacienteService.insert_analisis(jsonRequest['his_id'], jsonRequest['ana_nombre'], jsonRequest['ana_analisis'])
    payload = json.dumps({
     'code': 200,
     'message': 'OK',
     'payload': service_response
    }, cls=ObjectEncoder)
    print(payload)
    response = Response(payload, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')
  return response

def update_detalle_paciente():
  """
    metodo utilizado para actualizar un historial  clinico.
  """
  log4py.info('## update_detalle_paciente##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    pacienteService = PacienteService()
    print('ENTRA METODO EDITAR HISTORIAL')
    service_response = pacienteService.update_detalle_paciente(jsonRequest['his_id'],jsonRequest['pac_id'], jsonRequest['his_nombre'], jsonRequest['his_sintoma'],jsonRequest['his_fecha'],
                                                               jsonRequest['his_analisis'],jsonRequest['his_estado'])
    payload = json.dumps({
      'code': 200,
      'message': 'OK',
      'payload': service_response
    }, cls=ObjectEncoder)
    print(payload)
    response = Response(payload, status=200, mimetype='application/json')
  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')
  return response

def insert_paciente():
  """
    metodo utilizado como punto de entrada para registrar un PACIENTE
  """
  log4py.info('## insert_paciente método insert  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None
  try:
    jsonRequest = request.get_json(force=True)
    pacienteService = PacienteService()
    service_response = pacienteService.insert_paciente(jsonRequest['usu_id'], jsonRequest['pac_nombre'], jsonRequest['pac_apellido_paterno'],
                                                   jsonRequest['pac_apellido_materno'], jsonRequest['pac_fechan'],jsonRequest['pac_fechar'], jsonRequest['pac_sexo'],
                                                   jsonRequest['pac_domicilio'],jsonRequest['pac_celular'],jsonRequest['pac_correo'],
                                                   jsonRequest['pac_ocupac'],jsonRequest['pac_tipo'],jsonRequest['pac_foto'])
    payload = json.dumps({
     'code': 200,
     'message': 'OK',
     'payload': service_response
    }, cls=ObjectEncoder)
    print(payload)
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
    service_response = medicoService.update_paciente(jsonRequest['pac_id'],jsonRequest['usu_id'], jsonRequest['pac_nombre'], jsonRequest['pac_apellido_paterno'],
                                                   jsonRequest['pac_apellido_materno'], jsonRequest['pac_fechan'],jsonRequest['pac_fechar'], jsonRequest['pac_sexo'],
                                                   jsonRequest['pac_domicilio'],jsonRequest['pac_celular'],jsonRequest['pac_correo'],
                                                   jsonRequest['pac_ocupac'],jsonRequest['pac_tipo'],jsonRequest['pac_foto'],jsonRequest['pac_estado'])
    payload = json.dumps({
      'code': 200,
      'message': 'OK',
      'payload': service_response
    }, cls=ObjectEncoder)
    print(payload)
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

def buscar_paciente():
  """
    metodo utilizado para buscar un PACIENTE
  """
  log4py.info('##  buscar_paciente  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    #log4py.info('web_token-> {0}'.format(request.args.get('Web_Token')))
    jsonRequest = request.get_json(force=True)
    pacienteService = PacienteService()
    service_response = pacienteService.buscar_paciente(jsonRequest['pac_nombre'], jsonRequest['pac_paterno'],jsonRequest['pac_materno'],
                                                       jsonRequest['pac_fechan'],jsonRequest['pac_fechar'], jsonRequest['pac_sexo'])
    payload = json.dumps({
     'code': 200,
     'message': 'OK',
     'payload': service_response
    }, cls=ObjectEncoder)
    print(payload)
    response = Response(payload, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')
  return response

def existe_paciente():
  """
    metodo utilizado para validar si existe un medicamento
  """
  log4py.info('##  existe_paciente  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    #log4py.info('web_token-> {0}'.format(request.args.get('Web_Token')))
    jsonRequest = request.get_json(force=True)
    pacienteService = PacienteService()
    print('#Valores que vienen de entrada metodo exite#')
    print(jsonRequest['nombre'],jsonRequest['paterno'],jsonRequest['materno'])
    service_response = pacienteService.existe_paciente(jsonRequest['nombre'],jsonRequest['paterno'],jsonRequest['materno'])

    payload = json.dumps({
     'code': 200,
     'message': 'OK',
     'payload': service_response
    }, cls=ObjectEncoder)
    print(payload)
    response = Response(payload, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')
  return response

def busca_datos_paciente():
  """
    metodo utilizado para recuperar los datos de un paciente.
  """
  log4py.info('##  busca_datos_paciente  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    #log4py.info('web_token-> {0}'.format(request.args.get('Web_Token')))
    jsonRequest = request.get_json(force=True)
    pacienteService = PacienteService()
    service_response = pacienteService.busca_datos_paciente(jsonRequest['pac_id'])

    payload = json.dumps({
     'code': 200,
     'message': 'OK',
     'payload': service_response
    }, cls=ObjectEncoder)
    print(payload)
    response = Response(payload, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')
  return response

def busca_historial_paciente():
  """
    metodo utilizado para recuperar el historial de un paciente.
  """
  log4py.info('##  busca_historial_paciente  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    #log4py.info('web_token-> {0}'.format(request.args.get('Web_Token')))
    jsonRequest = request.get_json(force=True)
    pacienteService = PacienteService()
    service_response = pacienteService.busca_historial_paciente(jsonRequest['id_pac'])

    payload = json.dumps({
     'code': 200,
     'message': 'OK',
     'payload': service_response
    }, cls=ObjectEncoder)
    print(payload)
    response = Response(payload, status=200, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error interno...', 'payload': None})
    response = Response(payload, status=500, mimetype='application/json')
  return response