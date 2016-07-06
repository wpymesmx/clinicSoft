__author__ = 'drunkenturtle'

import os
import logging
import logging.handlers

class Log4py(object):
  """
    clase utilizada para controlar el sistema de log de la aplicacion
  """

  def __init__(self):
    self.logger = None
    self.logMode = logging.DEBUG

  def init_config(self):
    self.logger = logging.getLogger('clinicSoft')
    self.logger.setLevel(self.logMode)
    # create file handler which logs even debug messages
    fh = logging.handlers.RotatingFileHandler('./logs/clinicSoft.out', mode='a', maxBytes=100000, backupCount=5)
    fh.setLevel(self.logMode)
    # create console handler with a higher log level
    ch = logging.StreamHandler()
    ch.setLevel(self.logMode)
    # create formatter and add it to the handlers
    formatter = logging.Formatter('[%(asctime)s][%(name)s][%(levelname)s][%(process)d][%(message)s]')
    ch.setFormatter(formatter)
    fh.setFormatter(formatter)
    # add the handlers to logger
    self.logger.addHandler(ch)
    self.logger.addHandler(fh)

  def debug(self, message='', obj=None):
    self.logger.debug(message)

    if(obj != None):
      self.logger.debug(message)

  def info(self, message='', obj=None):
    self.logger.info(message)

    if(obj != None):
      self.logger.info(message)

  def warn(self, message='', obj=None):
    self.logger.warn(message)

    if(obj != None):
      self.logger.warn(message)

  def error(self, message='', obj=None):
    self.logger.error(message)

    if(obj != None):
      self.logger.error(message)

  def critical(self, message='', obj=None):
    self.logger.critical(message)

    if(obj != None):
      self.logger.critical(message)

log4py = Log4py()
log4py.init_config()
log4py.info('[OK] log4py')
