export interface MovimientoInsumosBackend {
  id: number;
  insumoId: number;
  tipoMovimiento: 'entrada' | 'salida';
  cantidad: number;
  fechaMovimiento: Date;
  motivo?: string;
  usuarioId?: number;
}

export interface CreateMovimientoInsumosDto {
  insumoId: number;
  tipoMovimiento: 'entrada' | 'salida';
  cantidad: number;
  fechaMovimiento: Date;
  motivo?: string;
  usuarioId?: number;
}

export interface UpdateMovimientoInsumosDto {
  insumoId?: number;
  tipoMovimiento?: 'entrada' | 'salida';
  cantidad?: number;
  fechaMovimiento?: Date;
  motivo?: string;
  usuarioId?: number;
}
