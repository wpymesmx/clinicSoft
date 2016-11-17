__author__ = 'drunkenturtle'

class UsuarioDto(object):
  """
    Clase utilizada para representar un usuario en el sistema
  """

  def __init__(self):
    self.usu_id = None
    self.tiu_id = None
    self.usu_login = None
    self.usu_contrasena = None
    self.usu_estado = None
    self.usu_fecha_alta = None
    self.usu_fecha_vencimiento = None
    self.usu_correo = None

  def toString(self):
    return '''
      user: {0},
      tiu_id: {1},
      usu_login: {2},
      usu_contrasena: {3},
      usu_estado: {4},
      usu_fecha_alta: {5},
      usu_fecha_vencimiento: {6},
      usu_correo: {7}
    '''.format(self.usu_id, self.tiu_id, self.usu_login, self.usu_contrasena, self.usu_estado, self.usu_fecha_alta,
               self.usu_fecha_vencimiento, self.usu_correo)
