import unittest
import json
import urllib.request as request
import urllib.parse as parse

class TestLoginView(unittest.TestCase):
  """
    clase para pruebas unitarias de LoginService
    comando para ejecutar desde terminal: python -m unittest -v TestLoginView.py
    Nota: toooodos los metodos que inician con test seran ejecutados como prueba unitaria
  """

  def test_login_view(self):
    data = b'''{
      "user": "root", "passwd": "123456"
    }'''
    web_token = ''
    method = 'POST'
    req = request.Request(url='http://127.0.0.1:8080/clinicSoft/login?Web_Token={0}'.format(web_token), method=method, data=data)
    req.add_header('Content-type', 'application/json')
    res = request.urlopen(req, data)
    print(res.read().decode('utf-8'))

if __name__ == '__main__':
  unittest.main()
