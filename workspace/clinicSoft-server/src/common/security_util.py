__author__ = 'drunkenturtle'

import hashlib

def encode_passwd(passwd):
  """
    metodo utilizado para encriptar el password del usuario.
    tipo de encripcion: sha256
  """
  return hashlib.sha256(passwd.encode()).hexdigest()

#print(encode_passwd('123456'))
