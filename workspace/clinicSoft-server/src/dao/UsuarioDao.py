__author__ = 'drunenkenturtle'

from Log4py import log4py
from src.dao.SQLiteDao import SQLiteDao

class UsuarioDao(SQLiteDao):
  """
    Clase utilizada para controlar las operaciones del usuario del sistema
  """

  def __init__(self):
   pass

  def insertar_usuario(self, newUsuario):
    """
      Metodo utilizado para agregar un nuevo usuario al sistema
    """
    log4py.info('## UsuarioDa-> add_usuario ##')
    cursor = None
    id_usuario = 0

    try:
      self.open()
      cursor = self.get_cursor()
      #se obtiene o calcula el siguiente pk de la tabla USUARIO
      cursor.execute(''' SELECT IFNULL(MAX(ID_USUARIO), 0)+1 NEXT_ID_USUARIO FROM USUARIO ''')
      id_usuario = cursor.fetchone()[0]
      #insertamos el nuevo usuario en db
      cursor.execute('''
        INSERT INTO USUARIO(ID_USUARIO, USUARIO, PASSWD) VALUES(?, ?, ?)
      ''', (id_usuario, newUsuario.user, newUsuario.passwd))

      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

    return id_usuario
