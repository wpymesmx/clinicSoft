__author__ = 'drunkenturtle'

import os
import configparser

#print(os.path.dirname(__file__))
#print(os.path.join(os.path.abspath(os.path.dirname(__file__))))

class ServerConfig(object):

  def __init__(self):
    ''' 
      Clase utilizada para controlar las configuraciones del servdor
    '''
    self.server_debug = False
    self.server_secret = ''
    self.server_algorithm = 'HS256'
    self.session_timeout = 0

  def init_config(self):
    config = configparser.ConfigParser()
    config.read(os.path.dirname(__file__) + '/server_config.cfg')
    self.server_debug = config.get('SERVER', 'debug')
    self.server_secret = config.get('SERVER', 'secret')
    self.server_algorithm = config.get('SERVER', 'algorithm')
    self.session_timeout = int(config.get('SERVER', 'timeout'))

  def to_string(self):
    print('_server_debug_{0}_'.format(self.server_debug))
    print('_session_timeout_{0}_'.format(str(self.session_timeout)))

print('# iniciando configuracion del servidor... #')
serverConfig = ServerConfig()
serverConfig.init_config()
#serverConfig.to_string()
