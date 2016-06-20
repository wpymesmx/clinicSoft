__author__ = 'drunkenturtle'

from Log4py import log4py
from src.dao.SQLiteDao import SQLiteDao
from src.dao.row.login_row import row_id_usuario

class LoginDao(SQLiteDao):
  """
    Clase utilizada para hacer las operaciones necesarias del usuario
  """

  def __init__(self):
    pass

  def valida_usuario(self, user, passwd) -> Exception:
    """
      metodo utilizado para validar el usuario y el password del usuario en el sistema

      Args
        user: usuario del sistema
        passwd: password encriptado del usuario

      Returns:
        id_usuario: id del usaurio en base de datos
    """
    log4py.info('## LoginDao-> valida_usuario  ##')
    dao_response = None
    cursor = None

    try:
      self.open()
      self.set_row_factory(row_id_usuario)
      cursor = self.get_cursor()
      cursor.execute('''
        SELECT ID_USUARIO, USUARIO
        FROM USUARIO
        WHERE USUARIO = ?
              AND PASSWD = ?
      ''', (user, passwd))

      dao_response = cursor.fetchone()
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

    return dao_response



