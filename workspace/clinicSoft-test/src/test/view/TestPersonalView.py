import unittest
import json
import urllib.request as request
import urllib.parse as parse

class TestPersonalView(unittest.TestCase):
  """
    clase para pruebas unitarias de los servicios del personal
    comando para ejecutar desde terminal: python -m unittest -v TestPersonalView.py
    Nota: toooodos los metodos que inician con test seran ejecutados como prueba unitaria
    Nota: poner un _ antes de teste para evitar que correr la prueba unitaria
  """

  def _test_insert_personal(self):
    data = b'''{
      "usu_id": "1",
      "pers_nombre": "pers_nombre",
      "pers_apellido_pat": "pers_apellido_pat",
      "pers_apellido_mat": "pers_apellido_mat",
      "pers_cedula": "pers_cedula",
      "pers_fechan": "19/08/2016",
      "pers_celular": "0445510979755",
      "pers_correo": "pers_correo@gmail.com",
      "pers_turno": "1",
      "pers_sexo": "M"
    }'''
    web_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoicm9vdCIsImlkX3VzdWFyaW8iOiJyb290IiwiY3JlYXRpb25fdGltZSI6IjIwMTYvMDgvMTkgMDg6MTk6NDI6OTE2MDMzIn0.zl6dALWedssBmAt766deL-d844C-dwheKky-jAlgrEs'
    method = 'POST'
    req = request.Request(url='http://127.0.0.1:8080/clinicSoft/admin/personal/insert_personal?Web_Token={0}'.format(web_token), method=method, data=data)
    req.add_header('Content-type', 'application/json')
    res = request.urlopen(req, data)
    print(res.read().decode('utf-8'))

  def _test_update_personal(self):
    data = b'''{
      "pers_id": "1",
      "usu_id": "1",
      "pers_nombre": "pers_nombre_u",
      "pers_apellido_pat": "pers_apellido_pat_u",
      "pers_apellido_mat": "pers_apellido_mat_u",
      "pers_cedula": "pers_cedula_u",
      "pers_fechan": "18/08/2016",
      "pers_celular": "0445510979766",
      "pers_correo": "correo_personal@gmail.com",
      "pers_turno": "2",
      "pers_sexo": "F",
      "pers_estado": "A"
    }'''
    web_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoicm9vdCIsImlkX3VzdWFyaW8iOiJyb290IiwiY3JlYXRpb25fdGltZSI6IjIwMTYvMDgvMTkgMDg6MTk6NDI6OTE2MDMzIn0.zl6dALWedssBmAt766deL-d844C-dwheKky-jAlgrEs'
    method = 'POST'
    req = request.Request(url='http://127.0.0.1:8080/clinicSoft/admin/personal/update_personal?Web_Token={0}'.format(web_token), method=method, data=data)
    req.add_header('Content-type', 'application/json')
    res = request.urlopen(req, data)
    print(res.read().decode('utf-8'))

  def _test_activar_personal(self):
    data = b'''{
      "pers_id": "1"
    }'''
    web_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoicm9vdCIsImlkX3VzdWFyaW8iOiJyb290IiwiY3JlYXRpb25fdGltZSI6IjIwMTYvMDgvMTkgMDg6MTk6NDI6OTE2MDMzIn0.zl6dALWedssBmAt766deL-d844C-dwheKky-jAlgrEs'
    method = 'POST'
    req = request.Request(url='http://127.0.0.1:8080/clinicSoft/admin/personal/activar_personal?Web_Token={0}'.format(web_token), method=method, data=data)
    req.add_header('Content-type', 'application/json')
    res = request.urlopen(req, data)
    print(res.read().decode('utf-8'))

  def _test_inactivar_personal(self):
    data = b'''{
      "pers_id": "1"
    }'''
    web_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoicm9vdCIsImlkX3VzdWFyaW8iOiJyb290IiwiY3JlYXRpb25fdGltZSI6IjIwMTYvMDgvMTkgMDg6MTk6NDI6OTE2MDMzIn0.zl6dALWedssBmAt766deL-d844C-dwheKky-jAlgrEs'
    method = 'POST'
    req = request.Request(url='http://127.0.0.1:8080/clinicSoft/admin/personal/inactivar_personal?Web_Token={0}'.format(web_token), method=method, data=data)
    req.add_header('Content-type', 'application/json')
    res = request.urlopen(req, data)
    print(res.read().decode('utf-8'))

  def _test_getPersonalById(self):
    data = b'''{
      "pers_id": "1"
    }'''
    web_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoicm9vdCIsImlkX3VzdWFyaW8iOiJyb290IiwiY3JlYXRpb25fdGltZSI6IjIwMTYvMDgvMTkgMDg6MTk6NDI6OTE2MDMzIn0.zl6dALWedssBmAt766deL-d844C-dwheKky-jAlgrEs'
    method = 'POST'
    req = request.Request(url='http://127.0.0.1:8080/clinicSoft/admin/personal/getPersonalById?Web_Token={0}'.format(web_token), method=method, data=data)
    req.add_header('Content-type', 'application/json')
    res = request.urlopen(req, data)
    print(res.read().decode('utf-8'))

  def test_getAllPersonal(self):
    data = b'''{

    }'''
    web_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoicm9vdCIsImlkX3VzdWFyaW8iOiJyb290IiwiY3JlYXRpb25fdGltZSI6IjIwMTYvMDgvMTkgMDg6MTk6NDI6OTE2MDMzIn0.zl6dALWedssBmAt766deL-d844C-dwheKky-jAlgrEs'
    method = 'POST'
    req = request.Request(url='http://127.0.0.1:8080/clinicSoft/admin/personal/getAllPersonal?Web_Token={0}'.format(web_token), method=method, data=data)
    req.add_header('Content-type', 'application/json')
    res = request.urlopen(req, data)
    print(res.read().decode('utf-8'))

  def _test_getPersonalByFilter(self):
    data = b'''{
      "usu_id": "3",
      "pers_nombre": "",
      "pers_apellido_pat": "",
      "pers_apellido_mat": "",
      "pers_cedula": "",
      "pers_fechan": "",
      "pers_celular": "",
      "pers_correo": "",
      "pers_turno": "",
      "pers_sexo": "",
      "pers_estado": ""
    }'''
    web_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoicm9vdCIsImlkX3VzdWFyaW8iOiJyb290IiwiY3JlYXRpb25fdGltZSI6IjIwMTYvMDgvMTkgMDg6MTk6NDI6OTE2MDMzIn0.zl6dALWedssBmAt766deL-d844C-dwheKky-jAlgrEs'
    method = 'POST'
    req = request.Request(url='http://127.0.0.1:8080/clinicSoft/admin/personal/getPersonalByFilter?Web_Token={0}'.format(web_token), method=method, data=data)
    req.add_header('Content-type', 'application/json')
    res = request.urlopen(req, data)
    print(res.read().decode('utf-8'))

if __name__ == '__main__':
  unittest.main()
