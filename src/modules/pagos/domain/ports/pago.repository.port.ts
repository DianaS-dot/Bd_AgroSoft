import { Pago } from '../entities/pago.entity';

export const PAGO_REPOSITORY = Symbol('PAGO_REPOSITORY');

export interface PagoRepositoryPort {
  crear(pago: Pago): Promise<Pago>;
  eliminar(id: number): Promise<void>;
  buscarPorId(id: number): Promise<Pago | null>;
  listarPorVenta(ventaId: number): Promise<Pago[]>;
  sumarPagosPorVenta(ventaId: number): Promise<number>;
}