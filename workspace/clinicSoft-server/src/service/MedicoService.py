__author__ = '@LLV'
from Log4py import log4py
from src.dao.MedicoDao import MedicoDao

class MedicoService():
  """Llamada a servicios gestión medico"""

  def __init__(self):
    self.medicoDao = MedicoDao()

  def insert_medico(self,medi_id,med_cedula,med_nombre,med_ape_pat,med_ape_mat,med_fechan,med_celular,med_correo,med_turno,med_sexo):
    """
    Servicio utilizado para insertar un registro medico
    """
    log4py.info('## Insetar Medico Service ##')
    service_response = None
    service_response = self.medicoDao.insert_medico(medi_id,med_cedula,med_nombre,med_ape_pat,med_ape_mat,med_fechan,med_celular,med_correo,med_turno,med_sexo)
    return service_response


  def elimina_medico(self, med_id,medi_estado):
    """
    Servicio utilizado para eliminar médico
    """
    log4py.info('## elimina_medico service ##')
    service_response = None
    service_response = self.medicoDao.elimina_medico(med_id,medi_estado)
    return service_response

  def update_medico(self,medi_id,med_cedula,med_nombre,med_ape_pat,med_ape_mat,med_fechan,med_celular,med_correo,med_turno,med_sexo):
    """
    Servicio utilizado para actualizar medico
    """
    log4py.info('## update_medico Service ##')
    service_response = None

    service_response = self.medicoDao.updateMedico(medi_id,med_cedula,med_nombre,med_ape_pat,med_ape_mat,med_fechan,med_celular,med_correo,med_turno,med_sexo)
    return service_response