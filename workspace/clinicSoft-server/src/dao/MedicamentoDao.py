from src.dao.SQLiteDao import SQLiteDao
from src.dao.row.medicamento_row import consulta_medicamento_row
from src.dao.row.medicamento_row import row_id_medicamento
from Log4py import log4py

class MedicamentoDao(SQLiteDao):
  """
    Clase utiliza para gestionar el cátalogo de medicamento
  """

  def __init__(self):
    pass

  def buscar_medicamento(self, nombre_comercial, nombre_generico):
    log4py.info('## consultar_medicamento  ##')
    dao_response = None
    cursor = None

    try:
      self.open()
      self.set_row_factory(consulta_medicamento_row)
      cursor = self.get_cursor()
      cursor.execute('''
        SELECT MED_ID,MED_NOMBRE_COMERCIAL, MED_NOMBRE_GENERICO
        FROM MEDICAMENTO
        WHERE MED_NOMBRE_COMERCIAL = ?
        OR MED_NOMBRE_GENERICO = ?
      ''', (nombre_comercial, nombre_generico))

      dao_response = cursor.fetchall()
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

    return dao_response

  def insertar_medicamento(self, cve_medicamento, nombre_comercial, nombre_generico, farmaceutica, elaborado_en, condicion_venta):
    """
       Insertar un nuevo medicamento
    """
    log4py.info('##  insertar_medicamento  ##')
    dao_response = None
    cursor = None

    try:
      self.open()
      cursor = self.get_cursor()
      cursor.execute('''
        INSERT INTO MEDICAMENTO (MED_ID,MED_NOMBRE_COMERCIAL, MED_NOMBRE_GENERICO, MED_FARMACEUTICA, MED_ELABORADO_EN, MED_CONDICION_VENTA)
        VALUES (?, ?, ?, ?, ?, ?);
      ''', (cve_medicamento, nombre_comercial, nombre_generico, farmaceutica, elaborado_en, condicion_venta))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

  def eliminar_medicamento(self, med_id):
    log4py.info('## elimina_medicamento dao  ##')
    dao_response = None
    cursor = None

    try:
      self.open()
      self.set_row_factory(row_id_medicamento)
      cursor = self.get_cursor()
      cursor.execute('''
        DELETE FROM MEDICAMENTO WHERE MED_ID = ?;
      ''', (med_id))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

  def actualizar_medicamento(self,nombre_comercial, nombre_generico, farmaceutica, elaborado_en, condicion_venta):
    """
       Insertar un nuevo medicamento
    """
    log4py.info('##  update_medicamento dao ##')
    dao_response = None
    cursor = None

    try:
      self.open()
      cursor = self.get_cursor()
      cursor.execute('''
        UPDATE  MEDICAMENTO SET MED_NOMBRE_COMERCIAL=?, MED_NOMBRE_GENERICO=?, MED_FARMACEUTICA=?, MED_ELABORADO_EN=?, MED_CONDICION_VENTA=?
        WHERE MED_NOMBRE_COMERCIAL=?;
      ''', (nombre_comercial, nombre_generico, farmaceutica, elaborado_en, condicion_venta))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)
