__author__ = '@LLV'

from src.dao.SQLiteDao import SQLiteDao
from Log4py import log4py
from src.row.medico_row  import row_id_medico

class MedicoDao(SQLiteDao):
  """Gestion Personal Del Centro D e Salud"""
  def __int__(self):
    pass

  def insert_medico(self,medi_id,med_cedula,med_nombre, med_ape_pat, med_ape_mat, med_fechan, med_celular,med_correo, med_turno, med_sexo):
    """Gestión De Médico"""
    log4py.info('## insert_medico dao  ##')
    dao_response = None
    cursor = None

    try:
      self.open()
      cursor = self.get_cursor()
      cursor.execute('''
        INSERT INTO MEDICO (MEDI_ID,MED_CEDULA,MED_NOMBRE,MED_APELLIDO_PAT, MED_APELLIDO_MAT,MED_FECHAN,MED_CELULAR, MED_CORREO,MED_TURNO,MED_SEXO)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      ''', (medi_id,med_cedula,med_nombre, med_ape_pat, med_ape_mat, med_fechan, med_celular,med_correo, med_turno, med_sexo))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

  def elimina_medico(self, med_id,medi_estado):
    log4py.info('## elimina_medico dao  ##')
    dao_response = None
    cursor = None

    try:
      self.open()
      self.set_row_factory(row_id_medico)
      cursor = self.get_cursor()
      cursor.execute('''
        UPDATE  MEDICO  SET  MEDI_ESTADO=?  WHERE MEDI_ID = ?;
      ''', (medi_estado,med_id))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err
    finally:
      self.close(cursor)

  def updateMedico(self,medi_id,med_cedula,med_nombre, med_ape_pat, med_ape_mat, med_fechan, med_celular,med_correo, med_turno, med_sexo):
    """
       Insertar un nuevo medicamento
    """
    log4py.info('##  update_medico dao ##')
    dao_response = None
    cursor = None
    print()
    try:
      self.open()
      cursor = self.get_cursor()
      cursor.execute('''
        UPDATE  MEDICO  SET  MED_CEDULA=?, MED_NOMBRE=?,MED_APELLIDO_PAT=?,MED_APELLIDO_MAT=?,MED_FECHAN=?,MED_CELULAR=?,MED_CORREO=?,MED_TURNO=?,MED_SEXO=?
        WHERE MEDI_ID=?;
      ''', (med_cedula,med_nombre, med_ape_pat, med_ape_mat, med_fechan, med_celular,med_correo, med_turno,med_sexo,medi_id))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)