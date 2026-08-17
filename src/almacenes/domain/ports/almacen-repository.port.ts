import { Almacen } from '../entities/almacen.entity';

/**
 * El Puerto es una INTERFAZ. 
 * Define qué acciones puede hacer el dominio con los datos.
 */
export interface AlmacenRepository {
  save(almacen: Almacen): Promise<Almacen>;
  findAll(): Promise<Almacen[]>;
  findById(id: number): Promise<Almacen | null>;
  update(id: number, almacen: Partial<Almacen>): Promise<Almacen>;
  delete(id: number): Promise<boolean>;
}

/**
 * Token de Inyección para el repositorio de almacenes.
 * Se usa en los Casos de Uso y en el Módulo de NestJS.
 */
export const ALMACEN_REPOSITORY = Symbol('ALMACEN_REPOSITORY');
