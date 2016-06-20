__author__ = 'drunkenturtle'

import sqlite3

class SQLiteDao(object):
  """
    Clase utilizada para manejar la coneccion a una base de datos SQLite
  """

  def __init__(self):
    self.conn = None
    pass

  def open(self):
    """
      metodo utilizado para abrir una conecion a la base de dato y obtener un cursor para iniciar
      la transaccionabilidad

      Returns:
        cursor: cursor relacionado a una conexion a la base de datos para ejecutar transacciones
    """
    self.conn = sqlite3.connect('clinicSoft.sqlite3')

  def get_cursor(self):
    """
      Metodo para crear un objeto cursor a partir de una conexion abierta
    """
    return self.conn.cursor()

  def close(self, cursor=None):
    """
      Metodo utilizado para cerrar la coneccion que se encuentra abierta
    """
    if(cursor != None):
      cursor.close()

    self.conn.close()
    self.conn = None

  def commit(self):
    """
      Metodo utilizado para hacer commit a las transacciones que se realizaron en la base de datos
    """
    self.conn.commit()

  def rollback(self):
    """
      Metodo utilizado para hacer rollback si ocurre un error durante la transaccion
    """
    self.conn.rollback()

  def set_row_factory(self, row_factory=sqlite3.Row):
    """
      Metodo utilizado para customisar la respuesta del cursor o los objetos del cursor
      Nota: Este metodo debe ser llamado antes de crear un cursor
    """
    self.conn.row_factory = row_factory

