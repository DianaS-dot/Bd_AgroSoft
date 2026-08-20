import { Inject, Injectable } from '@nestjs/common';
import { Usuario } from '../../domain/usuario.entity';
import {
  USUARIO_REPOSITORY,
  type UsuarioRepository,
} from '../../domain/usuario-repository.port';
import { UsuarioNotFoundError } from '../../domain/errors/usuario-not-found.error';

@Injectable()
export class GetUsuarioUseCase {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) {
      throw new UsuarioNotFoundError(`No se encontró un usuario con id ${id}`);
    }
    return usuario;
  }

  async findByCorreo(correo: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findByCorreo(correo?.trim());
    if (!usuario) {
      throw new UsuarioNotFoundError(
        `No se encontró un usuario con correo ${correo}`,
      );
    }
    return usuario;
  }
}
