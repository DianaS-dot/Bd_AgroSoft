export interface ActividadInsumosUsoBackend {
  id: number;
  usoId: number;
  insumoId: number;
  cantidad: number;
  fechaActividad: Date;
  observaciones?: string;
}

export interface CreateActividadInsumosUsoDto {
  usoId: number;
  insumoId: number;
  cantidad: number;
  fechaActividad: Date;
  observaciones?: string;
}

export interface UpdateActividadInsumosUsoDto {
  usoId?: number;
  insumoId?: number;
  cantidad?: number;
  fechaActividad?: Date;
  observaciones?: string;
}
