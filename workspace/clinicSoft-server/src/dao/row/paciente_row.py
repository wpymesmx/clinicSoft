__author__ = '@LLV'

from src.dao.dto.PacienteDto import PacienteDto
from src.dao.dto.HistorialDto import HistorialDto

def buscar_paciente_row(cursor, row):
  pacienteDto = PacienteDto()
  pacienteDto.pac_id=row[0]
  pacienteDto.pac_nombre = row[1]
  pacienteDto.pac_paterno = row[2]
  pacienteDto.pac_materno = row[3]
  pacienteDto.pac_fechan = row[4]
  pacienteDto.pac_fechar = row[5]
  pacienteDto.pac_sexo = row[6]
  pacienteDto.pac_foto = row[7]
  return pacienteDto

def row_id_paciente(cursor, row):
  pacienteDto = PacienteDto()
  pacienteDto.pac_id = row[0]
  return pacienteDto

def buscar_datos_paciente_row(cursor, row):
  pacienteDto = PacienteDto()
  pacienteDto.pac_id=row[0]
  pacienteDto.usu_id = row[1]
  pacienteDto.pac_nombre = row[2]
  pacienteDto.pac_paterno = row[3]
  pacienteDto.pac_materno = row[4]
  pacienteDto.pac_fechan = row[5]
  pacienteDto.pac_fechar = row[6]
  pacienteDto.pac_sexo = row[7]
  pacienteDto.pac_direccion = row[8]
  pacienteDto.pac_celular = row[9]
  pacienteDto.pac_correo = row[10]
  pacienteDto.pac_ocupac = row[11]
  pacienteDto.pac_tipo = row[12]
  pacienteDto.pac_foto = row[13]
  pacienteDto.pac_estado = row[14]
  return pacienteDto

def row_historial_paciente(cursor, row):
  historialDto = HistorialDto()
  historialDto.his_id = row[0]
  historialDto.pac_id = row[1]
  historialDto.his_nombre = row[2]
  historialDto.his_sintoma = row[3]
  historialDto.his_fecha = row[4]
  historialDto.his_analisis = row[5]
  historialDto.his_estado = row[6]
  return historialDto
