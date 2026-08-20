import { Inject, Injectable } from '@nestjs/common';
import { Usuario } from '../../domain/usuario.entity';
import { CreateUsuarioInput } from '../../domain/usuario.entity';
import {
  USUARIO_REPOSITORY,
  type UsuarioRepository,
} from '../../domain/usuario-repository.port';
import { UsuarioAlreadyExistsError } from '../../domain/errors/usuario-already-exists.error';

@Injectable()
export class CreateUsuarioUseCase {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async execute(input: CreateUsuarioInput): Promise<Usuario> {
    // Valida las reglas de negocio (nombre, apellido, correo, etc.).
    const usuario = Usuario.create(input);

    // Unicidad de correo e identificación (reglas de negocio).
    const usuarioPorCorreo = await this.usuarioRepository.findByCorreo(
      usuario.correo,
    );
    if (usuarioPorCorreo) {
      throw new UsuarioAlreadyExistsError(
        `Ya existe un usuario con el correo ${usuario.correo}`,
      );
    }

    if (
      await this.usuarioRepository.existsByIdentificacion(
        usuario.identificacion,
      )
    ) {
      throw new UsuarioAlreadyExistsError(
        `Ya existe un usuario con la identificación ${usuario.identificacion}`,
      );
    }

    return this.usuarioRepository.save(usuario);
  }
}
