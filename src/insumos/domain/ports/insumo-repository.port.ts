import { Insumo } from '../entities/insumo.entity';

/**
 * El Puerto es una INTERFAZ. 
 * Define qué acciones puede hacer el dominio con los datos.
 */
export interface InsumoRepository {
  save(insumo: Insumo): Promise<Insumo>;
  findAll(): Promise<Insumo[]>;
  findById(id: number): Promise<Insumo | null>;
  update(id: number, insumo: Partial<Insumo>): Promise<Insumo>;
  delete(id: number): Promise<boolean>;
}

/**
 * Token de Inyección para el repositorio de insumos.
 * Se usa en los Casos de Uso y en el Módulo de NestJS.
 */
export const INSUMO_REPOSITORY = Symbol('INSUMO_REPOSITORY');
