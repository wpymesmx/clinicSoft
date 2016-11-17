__author__ = '@LLV'
from Log4py import log4py
from src.dao.PacienteDao import PacienteDao

class PacienteService():
  def __init__(self):
    self.pacienteDao = PacienteDao()

  def insert_paciente(self,pac_id,pac_nombre,pac_apellido_paterno,pac_apellido_materno,
                      pac_fechan,pac_sexo,pac_domicilio,pac_celular,pac_correo,pac_ocupac,pac_tipo):
    """
    Servicio utilizado para insertar un registro paciente
    """
    log4py.info('## Insetar Paciente Service ##')
    service_response = None
    service_response = self.pacienteDao.insert_paciente(pac_id,pac_nombre,pac_apellido_paterno,pac_apellido_materno,
                      pac_fechan,pac_sexo,pac_domicilio,pac_celular,pac_correo,pac_ocupac,pac_tipo)
    return service_response

  def elimina_paciente(self,pac_id,pac_estado):
    """
    Servicio utilizado para eliminar médico
    """
    log4py.info('## elimina_paciente service ##')
    service_response = None
    service_response = self.pacienteDao.elimina_paciente(pac_id,pac_estado)
    return service_response

  def update_paciente(self, pac_id,pac_nombre,pac_apellido_paterno,pac_apellido_materno,
                      pac_fechan,pac_sexo,pac_domicilio,pac_celular,pac_correo,pac_ocupac,pac_tipo):
    """
    Servicio utilizado para actualizar paciente
    """
    log4py.info('## update_paciente Service ##')
    service_response = None

    service_response = self.pacienteDao.update_paciente(pac_id,pac_nombre,pac_apellido_paterno,pac_apellido_materno,
                      pac_fechan,pac_sexo,pac_domicilio,pac_celular,pac_correo,pac_ocupac,pac_tipo)
    return service_response
