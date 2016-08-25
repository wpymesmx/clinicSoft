from src.dao.dto.DetallesMedicamentoDto import DetallesMedicamentoDto

def consulta_detalles_row(cursor, row):
  detallesDto = DetallesMedicamentoDto()
  detallesDto.dem_id=row[0]
  detallesDto.alm_fk=row[1]
  detallesDto.dem_presentacion= row[2]
  detallesDto.dem_cantidad_maxima = row[3]
  detallesDto.dem_cantidad_minima = row[4]
  detallesDto.dem_en_existencia= row[5]
  detallesDto.dem_descripcion= row[6]
  detallesDto.dem_indicasiones= row[7]
  detallesDto.dem_via_admin= row[8]
  detallesDto.dem_fecha_alta = row[9]
  detallesDto.dem_fecha_caducidad = row[10]
  return detallesDto

