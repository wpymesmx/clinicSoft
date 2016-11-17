__author__ = '@LLV'
from Log4py import log4py
from src.dao.PacienteDao import PacienteDao

class PacienteService():
  def __init__(self):
    self.pacienteDao = PacienteDao()

  def insert_paciente(self,usu_id,pac_nombre,pac_apellido_paterno,pac_apellido_materno,pac_fechan,pac_fechar,
                      pac_sexo,pac_domicilio,pac_celular,pac_correo,pac_ocupac,pac_tipo,pac_foto):
    """
    Servicio utilizado para insertar un registro paciente
    """
    log4py.info('## Insetar Paciente Service ##')
    service_response = None
    service_response = self.pacienteDao.insert_paciente(usu_id,pac_nombre,pac_apellido_paterno,pac_apellido_materno,pac_fechan,pac_fechar,
                                                        pac_sexo,pac_domicilio,pac_celular,pac_correo,pac_ocupac,pac_tipo,pac_foto)
    return service_response

  def insert_detalle_paciente(self,pac_id,his_nombre,his_sintoma,his_fecha,his_analisis):
    """
    Servicio utilizado para insertar un sintoma de paciente
    """
    log4py.info('## insert_detalle_paciente Service ##')
    service_response = None
    service_response = self.pacienteDao.insert_detalle_paciente(pac_id,his_nombre,his_sintoma,his_fecha,his_analisis)
    return service_response

  def insert_analisis(self, his_id, ana_nombre, ana_analisis):
    """
    Servicio utilizado para insertar un sintoma de paciente
    """
    log4py.info('## insert_analisis Service ##')
    service_response = None
    service_response = self.pacienteDao.insert_analisis(his_id, ana_nombre, ana_analisis)
    return service_response

  def update_detalle_paciente(self,his_id, pac_id, his_nombre, his_sintoma,his_fecha,his_analisis,his_estado):
    """
    Servicio utilizado para actualizar un sintoma de paciente
    """
    log4py.info('## update_detalle_paciente Service ##')
    service_response = None
    service_response = self.pacienteDao.update_detalle_paciente(his_id, pac_id, his_nombre, his_sintoma,his_fecha,his_analisis,his_estado)
    return service_response


  def elimina_paciente(self,pac_id,pac_estado):
    """
    Servicio utilizado para eliminar médico
    """
    log4py.info('## elimina_paciente service ##')
    service_response = None
    service_response = self.pacienteDao.elimina_paciente(pac_id,pac_estado)
    return service_response

  def update_paciente(self, pac_id,usu_id,pac_nombre,pac_apellido_paterno,pac_apellido_materno,
                      pac_fechan,pac_fechar,pac_sexo,pac_domicilio,pac_celular,pac_correo,pac_ocupac,pac_tipo,pac_foto,pac_estado):
    """
    Servicio utilizado para actualizar paciente
    """
    log4py.info('## update_paciente Service ##')
    service_response = None

    service_response = self.pacienteDao.update_paciente(pac_id,usu_id,pac_nombre,pac_apellido_paterno,pac_apellido_materno,
                      pac_fechan,pac_fechar,pac_sexo,pac_domicilio,pac_celular,pac_correo,pac_ocupac,pac_tipo,pac_foto,pac_estado)
    return service_response

  def buscar_paciente(self, pac_nombre, pac_paterno, pac_materno, pac_fechan, pac_fechar, pac_sexo):
    """
    Función para buscar un PACIENTE
    """
    log4py.info('## buscar_paciente ##')
    service_response = None

    service_response = self.pacienteDao.buscar_paciente(pac_nombre, pac_paterno, pac_materno, pac_fechan, pac_fechar, pac_sexo)

    return service_response

  def existe_paciente(self, nombre,paterno,materno):
    """
    Función para validar si existe un paciente
    """
    log4py.info('## existe_paciente ##')
    service_response = None
    aux = '******lo que lleva'
    print(aux, nombre,paterno,materno)
    service_response = self.pacienteDao.existe_paciente(nombre,paterno,materno)

    return service_response

  def busca_datos_paciente(self, pac_id):
    """
    Función para recurar el historial de un paciente
    """
    log4py.info('## busca_datos_paciente ##')
    service_response = None
    aux = '******lo que lleva'
    print(aux, pac_id)
    service_response = self.pacienteDao.busca_datos_paciente(pac_id)

    return service_response

  def busca_historial_paciente(self, id_pac):
    """
    Función para recurar el historial de un paciente
    """
    log4py.info('## existe_paciente ##')
    service_response = None
    aux = '******lo que lleva'
    print(aux, id_pac)
    service_response = self.pacienteDao.busca_historial_paciente(id_pac)

    return service_response

