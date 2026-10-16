export interface ReservaBackend {
  id: number;
  insumoId: number;
  cantidad: number;
  fechaReserva: Date;
  fechaUso?: Date;
  solicitante: string;
  estado: string;
  observaciones?: string;
}

export interface CreateReservaDto {
  insumoId: number;
  cantidad: number;
  fechaReserva: Date;
  fechaUso?: Date;
  solicitante: string;
  estado: string;
  observaciones?: string;
}

export interface UpdateReservaDto {
  insumoId?: number;
  cantidad?: number;
  fechaReserva?: Date;
  fechaUso?: Date;
  solicitante?: string;
  estado?: string;
  observaciones?: string;
}
