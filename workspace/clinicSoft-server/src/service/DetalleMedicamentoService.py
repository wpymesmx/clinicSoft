from src.dao import DetalleMedicamentoDao
__author__ = '@LLV'
from Log4py import log4py
from src.dao.DetalleMedicamentDao import DetalleMedicament

class DetalleMedicamentoService():
  """
       Clase utilizada para controlar los servicios de gestion de medicamento
  """
  def __init__(self):
    self.DetalleMedicament = DetalleMedicamentoDao()

  def insert_detalle_medicamento(self,dem_id,med_fk,alm_fk,dem_cantidad_max,dem_cantidad_min,dem_existencia,dem_descripcion,dem_indicaciones,dem_dosis,dem_estado):
    """
    Servicio utilizado para la gestion de los detalles de un medicamento
    """
    log4py.info('## Insetar Un Detalle Medicamento Service ##')
    service_response = None

    service_response = self.DetalleMedicament.insert_detalle_med(dem_id,med_fk,alm_fk,dem_cantidad_max,dem_cantidad_min,dem_existencia,dem_descripcion,dem_indicaciones,dem_dosis,dem_estado)

    return service_response

  def elimina_detalle_medicamento(self, dem_id, dem_estado):
    """
    Función para eliminar un detalle de medicamento
    """
    log4py.info('## elimina_detalle_medicamento service ##')
    service_response = None
    service_response = self.DetalleMedicament.elimina_detalle_medicament(dem_id, dem_estado)
    return service_response

  def update_detalle_medicamento(self,dem_id,alm_fk,dem_cantidad_max,dem_cantidad_min,dem_existencia,dem_descripcion,dem_indicaciones,dem_dosis,dem_estado):
    """
    Servicio utilizado para la gestion de detalle medicamento
    """
    log4py.info('## Update_Detalle_Medicamento Service ##')
    service_response = None

    service_response = self.DetalleMedicament.update_detalle_medicament(dem_id,alm_fk,dem_cantidad_max,dem_cantidad_min,dem_existencia,dem_descripcion,dem_indicaciones,dem_dosis,dem_estado)

    return service_response