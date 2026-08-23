import { Permiso } from '../entities/permiso.entity';

export interface PermisoRepository {
  save(permiso: Permiso): Promise<Permiso>;
  findById(id: number): Promise<Permiso | null>;
  findByNombre(nombre: string): Promise<Permiso | null>;
}

// Token de inyección — en TS las interfaces no existen en tiempo de ejecución,
// así que necesitamos un "token" para que NestJS sepa qué inyectar.
export const PERMISO_REPOSITORY = Symbol('PERMISO_REPOSITORY');
