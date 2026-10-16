
import { Usuario } from '../entities/usuario';

export const USUARIO_REPOSITORY = Symbol('USUARIO_REPOSITORY');

export interface UsuarioRepositoryPort {
  guardar(usuario: Usuario): Promise<Usuario>;

  buscarPorId(id: number): Promise<Usuario | null>;

  buscarPorCorreo(correo: string): Promise<Usuario | null>;

  buscarPorIdentificacion(
    identificacion: string,
  ): Promise<Usuario | null>;

  listar(): Promise<Usuario[]>;

  eliminar(id: number): Promise<void>;
}
