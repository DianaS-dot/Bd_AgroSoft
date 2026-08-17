import { Proveedor } from '../entities/proveedor.entity';

/**
 * El Puerto es una INTERFAZ. 
 * Define qué acciones puede hacer el dominio con los datos.
 */
export interface ProveedorRepository {
  save(proveedor: Proveedor): Promise<Proveedor>;
  findAll(): Promise<Proveedor[]>;
  findById(id: number): Promise<Proveedor | null>;
  update(id: number, proveedor: Partial<Proveedor>): Promise<Proveedor>;
  delete(id: number): Promise<boolean>;
}

/**
 * Token de Inyección para el repositorio de proveedores.
 * Se usa en los Casos de Uso y en el Módulo de NestJS.
 */
export const PROVEEDOR_REPOSITORY = Symbol('PROVEEDOR_REPOSITORY');
