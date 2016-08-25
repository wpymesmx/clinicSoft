__author__ = 'drunkenturtle'

from src.dao.dto.UsuarioDto import UsuarioDto

def usuario_row(cursor, row):
  usuarioDto = UsuarioDto()
  usuarioDto.usu_id = row[0]
  usuarioDto.tiu_id = row[1]
  usuarioDto.usu_login = row[2]
  usuarioDto.usu_estado = row[3]
  usuarioDto.usu_fecha_alta = row[4]
  usuarioDto.usu_fecha_vencimiento = row[5]
  usuarioDto.usu_correo = row[6]
  return usuarioDto
