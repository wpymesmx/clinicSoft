__author__ = 'drunenkenturtle'

from Log4py import log4py
from src.dao.SQLiteDao import SQLiteDao
from src.dao.row.usuario_row import usuario_row

class UsuarioDao(SQLiteDao):
  """
    Clase utilizada para controlar las operaciones del usuario del sistema
  """

  def __init__(self):
   pass

  def getAllUsers(self):
    """
      Metodo utilizado para obtener todos los usuarios activos en el sistema
    """
    log4py.info('## UsuarioDao-> getAllUsers ##')
    cursor = None
    response = None
    ACTIVO = 'A'

    try:
      self.open()
      self.set_row_factory(usuario_row)
      cursor = self.get_cursor()
      cursor.execute('''
        SELECT USU_ID, TIU_ID, USU_LOGIN, USU_ESTADO, USU_FECHA_ALTA, USU_FECHA_VENCIMIENTO, USU_CORREO
        FROM USUARIO
        WHERE USU_ESTADO = ?
      ''', (ACTIVO))
      response = cursor.fetchall()
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

    return response
