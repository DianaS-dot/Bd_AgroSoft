export interface ActividadInsumosReservaBackend {
  id: number;
  reservaId: number;
  insumoId: number;
  cantidad: number;
  fechaActividad: Date;
  observaciones?: string;
}

export interface CreateActividadInsumosReservaDto {
  reservaId: number;
  insumoId: number;
  cantidad: number;
  fechaActividad: Date;
  observaciones?: string;
}

export interface UpdateActividadInsumosReservaDto {
  reservaId?: number;
  insumoId?: number;
  cantidad?: number;
  fechaActividad?: Date;
  observaciones?: string;
}
