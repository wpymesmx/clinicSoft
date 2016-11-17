import unittest
import json
import urllib.request as request
import urllib.parse as parse

class TestUsuarioView(unittest.TestCase):
  """
    clase para pruebas unitarias de UsuarioService
    comando para ejecutar desde terminal: python -m unittest -v TestUsuarioView.py
    Nota: toooodos los metodos que inician con test seran ejecutados como prueba unitaria
  """

  def test_getAllUsers(self):
    data = b'''{

    }'''
    web_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoicm9vdCIsImlkX3VzdWFyaW8iOiJyb290IiwiY3JlYXRpb25fdGltZSI6IjIwMTYvMDgvMTkgMDg6MTk6NDI6OTE2MDMzIn0.zl6dALWedssBmAt766deL-d844C-dwheKky-jAlgrEs'
    method = 'POST'
    req = request.Request(url='http://127.0.0.1:8080/clinicSoft/admin/user/getAllUsers?Web_Token={0}'.format(web_token), method=method, data=data)
    req.add_header('Content-type', 'application/json')
    res = request.urlopen(req, data)
    print(res.read().decode('utf-8'))

if __name__ == '__main__':
  unittest.main()
