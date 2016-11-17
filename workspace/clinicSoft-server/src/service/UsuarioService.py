__author__ = 'drunkenturtle'

from Log4py import log4py
from src.dao.UsuarioDao import UsuarioDao

class UsuarioService(object):
  """
    Clase utilizada para manejar las operaciones del usuario en el sistema
  """

  def __init__(self):
    self.usuarioDao = UsuarioDao()

  def getAllUsers(self):
    """
      Metodo utilizado para obtener todos los usuarios activos en el sistema
    """
    log4py.info('## UsuarioService-> getAllUsers  ##')
    return self.usuarioDao.getAllUsers()
