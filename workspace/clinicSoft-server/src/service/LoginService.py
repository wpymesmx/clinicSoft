__author__ = 'drunkenturtle'

from Log4py import log4py
from src.dao.LoginDao import LoginDao
from src.service.SecurityService import SecurityService
from src.common.AppException import AppException
from src.common.security_util import encode_passwd

class LoginService(object):
  """
    Clase utilizada para controlar la seguridad en el inicio de sesion y logout del usuario
  """

  def __init__(self):
    self.loginDao = LoginDao()
    self.securityService = SecurityService()

  def login(self, user, passwd) -> AppException:
    """
      Servicio utilizado para autenticar el usuario en el sistema y obtener un token valido

      Args:
        user: Usuario del sistema
        passwd: Password del usuario

      Returns:
        service_response: String que representa un token valido
    """
    log4py.info('## LoginService->login  ##')
    #log4py.info('user-> {0}'.format(user))
    #log4py.info('passwd-> {0}'.format(passwd))
    jws = None
    passwd_encode = None
    #encriptar el password para compararla en db
    passwd_encode = encode_passwd(passwd)
    #Validar el usuario en base de datos
    id_usuario = self.loginDao.valida_usuario(user, passwd_encode)
    log4py.info('id_usuario-> {0}'.format(id_usuario))
    #validar si existe in id de usuario en el sistema
    if(id_usuario == None):
      raise AppException('Usario o password incorrecto.')
    #calcular el jws del usuario
    jws = self.securityService.encode_jws(id_usuario, user)

    return jws
