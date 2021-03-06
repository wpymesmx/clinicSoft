__author__ = 'drunkenturtle'

from flask import Flask
from flask import request
from flask import Response
from flask import redirect
from flask import url_for
import json
import traceback
import re

from Log4py import log4py
from src.filter.security_filter import valida_token
from src.view.login_view import login_view
from jwt.exceptions import DecodeError
#medicamento
from src.view.medicamento_view import insertar_medicamento
from src.view.medicamento_view import buscar_medicamento
from src.view.medicamento_view import eliminar_detalle_medicamento
from src.view.medicamento_view import actualizar_medicamento
from src.view.medicamento_view import llenar_combo_medicamento
from src.view.medicamento_view import existe_medicamento
from src.view.medicamento_view import llenar_combo_grupos
from src.view.medicamento_view import insertar_detalle_medicamento
from src.view.medicamento_view import  existe_detalle_medicamento
from src.view.medicamento_view import  buscar_detalles
from src.view.medicamento_view import  update_detalle_medicamento
from src.view.medicamento_view import  reporte_medicamentos
from src.view.medicamento_view import dashbord_medicamento
from src.view.medicamento_view import llenar_combo_presentacion
from src.view.medicamento_view import llenar_combo_descripcion
from src.view.medicamento_view import llenar_combo_farmaceutica
from src.view.medicamento_view import llenar_combo_nombre_comercial
from src.view.medicamento_view import llenar_combo_nombre_generico
from src.view.medicamento_view import llenar_combo_nombre_grupo

#personal
from src.view.personal_view import insert_personal
from src.view.personal_view import update_personal
from src.view.personal_view import activar_personal
from src.view.personal_view import inactivar_personal
from src.view.personal_view import getPersonalById
from src.view.personal_view import getAllPersonal
from src.view.personal_view import getPersonalByFilter

#paciente
from src.view.paciente_view import insert_paciente
from src.view.paciente_view import update_paciente
from src.view.paciente_view import buscar_paciente
from src.view.paciente_view import existe_paciente
from src.view.paciente_view import busca_datos_paciente
from src.view.paciente_view import insert_detalle_paciente
from src.view.paciente_view import busca_historial_paciente
from src.view.paciente_view import update_detalle_paciente
from src.view.paciente_view import insert_analisis
#usaurio
from src.view.usuario_view import getAllUsers

#Crear objeto de servidor flask
app = Flask(__name__)

@app.before_request
def do_before_request():
  """
    funcion que se ejecuta antes de cada peticion o request
    utilizada para ejecutar filtros de validacion o seguridad
    si se regresa un response ya no se ejecuta el request que se solicito
  """
  log4py.info('## do_before_request ##')
  filter_result = None
  payload = None
  jsonRequest = None

  try:
    #validar si se debe filtrar el patron /*/admin/*
    #todo lo que sea admin debe pasar por el filtro de seguridad
    if(re.match('\/{1}[a-zA-Z]*\/{1}admin\/{1}[a-zA-Z]*\/?', request.path)):
      filter_result = valida_token(request.args.get('Web_Token'))

      if(filter_result):
        log4py.info('Token correcto...')

      else:
        payload = json.dumps({'code': 500, 'message': 'Token incorrecto', 'payload': None})
        return Response(payload, status=500, mimetype='application/json')

    else:
      log4py.info('La expresion fallo o es un path sin configuracion, se deja continuar...')

  except DecodeError as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Token invalido', 'payload': None})
    return Response(payload, status=500, mimetype='application/json')

  except Exception as err:
    log4py.error('Error-> {0}'.format(err))
    traceback.print_exc()
    payload = json.dumps({'code': 500, 'message': 'Error al intentar filtrar la peticion', 'payload': None})
    return Response(payload, status=500, mimetype='application/json')

