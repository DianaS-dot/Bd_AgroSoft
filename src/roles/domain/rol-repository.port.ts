import { Rol } from './rol.entity';

export interface RolRepository {
  save(rol: Rol): Promise<Rol>;
  findById(id: number): Promise<Rol | null>;
  findByNombre(nombre: string): Promise<Rol | null>;
}

// Token de inyección — en TS las interfaces no existen en tiempo de ejecución,
// así que necesitamos un "token" para que NestJS sepa qué inyectar.
export const ROL_REPOSITORY = Symbol('ROL_REPOSITORY');
