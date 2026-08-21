import { Inject, Injectable } from '@nestjs/common';
import { UsuarioPermiso } from '../../domain/entities/usuario_permiso.entity';
import { CreateUsuarioPermisoInput } from '../../domain/entities/usuario_permiso.entity';
import {
  USUARIO_PERMISO_REPOSITORY,
  type UsuarioPermisoRepository,
} from '../../domain/ports/usuario_permiso-repository.port';
import { UsuarioPermisoAlreadyExistsError } from '../../domain/errors/usuario-permiso-already-exists.error';

@Injectable()
export class CreateUsuarioPermisoUseCase {
  constructor(
    @Inject(USUARIO_PERMISO_REPOSITORY)
    private readonly usuarioPermisoRepository: UsuarioPermisoRepository,
  ) {}

  async execute(input: CreateUsuarioPermisoInput): Promise<UsuarioPermiso> {
    // Valida las reglas de negocio (IDs de usuario y permiso válidos).
    const relacion = UsuarioPermiso.create(input);

    // Unicidad del par (usuarioId, permisoId) — regla de negocio.
    const existente =
      await this.usuarioPermisoRepository.findByUsuarioIdAndPermisoId(
        relacion.usuarioId,
        relacion.permisoId,
      );
    if (existente) {
      throw new UsuarioPermisoAlreadyExistsError(
        `Ya existe la relación usuario ${relacion.usuarioId} - permiso ${relacion.permisoId}`,
      );
    }

    return this.usuarioPermisoRepository.save(relacion);
  }
}
