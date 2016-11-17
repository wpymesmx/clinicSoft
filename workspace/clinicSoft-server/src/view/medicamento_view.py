import json
import traceback
from flask import Response
from flask import request
from Log4py import log4py

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
    service_response = medicamentService.insertar_medicamento(jsonRequest['nombre_comercial'], jsonRequest['nombre_generico'],jsonRequest['estado'])

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

def insertar_detalle_medicamento():
  """
    metodo utilizado como punto de entrada para gestion de detalle medicament
  """
  log4py.info('## insertar_detalle_medicamento  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    medicamentService = MedicamentoService()
    service_response = medicamentService.insertar_detalle_medicamento(jsonRequest['id_grupo'], jsonRequest['id_med'], jsonRequest['codigo_barras'], jsonRequest['presentacion'],jsonRequest['descripcion'], jsonRequest['cantidad_maxima'],jsonRequest['cantidad_minima'],
                                                                      jsonRequest['existencia'], jsonRequest['indicasiones'],jsonRequest['via_aministracion'],jsonRequest['fecha_alta'],jsonRequest['fecha_caducidad'], jsonRequest['condicion_venta'],
                                                                      jsonRequest['precio'], jsonRequest['iva'], jsonRequest['farmaceutica'], jsonRequest['elaborado_en'],jsonRequest['image64'])
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
    service_response = medicamentService.actualizar_medicamento(jsonRequest['nombre_comercial'], jsonRequest['nombre_generico'], jsonRequest['estado'],jsonRequest['id_med'])

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

def update_detalle_medicamento():
  """
    metodo utilizado para actualizar un medicamento
  """
  log4py.info('## update_detalle_medicamento  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    jsonRequest = request.get_json(force=True)
    medicamentService = MedicamentoService()
    service_response = medicamentService.update_detalle_medicamento(jsonRequest['dem_id'], jsonRequest['id_med'],
                                                                    jsonRequest['presentacion'],jsonRequest['descripcion'],
                                                                    jsonRequest['cantidad_maxima'], jsonRequest['cantidad_minima'],
                                                                    jsonRequest['existencia'], jsonRequest['indicasiones'],
                                                                    jsonRequest['via_aministracion'],jsonRequest['fecha_alta'],
                                                                    jsonRequest['fecha_caducidad'],jsonRequest['condicion_venta'],
                                                                    jsonRequest['precio'], jsonRequest['iva'], jsonRequest['farmaceutica'],
                                                                    jsonRequest['elaborado_en'],jsonRequest['imagen'])

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
    #log4py.info('web_token-> {0}'.format(request.args.get('Web_Token')))
    jsonRequest = request.get_json(force=True)
    medicamentService = MedicamentoService()
    service_response = medicamentService.buscar_medicamento(jsonRequest['nombre_comercial'], jsonRequest['nombre_generico'])

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

def existe_medicamento():
  """
    metodo utilizado para validar si existe un medicamento
  """
  log4py.info('##  existe_medicament  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    #log4py.info('web_token-> {0}'.format(request.args.get('Web_Token')))
    jsonRequest = request.get_json(force=True)
    medicamentService = MedicamentoService()
    service_response = medicamentService.existe_medicamento(jsonRequest['nombre_comercial'])

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

def existe_detalle_medicamento():
  """
    metodo utilizado para validar si existe un detalle medicamento
  """
  log4py.info('##  existe_detalle_medicament  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    #log4py.info('web_token-> {0}'.format(request.args.get('Web_Token')))
    jsonRequest = request.get_json(force=True)
    medicamentService = MedicamentoService()
    service_response = medicamentService.existe_detalle_medicamento(jsonRequest['presentacion'],jsonRequest['id_med'])

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

def buscar_detalles():
  """
    metodo utilizado para validar si existe un detalle medicamento
  """
  log4py.info('##  buscar_detalles  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    #log4py.info('web_token-> {0}'.format(request.args.get('Web_Token')))
    jsonRequest = request.get_json(force=True)
    medicamentService = MedicamentoService()
    service_response = medicamentService.buscar_detalles(jsonRequest['id_med'])

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


def llenar_combo_medicamento():
  """
    metodo utilizado para llenar el combo con todos los medicamentos activos
  """
  log4py.info('##  llenar_combo_medicamento  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    #log4py.info('web_token-> {0}'.format(request.args.get('Web_Token')))
    #jsonRequest = request.get_json(force=True)
    medicamentService = MedicamentoService()
    service_response = medicamentService.llenar_combo_medicamento()

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


def llenar_combo_grupos():
  """
    metodo utilizado para llenar el combo con todos los almacenes activos
  """
  log4py.info('##  llenar_combo_almacen  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    #log4py.info('web_token-> {0}'.format(request.args.get('Web_Token')))
    #jsonRequest = request.get_json(force=True)
    medicamentService = MedicamentoService()
    service_response = medicamentService.llenar_combo_grupos()

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

def eliminar_detalle_medicamento():
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
    print(jsonRequest['dem_id'])
    service_response = medicamentService.eliminar_detalle_medicamento(jsonRequest['dem_id'])
    response = Response(service_response, status=200, mimetype='application/json')

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

def reporte_medicamentos():
  """
    metodo utilizado para buscar un medicamento
  """
  log4py.info('##  reporte_medicamentos  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    #log4py.info('web_token-> {0}'.format(request.args.get('Web_Token')))
    jsonRequest = request.get_json(force=True)
    medicamentService = MedicamentoService()
    service_response = medicamentService.reporte_medicamentos(jsonRequest['codigo_barras'],jsonRequest['nombre_comercial'], jsonRequest['nombre_generico'],jsonRequest['fecha_alta'],
                                                              jsonRequest['fecha_caducidad'],jsonRequest['presentacion'],
                                                              jsonRequest['descripcion'],jsonRequest['farmaceutica'],jsonRequest['grupo'])
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

def dashbord_medicamento():
  """
    metodo utilizado para buscar un medicamento
  """
  log4py.info('##  reporte_medicamentos  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    #log4py.info('web_token-> {0}'.format(request.args.get('Web_Token')))
    jsonRequest = request.get_json(force=True)
    medicamentService = MedicamentoService()
    service_response = medicamentService.dashbord_medicamento(jsonRequest['dem_id'])
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

def llenar_combo_presentacion():

  log4py.info('##  llenar_combo_almacen  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    #log4py.info('web_token-> {0}'.format(request.args.get('Web_Token')))
    #jsonRequest = request.get_json(force=True)
    medicamentService = MedicamentoService()
    service_response = medicamentService.llenar_combo_presentacion()

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

def llenar_combo_descripcion():

  log4py.info('##  llenar_combo_descripcion  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    #log4py.info('web_token-> {0}'.format(request.args.get('Web_Token')))
    #jsonRequest = request.get_json(force=True)
    medicamentService = MedicamentoService()
    service_response = medicamentService.llenar_combo_descripcion()

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

def llenar_combo_farmaceutica():

  log4py.info('##  llenar_combo_farmaceutica  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    #log4py.info('web_token-> {0}'.format(request.args.get('Web_Token')))
    #jsonRequest = request.get_json(force=True)
    medicamentService = MedicamentoService()
    service_response = medicamentService.llenar_combo_farmaceutica()

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

def llenar_combo_nombre_comercial():

  log4py.info('##  llenar_combo_nombre_comercial  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    #log4py.info('web_token-> {0}'.format(request.args.get('Web_Token')))
    #jsonRequest = request.get_json(force=True)
    medicamentService = MedicamentoService()
    service_response = medicamentService.llenar_combo_nombre_comercial()

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

def llenar_combo_nombre_generico():

  log4py.info('##  llenar_combo_nombre_generico  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    #log4py.info('web_token-> {0}'.format(request.args.get('Web_Token')))
    #jsonRequest = request.get_json(force=True)
    medicamentService = MedicamentoService()
    service_response = medicamentService.llenar_combo_nombre_generico()

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

def llenar_combo_nombre_grupo():

  log4py.info('##  llenar_combo_nombre_grupo  ##')
  response = None
  payload = None
  jsonRequest = None
  loginService = None
  service_response = None

  try:
    #log4py.info('web_token-> {0}'.format(request.args.get('Web_Token')))
    #jsonRequest = request.get_json(force=True)
    medicamentService = MedicamentoService()
    service_response = medicamentService.llenar_combo_nombre_grupo()

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