__author__ = 'drunenkenturtle'

class PersonalDto(object):
  """
  """

  def __init__(self):
    """
    """
    self.pers_id = None
    self.usu_id = None
    self.pers_nombre = None
    self.pers_apellido_pat = None
    self.pers_apellido_mat = None
    self.pers_cedula = None
    self.pers_fechan = None
    self.pers_celular = None
    self.pers_correo = None
    self.pers_turno = None
    self.pers_sexo = None
    self.pers_estado = None

  def toString(self):
    return '''
      pers_id: {0}, usu_id: {1}, pers_nombre: {2}, pers_apellido_pat: {3}, pers_apellido_mat: {4}, pers_cedula: {5}, pers_fechan: {6},
      pers_celular: {7}, pers_correo: {8}, pers_turno: {9}, pers_sexo: {10}, pers_estado: {11}
    '''.format(self.pers_id, self.usu_id, self.pers_nombre, self.pers_apellido_pat, self.pers_apellido_mat, self.pers_cedula, self.pers_fechan,
               self.pers_celular, self.pers_correo, self.pers_turno, self.pers_sexo, self.pers_estado)
