import { RolPermiso } from './rol_permiso.entity';

export interface RolPermisoRepository {
  save(rolPermiso: RolPermiso): Promise<RolPermiso>;
  findById(id: number): Promise<RolPermiso | null>;
  findByRolIdAndPermisoId(
    rolId: number,
    permisoId: number,
  ): Promise<RolPermiso | null>;
  findByRolId(rolId: number): Promise<RolPermiso[]>;
}

// Token de inyección — en TS las interfaces no existen en tiempo de ejecución,
// así que necesitamos un "token" para que NestJS sepa qué inyectar.
export const ROL_PERMISO_REPOSITORY = Symbol('ROL_PERMISO_REPOSITORY');
