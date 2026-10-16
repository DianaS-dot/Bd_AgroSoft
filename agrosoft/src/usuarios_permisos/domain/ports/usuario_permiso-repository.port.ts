import { UsuarioPermiso } from '../entities/usuario_permiso.entity';

export interface UsuarioPermisoRepository {
  save(usuarioPermiso: UsuarioPermiso): Promise<UsuarioPermiso>;
  findById(id: number): Promise<UsuarioPermiso | null>;
  findByUsuarioIdAndPermisoId(
    usuarioId: number,
    permisoId: number,
  ): Promise<UsuarioPermiso | null>;
  findByUsuarioId(usuarioId: number): Promise<UsuarioPermiso[]>;
}

// Token de inyección — en TS las interfaces no existen en tiempo de ejecución,
// así que necesitamos un "token" para que NestJS sepa qué inyectar.
export const USUARIO_PERMISO_REPOSITORY = Symbol('USUARIO_PERMISO_REPOSITORY');
