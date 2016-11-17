__author__ = 'drunkenturtle'

from Log4py import log4py
import jwt
from datetime import datetime

class SecurityService(object):
  """
    Servicio utilizado para manejar la seguridad de la aplicacion
  """

  def __init__(self):
    pass

  def encode_jws(self, id_usuario, usuario):
    """
      Metodo utilizado para encriptar los datos del usuario que ingreso a la aplicacion
    """
    #log4py.info('## SecuritySevice-> encode_jws ##')
    jws = None
    #TODO agregar la informacion en el token faltante
    today = datetime.today()
    #log4py.info('today-> {0}'.format(today.strftime('%Y/%m/%d %H:%M:%S:%f')))
    jws = jwt.encode({'id_usuario': id_usuario,
                      'usuario': usuario,
                      'creation_time': today.strftime('%Y/%m/%d %H:%M:%S:%f')
                     }, 'secret_key', algorithm='HS256')

    return jws.decode('UTF-8')

  def decode_jws(self, jws):
    """
      metodo utilizado ara decodificar el jws enviado en cada peticion del usuario
    """
    #log4py.info('## SecurityService-> decode_jws  ##')
    return jwt.decode(jws, 'secret_key', algorithms=['HS256'])




