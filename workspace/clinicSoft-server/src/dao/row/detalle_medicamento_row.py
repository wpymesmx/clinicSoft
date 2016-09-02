from src.dao.dto.DetallesMedicamentoDto import DetallesMedicamentoDto
from src.dao.dto.GruposDto import GruposDto

def consulta_detalles_row(cursor, row):
  detallesDto = DetallesMedicamentoDto()
  detallesDto.dem_id=row[0]
  detallesDto.gru_fk=row[1]
  detallesDto.codigo_barras=row[2]
  detallesDto.dem_presentacion= row[3]
  detallesDto.dem_descripcion= row[4]
  detallesDto.dem_cantidad_maxima = row[5]
  detallesDto.dem_cantidad_minima = row[6]
  detallesDto.dem_en_existencia= row[7]
  detallesDto.dem_indicasiones= row[8]
  detallesDto.dem_via_admin= row[9]
  detallesDto.dem_fecha_alta = row[10]
  detallesDto.dem_fecha_caducidad = row[11]
  detallesDto.dem_precio = row[12]
  detallesDto.dem_iva = row[13]
  detallesDto.dem_farmaceutica = row[14]
  detallesDto.dem_elaborado_en = row[15]
  return detallesDto

def llenar_combo_grupos_row(cursor, row):
  gruposDto = GruposDto()
  gruposDto.gru_id = row[0]
  gruposDto.gru_nombre = row[1]
  return gruposDto
