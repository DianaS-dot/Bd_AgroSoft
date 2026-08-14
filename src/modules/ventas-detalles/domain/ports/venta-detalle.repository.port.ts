import { VentaDetalle } from '../entities/venta-detalle.entity';

export const VENTA_DETALLE_REPOSITORY = Symbol('VENTA_DETALLE_REPOSITORY');

export interface VentaDetalleRepositoryPort {
  crear(detalle: VentaDetalle, manager?: unknown): Promise<VentaDetalle>;
  eliminar(id: number, manager?: unknown): Promise<void>;
  buscarPorId(id: number): Promise<VentaDetalle | null>;
  listarPorVenta(ventaId: number): Promise<VentaDetalle[]>;
}