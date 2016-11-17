__author__ = '@LLV'
from src.dao.SQLiteDao import SQLiteDao
from Log4py import log4py

from src.dao.row.paciente_row  import row_id_paciente
from src.dao.row.paciente_row import buscar_paciente_row
from src.dao.row.paciente_row import buscar_datos_paciente_row
from src.dao.row.paciente_row import row_historial_paciente

class PacienteDao(SQLiteDao):
  """Gestion Pacientes Del Centro De Salud"""
  def __int__(self):
    pass

  def insert_detalle_paciente(self,pac_id,his_nombre,his_sintoma,his_fecha,his_analisis):
    """Gestión De Médico"""
    log4py.info('## insert_detalle_paciente dao  ##')
    dao_response = None
    cursor = None
    his_estado='A'
    print(pac_id,his_nombre,his_sintoma,his_fecha,his_analisis)
    try:
      self.open()
      cursor = self.get_cursor()
      # se obtiene o calcula el siguiente pk de la tabla PACIENTE
      cursor.execute(''' SELECT IFNULL(MAX(HIS_ID), 0)+1 NEXT_ID_PAC FROM HISTORIAL_CLINICO''')
      his_id = cursor.fetchone()[0]
      # insertamos el nuevo medicamento en db
      cursor.execute('''
        INSERT INTO HISTORIAL_CLINICO(HIS_ID,PAC_ID,HIS_NOMBRE,HIS_SINTOMA,HIS_FECHA,HIS_ANALISIS,HIS_ESTADO)
        VALUES (?,?, ?, ?, ?, ?,?);
      ''', (his_id,pac_id,his_nombre,his_sintoma,his_fecha,his_analisis,his_estado))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

  def insert_analisis(self, his_id, ana_nombre, ana_analisis):
    """Gestión De Médico"""
    log4py.info('## insert_analisis dao  ##')
    dao_response = None
    cursor = None
    print(his_id, ana_nombre, ana_analisis)
    try:
      self.open()
      cursor = self.get_cursor()
      # se obtiene o calcula el siguiente pk de la tabla PACIENTE
      cursor.execute(''' SELECT IFNULL(MAX(ANA_ID), 0)+1 NEXT_ID_PAC FROM ANALISIS''')
      ana_id = cursor.fetchone()[0]
      # insertamos el nuevo doc. de análisis en db.
      cursor.execute('''
         INSERT INTO ANALISIS(ANA_ID,HIS_ID,ANA_NOMBRE,ANA_ANALISIS)
         VALUES (?,?,?,?);
       ''', (ana_id, his_id, ana_nombre, ana_analisis))
      self.commit()
    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

  def update_detalle_paciente(self,his_id, pac_id, his_nombre, his_sintoma,his_fecha,his_analisis,his_estado):
    """Gestión De Médico"""
    log4py.info('## insert_detalle_paciente dao  ##')
    dao_response = None
    cursor = None
    print("VALOR ANALISIS ANTES DE INSERT")
    print(his_analisis)
    try:
      self.open()
      cursor = self.get_cursor()
      cursor.execute('''
          UPDATE  HISTORIAL_CLINICO  SET HIS_ID=?, PAC_ID=?, HIS_NOMBRE=?, HIS_SINTOMA=?,HIS_FECHA=?,HIS_ANALISIS=?, HIS_ESTADO=?  WHERE HIS_ID=?;
        ''', (his_id, pac_id, his_nombre, his_sintoma,his_fecha, his_estado,his_analisis,his_id))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

  def insert_paciente(self, usu_id, pac_nombre, pac_apellido_paterno, pac_apellido_materno, pac_fechan, pac_fechar,
                      pac_sexo, pac_domicilio, pac_celular, pac_correo, pac_ocupac, pac_tipo, pac_foto):
    """Gestión De Médico"""
    log4py.info('## insert_paciente dao  ##')
    dao_response = None
    cursor = None
    pac_estado = 'A'
    try:
      self.open()
      cursor = self.get_cursor()
      # se obtiene o calcula el siguiente pk de la tabla PACIENTE
      cursor.execute(''' SELECT IFNULL(MAX(PAC_ID), 0)+1 NEXT_ID_PAC FROM PACIENTE ''')
      pac_id = cursor.fetchone()[0]
      # insertamos el nuevo medicamento en db
      cursor.execute('''
          INSERT INTO PACIENTE (PAC_ID,USU_ID,PAC_NOMBRE,PAC_APELLIDO_PATERNO,PAC_APELLIDO_MATERNO,PAC_FECHAN,PAC_FECHAR,PAC_SEXO,PAC_DOMICILIO,PAC_CELULAR,PAC_CORREO,PAC_OCUPAC,PAC_TIPO, PAC_FOTO, PAC_ESTADO)
          VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);
        ''', (pac_id, usu_id, pac_nombre, pac_apellido_paterno, pac_apellido_materno, pac_fechan, pac_fechar, pac_sexo,
              pac_domicilio, pac_celular, pac_correo, pac_ocupac, pac_tipo, pac_foto, pac_estado))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)
    return pac_id

  def elimina_paciente(self,pac_id, pac_estado):
    log4py.info('## elimina_paciente dao  ##')
    dao_response = None
    cursor = None

    try:
      self.open()
      self.set_row_factory(row_id_paciente)
      cursor = self.get_cursor()
      cursor.execute('''
        UPDATE PACIENTE SET PAC_ESTADO=? WHERE PAC_ID = ?;
      ''', (pac_estado,pac_id))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err
    finally:
      self.close(cursor)

  def update_paciente(self,pac_id,usu_id,pac_nombre,pac_apellido_paterno,pac_apellido_materno,
                      pac_fechan,pac_fechar,pac_sexo,pac_domicilio,pac_celular,pac_correo,pac_ocupac,pac_tipo,pac_foto,pac_estado):
    """
       Actualiza el registro de un paciente
    """
    log4py.info('##  update_paciente dao ##')
    dao_response = None
    cursor = None
    print()
    try:
      self.open()
      cursor = self.get_cursor()
      cursor.execute('''
        UPDATE  PACIENTE  SET PAC_ID=?, USU_ID=?, PAC_NOMBRE=?, PAC_APELLIDO_PATERNO=?,PAC_APELLIDO_MATERNO=?,PAC_FECHAN=?, PAC_FECHAR=?, PAC_SEXO=?,PAC_DOMICILIO=?,PAC_CELULAR=?,PAC_CORREO=?,PAC_OCUPAC=?,PAC_TIPO=?, PAC_FOTO=?, PAC_ESTADO=?
        WHERE PAC_ID=?;
      ''', (pac_id,usu_id,pac_nombre,pac_apellido_paterno,pac_apellido_materno,pac_fechan,pac_fechar,pac_sexo,pac_domicilio,pac_celular,pac_correo,pac_ocupac,pac_tipo,pac_foto,pac_estado,pac_id))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

  def buscar_paciente(self, pac_nombre, pac_paterno, pac_materno, pac_fechan, pac_fechar, pac_sexo):
    log4py.info('## buscar_paciente ##')
    dao_response = None
    cursor = None
    aux = 'A'
    try:
      self.open()
      self.set_row_factory(buscar_paciente_row)
      cursor = self.get_cursor()
      query = ('''
        SELECT PAC_ID,PAC_NOMBRE,PAC_APELLIDO_PATERNO, PAC_APELLIDO_MATERNO, PAC_FECHAN,PAC_FECHAR, PAC_SEXO, PAC_FOTO
        FROM PACIENTE
        WHERE PAC_ESTADO = ?
         ''')
      if pac_nombre != '':
        query += ' AND PAC_NOMBRE like \'%' + pac_nombre + '%\''

      if pac_paterno != '':
        query = query + ' AND PAC_APELLIDO_PATERNO like \'%' + pac_paterno + '%\''

      if pac_materno != '':
        query = query + ' AND PAC_APELLIDO_MATERNO like \'%' + pac_materno + '%\''

      if pac_fechan != '':
        query = query + ' AND PAC_FECHAN like \'%' + pac_fechan + '%\''

      if pac_fechar != '':
        query = query + ' AND PAC_FECHAR like \'%' + pac_fechar + '%\''

      if pac_sexo != '':
        query = query + ' AND PAC_SEXO like \'%' + pac_sexo + '%\''

      log4py.info(query)
      cursor.execute(query, (aux))
      dao_response = cursor.fetchall()
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

    return dao_response

  def existe_paciente(self, nombre, paterno, materno):
    log4py.info('## existe_paciente  ##')
    dao_response = None
    cursor = None
    aux = 'A'
    try:
      self.open()
      self.set_row_factory(row_id_paciente)
      cursor = self.get_cursor()
      cursor.execute('''
        SELECT PAC_ID FROM PACIENTE
        WHERE PAC_NOMBRE=?
        AND PAC_APELLIDO_PATERNO=?
        AND PAC_APELLIDO_MATERNO=?
        AND PAC_ESTADO=?
      ''', (nombre,paterno,materno,aux))

      dao_response = cursor.fetchall()
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)
    return dao_response

  def busca_datos_paciente(self,pac_id):
    log4py.info('## busca_datos_paciente  ##')
    dao_response = None
    cursor = None
    aux = 'A'
    try:
      self.open()
      self.set_row_factory(buscar_datos_paciente_row)
      cursor = self.get_cursor()
      cursor.execute('''
        SELECT  PAC_ID,USU_ID,PAC_NOMBRE,PAC_APELLIDO_PATERNO, PAC_APELLIDO_MATERNO, PAC_FECHAN,PAC_FECHAR, PAC_SEXO,
        PAC_DOMICILIO, PAC_CELULAR, PAC_CORREO, PAC_OCUPAC, PAC_TIPO, PAC_FOTO, PAC_ESTADO
        FROM PACIENTE  WHERE PAC_ID = ? AND PAC_ESTADO=?
      ''', (pac_id,aux))

      dao_response = cursor.fetchall()
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)
    return dao_response

  def busca_historial_paciente(self, id_pac):
    log4py.info('## busca_historial_paciente  ##')
    dao_response = None
    cursor = None
    aux = 'A'
    try:
      self.open()
      self.set_row_factory(row_historial_paciente)
      cursor = self.get_cursor()
      cursor.execute('''
          SELECT  HIS_ID,PAC_ID,HIS_NOMBRE,HIS_SINTOMA,HIS_FECHA,HIS_ANALISIS,HIS_ESTADO
          FROM HISTORIAL_CLINICO  WHERE PAC_ID = ? AND HIS_ESTADO=?
        ''', (id_pac, aux))

      dao_response = cursor.fetchall()
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)
    return dao_response
