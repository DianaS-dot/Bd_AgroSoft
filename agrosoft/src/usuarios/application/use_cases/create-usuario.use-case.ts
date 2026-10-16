import { randomBytes, pbkdf2Sync } from 'node:crypto';
import { Inject, Injectable } from '@nestjs/common';
import { Usuario } from '../../domain/entities/usuario.entity';
import { CreateUsuarioInput } from '../../domain/entities/usuario.entity';
import {
  USUARIO_REPOSITORY,
  type UsuarioRepository,
} from '../../domain/ports/usuario-repository.port';
import { UsuarioAlreadyExistsError } from '../../domain/errors/usuario-already-exists.error';

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = pbkdf2Sync(password, salt, 100000, 64, 'sha512');
  return `${salt}:${derivedKey.toString('hex')}`;
}

@Injectable()
export class CreateUsuarioUseCase {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async execute(input: CreateUsuarioInput): Promise<Usuario> {
    const passwordHash = hashPassword(input.passwordHash);

    // Valida las reglas de negocio (nombre, apellido, correo, etc.).
    const usuario = Usuario.create({ ...input, passwordHash });

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
