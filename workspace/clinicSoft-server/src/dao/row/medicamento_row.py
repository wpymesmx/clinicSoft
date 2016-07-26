from src.dao.dto.MedicamentoDto import MedicamentoDto

def consulta_medicamento_row(cursor, row):
  medicamentoDto = MedicamentoDto()
  medicamentoDto.medicamento_id = row[0]
  medicamentoDto.nombre_comercial = row[1]
  medicamentoDto.nombre_generico = row[2]
  medicamentoDto.farmaceutica= row[3]
  medicamentoDto.elaborado_en= row[4]
  medicamentoDto.condicion_venta= row[5]
  medicamentoDto.estado= row[6]
  return medicamentoDto

def llenar_combo_row(cursor, row):
  medicamentoDto = MedicamentoDto()
  medicamentoDto.medicamento_id = row[0]
  medicamentoDto.nombre_comercial = row[1]
  return medicamentoDto

def row_id_medicamento(cursor, row):
  medicamentoDto = MedicamentoDto()
  medicamentoDto.medicamento_id = row[0]
  return medicamentoDto
