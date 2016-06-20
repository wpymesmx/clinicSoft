

class AppException(Exception):
  """
    Clase utilizada para controlar los errores de negocio de la aplicacion
  """

  def __init__(self, message=''):
    """
    """
    self.message = message


