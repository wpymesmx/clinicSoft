__author__ = 'thedrunkenturtle'

from Log4py import log4py
from src.common.AppException import AppException
from src.dao.PersonalDao import PersonalDao
from src.dao.dto.PersonalDto import PersonalDto

class PersonalService(object):
  """
  """

  def __init__(self):
    """
    """
    self.personalDao = PersonalDao()

  def insert_personal(self, usu_id, pers_nombre, pers_apellido_pat, pers_apellido_mat, pers_cedula, pers_fechan, pers_celular, pers_correo, pers_turno, pers_sexo):
    """
      servicio para poder insertar un nuevo personal en el sistema
    """
    log4py.info('# PersonalService.insert_personal #')
    personalDto = None

    personalDto = PersonalDto()
    personalDto.usu_id = usu_id
    personalDto.pers_nombre = pers_nombre
    personalDto.pers_apellido_pat = pers_apellido_pat
    personalDto.pers_apellido_mat = pers_apellido_mat
    personalDto.pers_cedula = pers_cedula
    personalDto.pers_fechan = pers_fechan
    personalDto.pers_celular = pers_celular
    personalDto.pers_correo = pers_correo
    personalDto.pers_turno = pers_turno
    personalDto.pers_sexo = pers_sexo
    personales = self.personalDao.getPersonalByNombreApe(personalDto)

    if(len(personales) > 0):
      raise AppException('Ya existe un usuario con el nombre y apellidos.')

    return self.personalDao.insert_personal(personalDto)

  def update_personal(self, pers_id, usu_id, pers_nombre, pers_apellido_pat, pers_apellido_mat, pers_cedula, pers_fechan, pers_celular, pers_correo, pers_turno, pers_sexo, pers_estado):
    """
      servicio para actualizar un personal en el sistema
    """
    log4py.info('# PersonalService.update_personal #')
    personalDto = None

    personalDto = PersonalDto()
    personalDto.pers_id = pers_id
    personalDto.usu_id = usu_id
    personalDto.pers_nombre = pers_nombre
    personalDto.pers_apellido_pat = pers_apellido_pat
    personalDto.pers_apellido_mat = pers_apellido_mat
    personalDto.pers_cedula = pers_cedula
    personalDto.pers_fechan = pers_fechan
    personalDto.pers_celular = pers_celular
    personalDto.pers_correo = pers_correo
    personalDto.pers_turno = pers_turno
    personalDto.pers_sexo = pers_sexo
    personalDto.pers_estado = pers_estado
    self.personalDao.update_personal(personalDto)

  def activar_personal(self, pers_id):
    """
      servicio para activa un personal
    """
    log4py.info('# PersonalService->activar_personal #')
    self.personalDao.activar_personal(pers_id)

  def inactivar_personal(self, pers_id):
    """
      servicio para inactivar un personal
    """
    log4py.info('# PersonalService->inactivar_personal #')
    self.personalDao.inactivar_personal(pers_id)

  def getPersonalById(self, pers_id):
    """
      servicio para obtener un objeto personal por id
    """
    log4py.info('# PersonalService.getPersonalById #')
    return self.personalDao.getPersonalById(pers_id)

  def getAllPersonal(self):
    """
      servicio para obtener todos los objetos personal en db activos e inactivos
    """
    log4py.info('# PersonalService->getAllPersonal #')
    return self.personalDao.getAllPersonal()

  def getPersonalByFilter(self, usu_id, pers_nombre, pers_apellido_pat, pers_apellido_mat, pers_cedula, pers_fechan, pers_celular, pers_correo, pers_turno, pers_sexo, pers_estado):
    """
    """
    log4py.info('# PersonalService->getPersonalByFilter #')
    personalDto = None

    personalDto = PersonalDto()
    personalDto.pers_nombre = pers_nombre
    personalDto.pers_apellido_pat = pers_apellido_pat
    personalDto.pers_apellido_mat = pers_apellido_mat
    personalDto.pers_cedula = pers_cedula
    personalDto.pers_fechan = pers_fechan
    personalDto.pers_celular = pers_celular
    personalDto.pers_correo = pers_correo
    personalDto.pers_turno = pers_turno
    personalDto.pers_sexo = pers_sexo
    personalDto.pers_estado = pers_estado
    return self.personalDao.getPersonalByFilter(personalDto)
