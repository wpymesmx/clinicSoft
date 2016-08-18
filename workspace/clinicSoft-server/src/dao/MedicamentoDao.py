from builtins import print
from src.dao.SQLiteDao import SQLiteDao
from src.dao.row.medicamento_row import consulta_medicamento_row
from src.dao.row.medicamento_row import llenar_combo_row
from src.dao.row.medicamento_row import row_id_medicamento
from src.dao.row.medicamento_row import llenar_combo_almacen_row
from src.dao.row.medicamento_row import row_id_detalle_medicamento
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
    log4py.info('## llenar_combo_almacen  ##')
    dao_response = None
    cursor = None
    aux='A'
    try:
      self.open()
      self.set_row_factory(row_id_medicamento)
      cursor = self.get_cursor()
      cursor.execute('''
        SELECT MED_ID
        FROM MEDICAMENTO
        WHERE MED_NOMBRE_COMERCIAL = ? AND MED_ESTADO=?
      ''', (nombre_comercial,aux))

      dao_response = cursor.fetchall()
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)
    return dao_response

  def existe_detalle_medicamento(self, presentacion, id_med):
    log4py.info('## existe_detalle_medicamento  ##')
    dao_response = None
    cursor = None
    aux = 0
    try:
      self.open()
      self.set_row_factory(row_id_detalle_medicamento)
      cursor = self.get_cursor()
      cursor.execute('''
        SELECT DEM_ID
        FROM DETALLE_MEDICAMENTO
        WHERE DEM_PRESENTACION=? AND MED_FK=?
      ''', (presentacion,id_med))

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

  def llenar_combo_almacen(self):
    log4py.info('## llenar_combo_almacen  ##')
    dao_response = None
    cursor = None
    aux = 'A'
    try:
      self.open()
      self.set_row_factory(llenar_combo_almacen_row)
      cursor = self.get_cursor()
      cursor.execute('''
        SELECT ALM_ID, ALM_UBICACION
        FROM ALMACEN
        WHERE ALM_ESTADO = ?
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
    return id_med



  def insertar_detalle_medicamento(self,id_med,id_almacen ,presentacion, cantidad_maxima, cantidad_minima, existencia, descripcion,indicasiones,via_aministracion,fecha_alta,fecha_caducidad):
    """
       Insertar un nuevo detalle medicamento
    """
    print(id_med,id_almacen ,presentacion, cantidad_maxima, cantidad_minima, existencia, descripcion,indicasiones,via_aministracion,fecha_alta,fecha_caducidad)
    log4py.info('##  insertar_detalle_medicamento  ##')
    dao_response = None
    cursor = None
    print(id_med)
    try:
      self.open()
      cursor = self.get_cursor()
      # se obtiene o calcula el siguiente pk de la tabla MEDICAMENTO
      cursor.execute(''' SELECT IFNULL(MAX(DEM_ID), 0)+1 NEXT_ID_DEM FROM DETALLE_MEDICAMENTO ''')
      id_dem = cursor.fetchone()[0]
      # insertamos el nuevo detalle medicamento en db
      cursor.execute('''
        INSERT INTO DETALLE_MEDICAMENTO (DEM_ID,MED_FK,ALM_FK,DEM_PRESENTACION,DEM_CANTIDAD_MAXIMA,DEM_CANTIDAD_MINIMA,
        DEM_EN_EXISTENCIA,DEM_DESCRIPCION,DEM_INDICACIONES,DEM_VIA_ADMIN_DOSIS,DEM_FECHA_ALTA,DEM_FECHA_CADUCIDAD)
        VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?,?);
      ''', (id_dem,id_med,id_almacen,presentacion,cantidad_maxima,cantidad_minima,existencia,descripcion,indicasiones,via_aministracion,fecha_alta,fecha_caducidad))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

  def eliminar_detalle_medicamento(self, presentacion, id_med):
    log4py.info('## elimina_medicamento dao  ##')
    dao_response = None
    cursor = None

    try:
      self.open()
      self.set_row_factory(row_id_detalle_medicamento)
      cursor = self.get_cursor()
      cursor.execute('''
        DELETE FROM DETALLE_MEDICAMENTO WHERE DEM_PRESENTACION = ? AND MED_FK=?
      ''', (presentacion,id_med))
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