@app.after_request
def do_after_request(response):
  """
    funcion que se ejecuta despues de cada peticion o request
    aqui se configura el servidor para especificar las cabeceras y cross origin
  """
  log4py.info('## do_after_request ##')
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Credentials', False)
  response.headers.add('Access-Control-Allow-Headers', 'Origin, Content-type, Authorization, WithCredentials, Web_Token, Accept')
  response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  #Establecer Access-Control-Max-Age a 1 en desarrollo para indicar que solo guarde cache el navegador por 1 segundo
  #y quitar esta opcion en produccion para que el navegador decida cuando limpiar cache
  response.headers.add('Access-Control-Max-Age', '1')

  return response

@app.errorhandler(404)
def page_not_found(error):
  """
    funcion que se ejecuta siempre que una peticion request no encuentra la URL
  """
  log4py.error('## page_not_found ##')
  return 'This page does not exist', 404

@app.errorhandler(Exception)
def exception_error_handler(error):
  """
    funcion que se ejecuta si una excepcion es lanzada por el servidor
  """
  log4py.error('## exception_error_handler ##')
  log4py.error(error)

##################################
## Inicio del servidor Flask #####
##################################
if __name__ == '__main__':
  log4py.info('## iniciando servidor clinicSoft  ##')
  #Inicio de sesion del usuario o login
  app.add_url_rule(rule='/clinicSoft/login', view_func=login_view, methods=['POST'])
  #Administracion de medicamentos
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/insertar', view_func=insertar_medicamento, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/insertarDetalleMed', view_func=insertar_detalle_medicamento, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/buscar', view_func=buscar_medicamento, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/llenarCombo', view_func=llenar_combo_medicamento, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/llenarComboGrupos', view_func=llenar_combo_grupos, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/eliminar', view_func=eliminar_detalle_medicamento, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/actualizar', view_func=actualizar_medicamento, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/existe', view_func=existe_medicamento, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/existeDetalle', view_func=existe_detalle_medicamento, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/buscarDetalles', view_func=buscar_detalles, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/editaDetalle', view_func=update_detalle_medicamento, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/reporteMedicamentos', view_func=reporte_medicamentos, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/dashbordMedicamento', view_func=dashbord_medicamento, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/llenaComboPresentacion', view_func=llenar_combo_presentacion, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/llenaComboDescripcion', view_func=llenar_combo_descripcion,methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/llenaComboFarmaceutica', view_func=llenar_combo_farmaceutica,methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/llenaComboNombreComercial', view_func=llenar_combo_nombre_comercial,methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/llenaComboNombreGenerico', view_func=llenar_combo_nombre_generico,methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/medicamento/llenaComboNombreGrupo', view_func=llenar_combo_nombre_grupo,methods=['POST'])
  #Administracion de personal
  app.add_url_rule(rule='/clinicSoft/admin/personal/insert_personal', view_func=insert_personal, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/personal/update_personal', view_func=update_personal, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/personal/activar_personal', view_func=activar_personal, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/personal/inactivar_personal', view_func=inactivar_personal, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/personal/getPersonalById', view_func=getPersonalById, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/personal/getAllPersonal', view_func=getAllPersonal, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/personal/getPersonalByFilter', view_func=getPersonalByFilter, methods=['POST'])
  # administracion de pacientes
  app.add_url_rule(rule='/clinicSoft/admin/paciente/insert_paciente', view_func=insert_paciente, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/paciente/update_paciente', view_func=update_paciente, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/paciente/buscar_paciente', view_func=buscar_paciente, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/paciente/existe_paciente', view_func=existe_paciente, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/paciente/busca_datos_paciente', view_func=busca_datos_paciente, methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/paciente/insert_historial', view_func=insert_detalle_paciente,methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/paciente/buscarHistorial', view_func=busca_historial_paciente,methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/paciente/updateHistorial', view_func=update_detalle_paciente,methods=['POST'])
  app.add_url_rule(rule='/clinicSoft/admin/paciente/insertAnalisis', view_func=insert_analisis,methods=['POST'])
  #administracion de usuarios
  app.add_url_rule(rule='/clinicSoft/admin/user/getAllUsers', view_func=getAllUsers, methods=['POST'])

  app.run(debug=True, port=8080)

