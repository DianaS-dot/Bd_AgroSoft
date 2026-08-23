import { Usuario } from '../entities/usuario.entity';

export interface UsuarioRepository {
  save(usuario: Usuario): Promise<Usuario>;
  findById(id: number): Promise<Usuario | null>;
  findByCorreo(correo: string): Promise<Usuario | null>;
  existsByIdentificacion(identificacion: string): Promise<boolean>;
}

// Token de inyección — en TS las interfaces no existen en tiempo de ejecución,
// así que necesitamos un "token" para que NestJS sepa qué inyectar.
export const USUARIO_REPOSITORY = Symbol('USUARIO_REPOSITORY');
