from Log4py import log4py
from src.dao.MedicamentoDao import MedicamentoDao

class MedicamentoService(object):
  """
       Clase utilizada para controlar los servicios de gestion de medicamento
  """
  def __init__(self):
    self.medicamDao = MedicamentoDao()

  def insertar_medicamento(self,nombre_comercial, nombre_generico, farmaceutica, elaborado_en, condicion_venta,estado):
    """
    Servicio utilizado para la gestion de medicamento
    """
    log4py.info('## insertar_medicamento ##')
    service_response = None

    service_response = self.medicamDao.insertar_medicamento(nombre_comercial, nombre_generico, farmaceutica, elaborado_en, condicion_venta,estado)

    return service_response

  def buscar_medicamento(self, nombre_comercial, nombre_generico):
    """
    Función para buscar un medicamento
    """
    log4py.info('## buscar_medicamento ##')
    service_response = None

    service_response = self.medicamDao.buscar_medicamento(nombre_comercial, nombre_generico)

    return service_response

  def eliminar_medicamento(self, medicamento_id):
    """
    Función para eliminar un medicamento
    """
    log4py.info('## elimina_medicamento ##')
    service_response = None
    service_response = self.medicamDao.eliminar_medicamento(medicamento_id)
    return service_response

  def actualizar_medicamento(self, nombre_comercial, nombre_generico, farmaceutica, elaborado_en, condicion_venta):
    """
    Servicio utilizado para la gestion de medicamento
    """
    log4py.info('## actualizar_medicamento ##')
    service_response = None

    service_response = self.medicamDao.actualizar_medicamento(nombre_comercial, nombre_generico,  farmaceutica, elaborado_en, condicion_venta)

    return service_response
