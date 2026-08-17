import { MovimientoInsumo } from '../entities/movimiento-insumo.entity';

/**
 * El Puerto es una INTERFAZ. 
 * Define qué acciones puede hacer el dominio con los datos.
 */
export interface MovimientoInsumoRepository {
  save(movimiento: MovimientoInsumo): Promise<MovimientoInsumo>;
  findAll(): Promise<MovimientoInsumo[]>;
  findById(id: number): Promise<MovimientoInsumo | null>;
  update(id: number, movimiento: Partial<MovimientoInsumo>): Promise<MovimientoInsumo>;
  delete(id: number): Promise<boolean>;
}

/**
 * Token de Inyección para el repositorio de movimientos de insumos.
 * Se usa en los Casos de Uso y en el Módulo de NestJS.
 */
export const MOVIMIENTO_INSUMO_REPOSITORY = Symbol('MOVIMIENTO_INSUMO_REPOSITORY');
