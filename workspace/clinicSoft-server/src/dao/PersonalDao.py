__author__ = 'drunenkenturtle'

from Log4py import log4py
from src.dao.SQLiteDao import SQLiteDao
from src.dao.row.row_personal import row_personal

class PersonalDao(SQLiteDao):
  """
    Clase utilizada para controlar el flujo  de personal
  """

  def __init__(self):
    """
    """
    pass

  def insert_personal(self, personalDto):
    """
      metodo para insertar un nuevo registro en db
    """
    log4py.info('# dao->insert_personal  #')
    cursor = None
    pers_id = 0
    ACTIVO = 'A'

    try:
      self.open()
      cursor = self.get_cursor()
      #se obtiene o calcula el siguiente pk de la tabla
      cursor.execute(''' SELECT IFNULL(MAX(PERS_ID), 0)+1 NEXT_PERS_ID FROM PERSONAL ''')
      pers_id = cursor.fetchone()[0]
      #insertamos el nuevo registro en db
      cursor.execute('''
        INSERT INTO PERSONAL(PERS_ID, USU_ID, PERS_NOMBRE, PERS_APELLIDO_PAT, PERS_APELLIDO_MAT, PERS_CEDULA, PERS_FECHAN, PERS_CELULAR, PERS_CORREO, PERS_TURNO, PERS_SEXO, PERS_ESTADO)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ''', (personalDto.pers_id, personalDto.usu_id, personalDto.pers_nombre, personalDto.pers_apellido_pat, personalDto.pers_apellido_mat, personalDto.pers_cedula, personalDto.pers_fechan, personalDto.pers_celular, personalDto.pers_correo, personalDto.pers_turno, personalDto.pers_sexo, ACTIVO))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

    return pers_id

  def update_personal(self, personalDto):
    """
      metodo para actualizar un registro en db
    """
    log4py.info('# dao->update_personal  #')
    cursor = None

    try:
      self.open()
      cursor = self.get_cursor()
      #actualizar el registro en db
      cursor.execute('''
        UPDATE PERSONAL
        SET USU_ID = ?, PERS_NOMBRE = ?, PERS_APELLIDO_PAT = ?, PERS_APELLIDO_MAT = ?, PERS_CEDULA = ?, PERS_FECHAN = ?,
            PERS_CELULAR = ?, PERS_CORREO = ?, PERS_TURNO = ?, PERS_SEXO = ?, PERS_ESTADO = ?
        WHERE PERS_ID = ?
      ''', (personalDto.usu_id, personalDto.pers_nombre, personalDto.pers_apellido_pat, personalDto.pers_apellido_mat,
            personalDto.pers_cedula, personalDto.pers_fechan, personalDto.pers_celular, personalDto.pers_correo, personalDto.pers_turno,
            personalDto.pers_sexo, personalDto.pers_estado, personalDto.pers_id))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

  def activar_personal(self, pers_id):
    """
      metodo para activar una persona en db
    """
    log4py.info('# dao->activar_personal  #')
    cursor = None
    ACTIVO = 'A'

    try:
      self.open()
      cursor = self.get_cursor()
      #actualizar el registro en db
      cursor.execute('''
        UPDATE PERSONAL
        SET PERS_ESTADO = ?
        WHERE PERS_ID = ?
      ''', (ACTIVO, pers_id))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

  def inactivar_personal(self, pers_id):
    """
      metodo para inactivar una persona en db
    """
    log4py.info('# dao->inactivar_personal #')
    cursor = None
    INACTIVO = 'I'

    try:
      self.open()
      cursor = self.get_cursor()
      #actualizar el registro en db
      cursor.execute('''
        UPDATE PERSONAL
        SET PERS_ESTADO = ?
        WHERE PERS_ID = ?
      ''', (INACTIVO, pers_id))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

  def getPersonalById(self, pers_id):
    """
      metodo utilizado para obtener un personal por id
    """
    log4py.info('## personalDao-> getPersonalById ##')
    response = None
    cursor = None

    try:
      self.open()
      self.set_row_factory(row_personal)
      cursor = self.get_cursor()
      cursor.execute('''
        SELECT PERS_ID, USU_ID,PERS_CEDULA, PERS_NOMBRE, PERS_APELLIDO_PAT, PERS_APELLIDO_MAT, PERS_FECHAN, PERS_CELULAR, PERS_CORREO,
              PERS_TURNO, PERS_SEXO, PERS_ESTADO
        FROM PERSONAL
        WHERE PERS_ID = ?
      ''', (pers_id))
      response = cursor.fetchone()
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

    return response

  def getAllPersonal(self):
    """
      metodo utilizado para obtener todas las personal registras en db
    """
    log4py.info('## personalDao-> getAllPersonal  ##')
    response = None
    cursor = None

    try:
      self.open()
      self.set_row_factory(row_personal)
      cursor = self.get_cursor()
      cursor.execute('''
        SELECT PERS_ID, USU_ID, PERS_NOMBRE, PERS_APELLIDO_PAT, PERS_APELLIDO_MAT, PERS_CEDULA, PERS_FECHAN, PERS_CELULAR, PERS_CORREO,
              PERS_TURNO, PERS_SEXO, PERS_ESTADO
        FROM PERSONAL
      ''')
      response = cursor.fetchall()
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

    return response

  def getPersonalByFilter(self, personalDto):
    """
      metodo utilizado parabuscar todas las personas por medio de un filtro en la busqueda
    """
    log4py.info('## personalDao-> getPersonalByFilter ##')
    response = None
    cursor = None
    query = ''
    params = []

    try:
      self.open()
      self.set_row_factory(row_personal)
      cursor = self.get_cursor()
      query = '''
        SELECT PERS_ID, USU_ID, PERS_NOMBRE, PERS_APELLIDO_PAT, PERS_APELLIDO_MAT, PERS_CEDULA, PERS_FECHAN, PERS_CELULAR, PERS_CORREO,
              PERS_TURNO, PERS_SEXO, PERS_ESTADO
        FROM PERSONAL
      '''
      query += ' WHERE PERS_NOMBRE LIKE ?'

      if(personalDto.pers_nombre != None and personalDto.pers_nombre != ''):
        params.append('%' + personalDto.pers_nombre + '%')
      else:
        params.append('%')

      if(personalDto.pers_apellido_pat != None and personalDto.pers_apellido_pat != ''):
        query += ' AND PERS_APELLIDO_PAT LIKE ?'
        params.append('%' + personalDto.pers_apellido_pat + '%')

      if(personalDto.pers_apellido_mat != None and personalDto.pers_apellido_mat != ''):
        query += ' AND PERS_APELLIDO_MAT LIKE ?'
        params.append('%' + personalDto.pers_apellido_mat + '%')

      if(personalDto.pers_fechan != None and personalDto.pers_fechan != ''):
        query += ' AND PERS_FECHAN = ?'
        params.append(personalDto.pers_fechan)

      if(personalDto.pers_celular != None and personalDto.pers_celular != ''):
        query += ' AND PERS_CELULAR LIKE ?'
        params.append('%' + personalDto.pers_celular + '%')

      if(personalDto.pers_cedula != None and personalDto.pers_cedula != ''):
        query += ' AND PERS_CEDULA LIKE ?'
        params.append('%' + personalDto.pers_cedula + '%')

      if(personalDto.pers_correo != None and personalDto.pers_correo != ''):
        query += ' AND PERS_CORREO LIKE ?'
        params.append('%' + personalDto.pers_correo + '%')

      if(personalDto.pers_turno != None and personalDto.pers_turno != ''):
        query += ' AND PERS_TURNO = ?'
        params.append(personalDto.pers_turno)

      if(personalDto.pers_sexo != None and personalDto.pers_sexo != ''):
        query += ' AND PERS_SEXO = ?'
        params.append(personalDto.pers_sexo)

      if(personalDto.pers_estado != None and personalDto.pers_estado != ''):
        query += ' AND PERS_ESTADO = ?'
        params.append(personalDto.pers_estado)
      #log4py.info('params: {0}, query: {1}'.format(params, query))
      cursor.execute(query, params)
      response = cursor.fetchall()
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

    return response

  def getPersonalByNombreApe(self, personalDto):
    """
      metodo utilizado parabuscar todas las personas por nombre y apellidos
    """
    log4py.info('## personalDao-> getPersonalByNombreApe ##')
    response = None
    cursor = None
    query = ''
    params = []
    ACTIVO = 'A'
    INACTIVO = 'I'

    try:
      self.open()
      self.set_row_factory(row_personal)
      cursor = self.get_cursor()
      query = '''
        SELECT PERS_ID, USU_ID, PERS_CEDULA, PERS_NOMBRE, PERS_APELLIDO_PAT, PERS_APELLIDO_MAT, PERS_FECHAN, PERS_CELULAR, PERS_CORREO,
              PERS_TURNO, PERS_SEXO, PERS_ESTADO
        FROM PERSONAL WHERE (PERS_ESTADO = ? OR PERS_ESTADO = ?)
      '''
      params.append(ACTIVO)
      params.append(INACTIVO)

      if(personalDto.pers_nombre != None and personalDto.pers_nombre != ''):
        query += ' AND PERS_NOMBRE = ?'
        params.append(personalDto.pers_nombre)

      if(personalDto.pers_apellido_pat != None and personalDto.pers_apellido_pat != ''):
        query += ' AND PERS_APELLIDO_PAT = ?'
        params.append(personalDto.pers_apellido_pat)

      if(personalDto.pers_apellido_mat != None and personalDto.pers_apellido_mat != ''):
        query += ' AND PERS_APELLIDO_MAT = ?'
        params.append(personalDto.pers_apellido_mat)

      cursor.execute(query, params)
      response = cursor.fetchall()
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

    return response
