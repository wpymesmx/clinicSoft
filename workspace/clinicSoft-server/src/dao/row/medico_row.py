from src.dto.MedicoDTO import MedicoDto

def row_id_medico(cursor, row):
  medicoDto = MedicoDto()
  medicoDto.medico_id = row[0]
  return medicoDto