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

  def buscar_medicamento(self, nombre_comercial,nombre_generico,farmaceutica, elaborado_en, condicion_venta):
    """
    Función para buscar un medicamento
    """
    log4py.info('## buscar_medicamento ##')
    service_response = None

    service_response = self.medicamDao.buscar_medicamento(nombre_comercial,nombre_generico,farmaceutica, elaborado_en, condicion_venta)

    return service_response

  def existe_medicamento(self, nombre_comercial):
    """
    Función para buscar un medicamento
    """
    log4py.info('## existe_medicamento ##')
    service_response = None
    aux='******lo que lleva'
    print(aux,nombre_comercial)
    service_response = self.medicamDao.existe_medicamento(nombre_comercial)

    return service_response

  def llenar_combo_medicamento(self):
    """
    Función para buscar un medicamento
    """
    log4py.info('## llenar_combo_medicamento ##')
    service_response = None

    service_response = self.medicamDao.llenar_combo_medicamento()

    return service_response

  def eliminar_medicamento(self, medicamento_id):
    """
    Función para eliminar un medicamento
    """
    log4py.info('## elimina_medicamento ##')
    service_response = None
    service_response = self.medicamDao.eliminar_medicamento(medicamento_id)
    return service_response

  def actualizar_medicamento(self, nombre_comercial, nombre_generico, farmaceutica, elaborado_en, condicion_venta,estado, id_med):
    """
    Servicio utilizado para la gestion de medicamento
    """
    log4py.info('## actualizar_medicamento ##')
    service_response = None

    service_response = self.medicamDao.actualizar_medicamento(nombre_comercial, nombre_generico,  farmaceutica, elaborado_en, condicion_venta,estado,id_med)

    return service_response
