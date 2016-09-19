from src.dao.dto.DetallesMedicamentoDto import DetallesMedicamentoDto
from src.dao.dto.GruposDto import GruposDto

def consulta_detalles_row(cursor, row):
  detallesDto = DetallesMedicamentoDto()
  detallesDto.dem_id=row[0]
  detallesDto.gru_fk=row[1]
  detallesDto.med_fk=row[2]
  detallesDto.codigo_barras=row[3]
  detallesDto.dem_presentacion= row[4]
  detallesDto.dem_descripcion= row[5]
  detallesDto.dem_cantidad_maxima = row[6]
  detallesDto.dem_cantidad_minima = row[7]
  detallesDto.dem_en_existencia= row[8]
  detallesDto.dem_indicasiones= row[9]
  detallesDto.dem_via_admin= row[10]
  detallesDto.dem_fecha_alta = row[11]
  detallesDto.dem_fecha_caducidad = row[12]
  detallesDto.dem_condicion_venta=row[13]
  detallesDto.dem_precio = row[14]
  detallesDto.dem_iva = row[15]
  detallesDto.dem_farmaceutica = row[16]
  detallesDto.dem_elaborado_en = row[17]
  detallesDto.med_imagen=row[18]
  return detallesDto

def llenar_combo_grupos_row(cursor, row):
  gruposDto = GruposDto()
  gruposDto.gru_id = row[0]
  gruposDto.gru_nombre = row[1]
  return gruposDto

def llenar_combo_reporte_row(cursor, row):
  gruposDto = GruposDto()
  gruposDto.gru_nombre = row[0]
  gruposDto.gru_id = row[1]
  return gruposDto

def reporte_medicamentos_row(cursor, row):
  medicamentosDto = DetallesMedicamentoDto()
  medicamentosDto.dem_id=row[0]
  medicamentosDto.codigo_barras = row[1]
  medicamentosDto.med_nombre_comercial = row[2]
  medicamentosDto.med_nombre_generico = row[3]
  medicamentosDto.dem_fecha_alta = row[4]
  medicamentosDto.dem_fecha_caducidad = row[5]
  medicamentosDto.dem_presentacion= row[6]
  medicamentosDto.dem_descripcion= row[7]
  medicamentosDto.dem_farmaceutica = row[8]
  medicamentosDto.dem_grupo=row[9]
  return medicamentosDto

def dashboard_medicamentos_row(cursor, row):
  medicamentosDto = DetallesMedicamentoDto()
  medicamentosDto.dem_id=row[0]
  medicamentosDto.med_nombre_comercial = row[1]
  medicamentosDto.med_nombre_generico = row[2]
  medicamentosDto.dem_presentacion = row[3]
  medicamentosDto.dem_en_existencia = row[4]
  medicamentosDto.dem_cantidad_maxima= row[5]
  medicamentosDto.dem_cantidad_minima = row[6]
  medicamentosDto.dem_fecha_caducidad = row[7]
  medicamentosDto.dem_imagen=row[8]
  return medicamentosDto



