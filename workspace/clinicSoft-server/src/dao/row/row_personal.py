from src.dao.dto.PersonalDto import PersonalDto

def row_personal(cursor, row):
  personalDto = PersonalDto()
  personalDto.pers_id = row[0]
  personalDto.usu_id = row[1]
  personalDto.pers_nombre = row[2]
  personalDto.pers_apellido_pat = row[3]
  personalDto.pers_apellido_mat = row[4]
  personalDto.pers_cedula = row[5]
  personalDto.pers_fechan = row[6]
  personalDto.pers_celular = row[7]
  personalDto.pers_correo = row[8]
  personalDto.pers_turno = row[9]
  personalDto.pers_sexo = row[10]
  personalDto.pers_estado= row[11]
  return personalDto
