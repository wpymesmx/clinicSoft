from src.dao.dto.MedicamentoDto import MedicamentoDto
from src.dao.dto.DetalleMedicamentoDto import DetalleMedicamentoDto
from src.dao.dto.DetallesMedicamentoDto import DetallesMedicamentoDto

def consulta_medicamento_row(cursor, row):
  medicamentoDto = MedicamentoDto()
  medicamentoDto.medicamento_id = row[0]
  medicamentoDto.nombre_comercial = row[1]
  medicamentoDto.nombre_generico = row[2]
  medicamentoDto.estado= row[3]
  return medicamentoDto

def llenar_combo_row(cursor, row):
  medicamentoDto = MedicamentoDto()
  medicamentoDto.medicamento_id = row[0]
  medicamentoDto.nombre_comercial = row[1]
  return medicamentoDto

def llenar_combo_almacen_row(cursor, row):
  detalleMediDto = DetalleMedicamentoDto()
  detalleMediDto.det_id = row[0]
  detalleMediDto.det_ubicacion = row[1]
  return detalleMediDto

def row_id_detalle_medicamento(cursor, row):
  detalleMediDto = DetalleMedicamentoDto()
  detalleMediDto.det_id = row[0]
  return detalleMediDto

def detalles_medicamento(cursor, row):
  detalleMediDto = DetalleMedicamentoDto()
  detalleMediDto.det_id = row[0]
  return detalleMediDto


def row_id_medicamento(cursor, row):
  medicamentoDto = MedicamentoDto()
  medicamentoDto.medicamento_id = row[0]
  return medicamentoDto


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
