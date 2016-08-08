from src.dao.SQLiteDao import SQLiteDao
from src.dao.row.medicamento_row import consulta_medicamento_row
from src.dao.row.medicamento_row import llenar_combo_row
from src.dao.row.medicamento_row import row_id_medicamento
from Log4py import log4py

class MedicamentoDao(SQLiteDao):
  """
    Clase utiliza para gestionar el cátalogo de medicamento
  """

  def __init__(self):
    pass

  def buscar_medicamento(self, nombre_comercial,nombre_generico,farmaceutica, elaborado_en, condicion_venta):
    log4py.info('## consultar_medicamento  ##')
    dao_response = None
    cursor = None
    aux = 'A'

    try:
      self.open()
      self.set_row_factory(consulta_medicamento_row)
      cursor = self.get_cursor()
      query = ('''
        SELECT MED_ID,MED_NOMBRE_COMERCIAL, MED_NOMBRE_GENERICO, MED_FARMACEUTICA, MED_ELABORADO_EN, MED_CONDICION_VENTA, MED_ESTADO
        FROM MEDICAMENTO
        WHERE MED_ESTADO = ?
         ''')



      if nombre_comercial != '':
        query += ' AND MED_NOMBRE_COMERCIAL like \'%' + nombre_comercial + '%\''

      if nombre_generico != '':
        query = query + ' AND MED_NOMBRE_GENERICO like \'%' + nombre_generico + '%\''

      if farmaceutica != '':
        query = query + ' AND MED_FARMACEUTICA like \'%' + farmaceutica + '%\''

      if elaborado_en != '':
        query = query + ' AND MED_ELABORADO_EN like \'%' + elaborado_en + '%\''

      if condicion_venta != '':
        query = query + ' AND MED_CONDICION_VENTA like \'%' + condicion_venta + '%\''

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

  def existe_medicamento(self,nombre_comercial):
    log4py.info('## existe_medicamento  ##')
    dao_response = None
    cursor = None
    aux = '******lo que lleva dao'
    print(aux, nombre_comercial)
    try:
      self.open()
      self.set_row_factory(row_id_medicamento)
      cursor = self.get_cursor()
      cursor.execute('''
        SELECT MED_ID FROM MEDICAMENTO WHERE MED_NOMBRE_COMERCIAL = ?
      ''',(nombre_comercial))
      dao_response = cursor.fetchall()
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)
    return dao_response

  def llenar_combo_medicamento(self):
    log4py.info('## llenar_combo_medicamento  ##')
    dao_response = None
    cursor = None
    aux = 'A'
    try:
      self.open()
      self.set_row_factory(consulta_medicamento_row)
      cursor = self.get_cursor()
      cursor.execute('''
        SELECT MED_ID,MED_NOMBRE_COMERCIAL, MED_NOMBRE_GENERICO, MED_FARMACEUTICA, MED_ELABORADO_EN, MED_CONDICION_VENTA, MED_ESTADO
        FROM MEDICAMENTO
        WHERE MED_ESTADO = ?
      ''', (aux))

      dao_response = cursor.fetchall()
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)
    return dao_response

  def insertar_medicamento(self, nombre_comercial, nombre_generico, farmaceutica, elaborado_en, condicion_venta,estado):
    """
       Insertar un nuevo medicamento
    """
    log4py.info('##  insertar_medicamento  ##')
    dao_response = None
    cursor = None

    try:
      self.open()
      cursor = self.get_cursor()
      # se obtiene o calcula el siguiente pk de la tabla MEDICAMENTO
      cursor.execute(''' SELECT IFNULL(MAX(MED_ID), 0)+1 NEXT_ID_MED FROM MEDICAMENTO ''')
      id_med = cursor.fetchone()[0]
      # insertamos el nuevo medicamento en db
      cursor.execute('''
        INSERT INTO MEDICAMENTO (MED_ID,MED_NOMBRE_COMERCIAL, MED_NOMBRE_GENERICO, MED_FARMACEUTICA, MED_ELABORADO_EN, MED_CONDICION_VENTA,MED_ESTADO)
        VALUES (?, ?, ?, ?, ?, ?,?);
      ''', (id_med, nombre_comercial, nombre_generico, farmaceutica, elaborado_en, condicion_venta,estado))
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

  def actualizar_medicamento(self,nombre_comercial, nombre_generico, farmaceutica, elaborado_en, condicion_venta,estado,id_med):
    """
       Insertar un nuevo medicamento
    """
    print(nombre_comercial, nombre_generico, farmaceutica, elaborado_en, condicion_venta,estado,id_med)
    log4py.info('##  update_medicamento dao ##')
    dao_response = None
    cursor = None

    try:
      self.open()
      cursor = self.get_cursor()
      cursor.execute('''
        UPDATE  MEDICAMENTO SET MED_NOMBRE_COMERCIAL=?, MED_NOMBRE_GENERICO=?, MED_FARMACEUTICA=?, MED_ELABORADO_EN=?, MED_CONDICION_VENTA=?, MED_ESTADO=?
        WHERE MED_ID=?;
      ''', (nombre_comercial, nombre_generico, farmaceutica, elaborado_en, condicion_venta,estado,id_med))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)
