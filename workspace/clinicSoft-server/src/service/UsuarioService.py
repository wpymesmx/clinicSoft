__author__ = 'drunkenturtle'

from Log4py import log4py
from src.dao.UsuarioDao import UsuarioDao
from src.dao.dto.UsuarioDto import UsuarioDto
from src.common.security_util import encode_passwd

class UsuarioService(object):
  """
    Clase utilizada para manejar las operaciones del usuario en el sistema
  """

  def __init__(self):
    self.usuarioDao = UsuarioDao()

  def insertar_usuario(self, user, passwd):
    """
      Metodo utilizado para agregar un nuevo usuario en el sistema
    """
    log4py.info('## UsuarioService-> add_usuario  ##')
    usuarioDto = UsuarioDto()
    UsuarioDto.user = user
    UsuarioDto.passwd = encode_passwd(passwd)
    return self.usuarioDao.insertar_usuario(UsuarioDto)
