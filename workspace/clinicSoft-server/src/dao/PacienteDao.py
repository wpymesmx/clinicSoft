__author__ = '@LLV'
from src.dao.SQLiteDao import SQLiteDao
from Log4py import log4py
from src.row.medico_row  import row_id_medico

class PacienteDao(SQLiteDao):
  """Gestion Pacientes Del Centro De Salud"""
  def __int__(self):
    pass

  def insert_paciente(self,pac_id,pac_nombre,pac_apellido_paterno,pac_apellido_materno,pac_fechan,pac_sexo,pac_domicilio,pac_celular,pac_correo,pac_ocupac,pac_tipo):
    """Gestión De Médico"""
    log4py.info('## insert_paciente dao  ##')
    dao_response = None
    cursor = None

    try:
      self.open()
      cursor = self.get_cursor()
      cursor.execute('''
        INSERT INTO PACIENTE (PAC_ID,PAC_NOMBRE,PAC_APELLIDO_PATERNO,PAC_APELLIDO_MATERNO,PAC_FECHAN,PAC_SEXO,PAC_DOMICILIO,PAC_CELULAR,PAC_CORREO,PAC_OCUPAC,PAC_TIPO)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      ''', (pac_id,pac_nombre,pac_apellido_paterno,pac_apellido_materno,pac_fechan,pac_sexo,pac_domicilio,pac_celular,pac_correo,pac_ocupac,pac_tipo))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

  def elimina_paciente(self,pac_id, pac_estado):
    log4py.info('## elimina_paciente dao  ##')
    dao_response = None
    cursor = None

    try:
      self.open()
      self.set_row_factory(row_id_medico)
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

  def update_paciente(self,pac_id,pac_nombre,pac_apellido_paterno,pac_apellido_materno,
                      pac_fechan,pac_sexo,pac_domicilio,pac_celular,pac_correo,pac_ocupac,pac_tipo):
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
        UPDATE  PACIENTE  SET  PAC_NOMBRE=?, PAC_APELLIDO_PATERNO=?,PAC_APELLIDO_MATERNO=?,PAC_FECHAN=?,PAC_SEXO=?,PAC_DOMICILIO=?,PAC_CELULAR=?,PAC_CORREO=?,PAC_OCUPAC=?,PAC_TIPO=?
        WHERE PAC_ID=?;
      ''', (pac_nombre,pac_apellido_paterno,pac_apellido_materno,pac_fechan,pac_sexo,pac_domicilio,pac_celular,pac_correo,pac_ocupac,pac_tipo,pac_id))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)