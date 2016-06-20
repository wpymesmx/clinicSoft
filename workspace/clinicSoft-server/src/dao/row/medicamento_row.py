from src.dao.dto.MedicamentoDto import MedicamentoDto

def consulta_medicamento_row(cursor, row):
  medicamentoDto = MedicamentoDto()
  medicamentoDto.medicamento_id = row[0]
  medicamentoDto.nombre_comercial = row[1]
  medicamentoDto.nombre_generico = row[2]
  return medicamentoDto

def row_id_medicamento(cursor, row):
  medicamentoDto = MedicamentoDto()
  medicamentoDto.medicamento_id = row[0]
  return medicamentoDto
