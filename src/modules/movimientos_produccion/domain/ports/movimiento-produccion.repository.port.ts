import { MovimientoProduccion } from '../entities/movimiento-produccion.entity';

export const MOVIMIENTO_PRODUCCION_REPOSITORY = Symbol('MOVIMIENTO_PRODUCCION_REPOSITORY');

export interface MovimientoProduccionRepositoryPort {
  crear(movimiento: MovimientoProduccion, manager?: unknown): Promise<MovimientoProduccion>;
  buscarPorId(id: number): Promise<MovimientoProduccion | null>;
  listarPorLote(loteProduccionId: number): Promise<MovimientoProduccion[]>;
  listarPorVenta(ventaId: number): Promise<MovimientoProduccion[]>;
  listar(): Promise<MovimientoProduccion[]>;
}