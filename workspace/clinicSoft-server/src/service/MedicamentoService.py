from Log4py import log4py
from src.dao.MedicamentoDao import MedicamentoDao

class MedicamentoService(object):
  """
       Clase utilizada para controlar los servicios de gestion de medicamento
  """
  def __init__(self):
    self.medicamDao = MedicamentoDao()

  def insertar_medicamento(self,nombre_comercial, nombre_generico,estado):
    """
    Servicio utilizado para la gestion de medicamento
    """
    log4py.info('## insertar_medicamento ##')
    service_response = None

    service_response = self.medicamDao.insertar_medicamento(nombre_comercial, nombre_generico,estado)

    return service_response

  def insertar_detalle_medicamento(self,id_grupo, id_med, codigo_barras, presentacion,descripcion,
                                   cantidad_maxima, cantidad_minima, existencia,indicasiones,
                                   via_aministracion,fecha_alta,fecha_caducidad, condicion_venta, precio, iva, farmaceutica, elaborado_en):
    """
    Servicio utilizado para la gestion de medicamento
    """
    log4py.info('## insertar_detalle_medicamento ##')
    service_response = None

    service_response = self.medicamDao.insertar_detalle_medicamento(id_grupo, id_med, codigo_barras, presentacion,descripcion,
                                   cantidad_maxima, cantidad_minima, existencia,indicasiones, via_aministracion,fecha_alta,fecha_caducidad, condicion_venta, precio, iva, farmaceutica, elaborado_en)

    return service_response

  def buscar_medicamento(self, nombre_comercial,nombre_generico):
    """
    Función para buscar un medicamento
    """
    log4py.info('## buscar_medicamento ##')
    service_response = None

    service_response = self.medicamDao.buscar_medicamento(nombre_comercial,nombre_generico)

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

  def existe_detalle_medicamento(self, presentacion,id_med):
    """
    Función para buscar un detalle medicamento
    """
    log4py.info('## existe_detalle_medicamento ##')
    service_response = None
    aux = '******lo que lleva'
    print(aux, presentacion)
    service_response = self.medicamDao.existe_detalle_medicamento(presentacion,id_med)

    return service_response

  def buscar_detalles(self, id_med):
    """
    Función para buscar un detalle medicamento
    """
    log4py.info('## existe_detalle_medicamento ##')
    service_response = None
    aux = '******lo que lleva'
    print(aux, id_med)
    service_response = self.medicamDao.buscar_detalles(id_med)

    return service_response

  def llenar_combo_medicamento(self):
    """
    Función para buscar un medicamento
    """
    log4py.info('## llenar_combo_medicamento ##')
    service_response = None

    service_response = self.medicamDao.llenar_combo_medicamento()

    return service_response

  def llenar_combo_grupos(self):
    """
    Función para buscar un medicamento
    """
    log4py.info('## llenar_combo_almacen ##')
    service_response = None

    service_response = self.medicamDao.llenar_combo_grupos()

    return service_response

  def eliminar_detalle_medicamento(self, dem_id):
    """
    Función para eliminar un medicamento
    """
    log4py.info('## elimina_medicamento ##')
    service_response = None
    service_response = self.medicamDao.eliminar_detalle_medicamento(dem_id)
    return service_response

  def actualizar_medicamento(self, nombre_comercial, nombre_generico, estado, id_med):
    """
    Servicio utilizado para la gestion de medicamento
    """
    log4py.info('## actualizar_medicamento ##')
    service_response = None

    service_response = self.medicamDao.actualizar_medicamento(nombre_comercial, nombre_generico, estado,id_med)

    return service_response

  def update_detalle_medicamento(self,dem_id, id_med, presentacion,descripcion,
                                   cantidad_maxima, cantidad_minima, existencia,indicasiones,
                                   via_aministracion,fecha_alta,fecha_caducidad, condicion_venta, precio, iva, farmaceutica, elaborado_en):
    """
    Servicio utilizado para actualizar un detalle medicamento.
    """
    log4py.info('## update_detalle_medicamento ##')
    service_response = None
    service_response = self.medicamDao.update_detalle_medicamento(dem_id, id_med, presentacion,descripcion, cantidad_maxima, cantidad_minima, existencia,indicasiones, via_aministracion,fecha_alta,fecha_caducidad, condicion_venta, precio,iva, farmaceutica, elaborado_en)

    return service_response

