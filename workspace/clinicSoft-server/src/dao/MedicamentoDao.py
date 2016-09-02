from builtins import print
from src.dao.SQLiteDao import SQLiteDao
from src.dao.row.medicamento_row import consulta_medicamento_row
from src.dao.row.medicamento_row import llenar_combo_row
from src.dao.row.medicamento_row import row_id_medicamento
from src.dao.row.medicamento_row import llenar_combo_almacen_row
from src.dao.row.medicamento_row import row_id_detalle_medicamento
from src.dao.row.detalle_medicamento_row import llenar_combo_grupos_row
from src.dao.row.detalle_medicamento_row import consulta_detalles_row
from Log4py import log4py

class MedicamentoDao(SQLiteDao):
  """
    Clase utiliza para gestionar el cátalogo de medicamento
  """

  def __init__(self):
    pass

  def buscar_medicamento(self, nombre_comercial,nombre_generico):
    log4py.info('## consultar_medicamento  ##')
    dao_response = None
    cursor = None
    aux = 'A'

    try:
      self.open()
      self.set_row_factory(consulta_medicamento_row)
      cursor = self.get_cursor()
      query = ('''
        SELECT MED_ID,MED_NOMBRE_COMERCIAL, MED_NOMBRE_GENERICO, MED_ESTADO
        FROM MEDICAMENTO
        WHERE MED_ESTADO = ?
         ''')



      if nombre_comercial != '':
        query += ' AND MED_NOMBRE_COMERCIAL like \'%' + nombre_comercial + '%\''

      if nombre_generico != '':
        query = query + ' AND MED_NOMBRE_GENERICO like \'%' + nombre_generico + '%\''

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

  def buscar_detalles(self,id_med):
    log4py.info('## buscar_detalles  ##')
    dao_response = None
    cursor = None
    aux = 0
    print('el id_med para buscar detalles')
    print(id_med)
    try:
      self.open()
      self.set_row_factory(consulta_detalles_row)
      cursor = self.get_cursor()
      cursor.execute('''
        SELECT DEM_ID, GRU_FK, MED_FK, CODIGO_BARRAS, DEM_PRESENTACION, DEM_DESCRIPCION, DEM_CANTIDAD_MAXIMA,
        DEM_CANTIDAD_MINIMA, DEM_EN_EXISTENCIA, DEM_INDICACIONES, DEM_VIA_ADMIN_DOSIS,DEM_FECHA_ALTA,
        DEM_FECHA_CADUCIDAD, DEM_CONDICION_VENTA,DEM_PRECIO, DEM_IVA, DEM_FARMACEUTICA, DEM_ELABORADO_EN
        FROM DETALLE_MEDICAMENTO
        WHERE MED_FK=? AND DEM_ID>?
      ''', (id_med,aux))

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

  def llenar_combo_grupos(self):
    log4py.info('## llenar_combo_grupos  ##')
    dao_response = None
    cursor = None
    aux = 'A'
    try:
      self.open()
      self.set_row_factory(llenar_combo_grupos_row)
      cursor = self.get_cursor()
      cursor.execute('''
        SELECT GRU_ID, GRU_NOMBRE
        FROM GRUPOS
        WHERE GRU_ESTADO = ?
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

  def insertar_medicamento(self, nombre_comercial, nombre_generico, estado):
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
        INSERT INTO MEDICAMENTO (MED_ID, MED_NOMBRE_COMERCIAL, MED_NOMBRE_GENERICO, MED_ESTADO)
        VALUES (?, ?, ? ,?);
      ''', (id_med, nombre_comercial, nombre_generico,estado))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)
    return id_med



  def insertar_detalle_medicamento(self,id_grupo, id_med, codigo_barras, presentacion,descripcion,
                                   cantidad_maxima, cantidad_minima, existencia,indicasiones,
                                   via_aministracion,fecha_alta,fecha_caducidad, condicion_venta, precio, iva, farmaceutica, elaborado_en):
    """
       Insertar un nuevo detalle medicamento
    """
    print(id_grupo, id_med, codigo_barras, presentacion,descripcion,
                                   cantidad_maxima, cantidad_minima, existencia,indicasiones,
                                   via_aministracion,fecha_alta,fecha_caducidad, condicion_venta, precio, iva, farmaceutica, elaborado_en)
    log4py.info('##  insertar_detalle_medicamento  ##')
    dao_response = None
    cursor = None
    print(id_med)
    estado='A'
    try:
      self.open()
      cursor = self.get_cursor()
      # se obtiene o calcula el siguiente pk de la tabla MEDICAMENTO
      cursor.execute(''' SELECT IFNULL(MAX(DEM_ID), 0)+1 NEXT_ID_DEM FROM DETALLE_MEDICAMENTO ''')
      id_dem = cursor.fetchone()[0]
      # insertamos el nuevo detalle medicamento en db
      cursor.execute('''
        INSERT INTO DETALLE_MEDICAMENTO (DEM_ID, GRU_FK, MED_FK, CODIGO_BARRAS, DEM_PRESENTACION, DEM_DESCRIPCION, DEM_CANTIDAD_MAXIMA, DEM_CANTIDAD_MINIMA,
        DEM_EN_EXISTENCIA, DEM_INDICACIONES, DEM_VIA_ADMIN_DOSIS, DEM_FECHA_ALTA, DEM_FECHA_CADUCIDAD, DEM_CONDICION_VENTA, DEM_PRECIO, DEM_IVA, DEM_FARMACEUTICA,
        DEM_ELABORADO_EN, DEM_ESTADO)
        VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?,?, ?, ?, ?, ?, ?, ?, ?);
      ''', (id_dem,id_grupo, id_med, codigo_barras, presentacion,descripcion, cantidad_maxima, cantidad_minima, existencia,indicasiones,
                                   via_aministracion,fecha_alta,fecha_caducidad, condicion_venta, precio, iva, farmaceutica, elaborado_en,estado))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

  def update_detalle_medicamento(self,dem_id, id_grupo, id_med, presentacion,descripcion,
                                   cantidad_maxima, cantidad_minima, existencia,indicasiones,
                                   via_aministracion,fecha_alta,fecha_caducidad, condicion_venta, precio, iva, farmaceutica, elaborado_en):
    """
       Update un detalle medicamento
    """
    print(dem_id, id_grupo, id_med, presentacion,descripcion, cantidad_maxima, cantidad_minima, existencia,indicasiones,
                                   via_aministracion,fecha_alta,fecha_caducidad, condicion_venta, precio, iva, farmaceutica, elaborado_en)
    log4py.info('##  update_detalle_medicamento  ##')
    dao_response = None
    cursor = None
    try:
      self.open()
      cursor = self.get_cursor()
      # Se actualiza el detalle medicamento en db
      cursor.execute('''
        UPDATE  DETALLE_MEDICAMENTO SET DEM_ID=?, GRU_FK=?, MED_FK=?, DEM_PRESENTACION=?, MED_DESCRIPCION=?, DEM_CANTIDAD_MAXIMA=?, DEM_CANTIDAD_MINIMA=?,
        DEM_EN_EXISTENCIA=?, DEM_DESCRIPCION=?, DEM_INDICACIONES=?, DEM_VIA_ADMIN_DOSIS=?, DEM_FECHA_ALTA=?, DEM_FECHA_CADUCIDAD=?,
        DEM_CONDICION_VENTA=?, DEM_PRECIO=?, DEM_IVA=?, DEM_FARMACEUTICA=?, DEM_ELABORADO_EN=?
        WHERE DEM_ID=?
      ''', (dem_id,id_grupo, id_med, presentacion,descripcion, cantidad_maxima, cantidad_minima, existencia,indicasiones,
            via_aministracion,fecha_alta,fecha_caducidad, condicion_venta, precio, iva, farmaceutica, elaborado_en))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

  def eliminar_detalle_medicamento(self, dem_id):
    log4py.info('## eliminar_detalle_medicamento dao  ##')
    dao_response = None
    cursor = None

    try:
      self.open()
      self.set_row_factory(row_id_detalle_medicamento)
      cursor = self.get_cursor()
      aux='A'
      print('Id que lleva para eliminar')
      print(dem_id,  aux)
      cursor.execute('''
        DELETE FROM DETALLE_MEDICAMENTO WHERE  DEM_ID=? AND DEM_ESTADO=?
      ''', (dem_id, aux))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

  def actualizar_medicamento(self,nombre_comercial, nombre_generico,estado,id_med):
    """
       Insertar un nuevo medicamento
    """
    print(nombre_comercial, nombre_generico,estado,id_med)
    log4py.info('##  update_medicamento dao ##')
    dao_response = None
    cursor = None

    try:
      self.open()
      cursor = self.get_cursor()
      cursor.execute('''
        UPDATE  MEDICAMENTO SET MED_NOMBRE_COMERCIAL=?, MED_NOMBRE_GENERICO=?, MED_ESTADO=?
        WHERE MED_ID=?;
      ''', (nombre_comercial, nombre_generico,estado,id_med))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)
