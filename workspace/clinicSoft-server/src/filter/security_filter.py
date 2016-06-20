__author__ = 'drunkenturtle'

from Log4py import log4py
from src.service.SecurityService import SecurityService

def valida_token(jws):
  """
    funcion utilizada para validar el token del usuario
  """
  log4py.info('## security_filter-> valida_token ##')
  filter_result = False
  jwt = None
  securityService = None

  if(jws != None and jws.strip() != ''):
    securityService = SecurityService()
    #log4py.info('jws-> {0}'.format(jws))
    jwt = securityService.decode_jws(jws)
    log4py.info('jwt-> {0}'.format(jwt))
    #TODO agregar validaciones extra
    filter_result = True

  else:
    log4py.info('jws-> no existe')
    filter_result = False

  return filter_result

