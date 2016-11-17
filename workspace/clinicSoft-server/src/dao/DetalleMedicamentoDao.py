__author__ = '@LLV'

from src.dao.SQLiteDao import SQLiteDao
from src.row.medicamento_row import consulta_medicamento_row
from src.row.medicamento_row import row_id_medicamento
from Log4py import log4py

class DetalleMedicamento(SQLiteDao):

  def __int__(self):
    pass

  def insert_detalle_medicament(self,dem_id,med_fk,alm_fk,dem_cantidad_max,dem_cantidad_min,dem_existencia,dem_descripcion,dem_indicaciones,dem_dosis,dem_estado):
    """
       Función utilizada para insertar un nuevo medicamento"""

    log4py.info('##  inserta_medicamento  ##')
    dao_response = None
    cursor = None

    try:
      self.open()
      cursor = self.get_cursor()
      cursor.execute('''
          INSERT INTO DETALLE_MEDICAMENTO (DEM_ID,MED_FK,ALM_FK,DEM_CANTIDAD_MAXIMA,DEM_CANTIDAD_MINIMA,DEM_EN_EXISTENCIA,DEM_DESCRIPCION,DEM_INDICACIONES,DEM_VIA_ADMIN_DOSIS,DEM_ESTADO)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        ''', (dem_id,med_fk,alm_fk,dem_cantidad_max,dem_cantidad_min,dem_existencia,dem_descripcion,dem_indicaciones,dem_dosis,dem_estado))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

  def update_detalle_medicament(self,dem_id,alm_fk,dem_cantidad_max,dem_cantidad_min,dem_existencia,dem_descripcion,dem_indicaciones,dem_dosis,dem_estado):
    """
       Insertar un nuevo medicamento
    """
    log4py.info('##  update_medicamento dao ##')
    dao_response = None
    cursor = None
    print(dem_id,alm_fk,dem_cantidad_max,dem_cantidad_min,dem_existencia,dem_descripcion,dem_indicaciones,dem_dosis,dem_estado)
    try:
      self.open()
      cursor = self.get_cursor()
      cursor.execute('''
        UPDATE  DETALLE_MEDICAMENTO  SET  ALM_FK=?,DEM_CANTIDAD_MAXIMA=?,DEM_CANTIDAD_MINIMA=?,DEM_EN_EXISTENCIA=?,DEM_DESCRIPCION=?, DEM_INDICACIONES=?, DEM_VIA_ADMIN_DOSIS=?, DEM_ESTADO
        WHERE DEM_ID=?;
      ''', (alm_fk,dem_cantidad_max,dem_cantidad_min,dem_existencia,dem_descripcion,dem_indicaciones,dem_dosis,dem_estado,dem_id))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err

    finally:
      self.close(cursor)

  def elimina_detalle_medicament(self, dem_id, dem_estado):
    log4py.info('## elimina_medicamento dao  ##')
    dao_response = None
    cursor = None

    try:
      self.open()
      self.set_row_factory(row_id_medicamento)
      cursor = self.get_cursor()
      cursor.execute('''
        UPDATE  DETALLE_MEDICAMENTO SET DEM_ESTADO=? WHERE DEM_ID = ?;
      ''', (dem_id, dem_estado))
      self.commit()

    except Exception as err:
      log4py.error('Error-> {0}'.format(err))
      self.rollback()
      raise err
    finally:
      self.close(cursor)

