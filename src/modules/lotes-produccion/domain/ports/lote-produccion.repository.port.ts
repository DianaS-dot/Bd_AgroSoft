import { LoteProduccion } from '../entities/lote-produccion.entity';

export const LOTE_PRODUCCION_REPOSITORY = Symbol('LOTE_PRODUCCION_REPOSITORY');

export interface LoteProduccionRepositoryPort {
  crear(lote: LoteProduccion): Promise<LoteProduccion>;
  actualizar(id: number, lote: LoteProduccion): Promise<LoteProduccion>;
  eliminar(id: number): Promise<void>;
  buscarPorId(id: number): Promise<LoteProduccion | null>;
  listar(): Promise<LoteProduccion[]>;
  listarPorProductoAgro(productoAgroId: number): Promise<LoteProduccion[]>;
  listarConStockDisponible(): Promise<LoteProduccion[]>;
}