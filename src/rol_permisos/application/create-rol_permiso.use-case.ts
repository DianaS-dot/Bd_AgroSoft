import { Inject, Injectable } from '@nestjs/common';
import {
  CreateRolPermisoInput,
  RolPermiso,
} from '../domain/rol_permiso.entity';
import {
  ROL_PERMISO_REPOSITORY,
  type RolPermisoRepository,
} from '../domain/rol_permiso-repository.port';
import { RolPermisoAlreadyExistsError } from '../domain/errors/rol-permiso-already-exists.error';

@Injectable()
export class CreateRolPermisoUseCase {
  constructor(
    @Inject(ROL_PERMISO_REPOSITORY)
    private readonly rolPermisoRepository: RolPermisoRepository,
  ) {}

  async execute(input: CreateRolPermisoInput): Promise<RolPermiso> {
    // Valida las reglas de negocio (IDs de rol y permiso válidos).
    const relacion = RolPermiso.create(input);

    // Unicidad del par (rolId, permisoId) — regla de negocio.
    const existente = await this.rolPermisoRepository.findByRolIdAndPermisoId(
      relacion.rolId,
      relacion.permisoId,
    );
    if (existente) {
      throw new RolPermisoAlreadyExistsError(
        `Ya existe la relación rol ${relacion.rolId} - permiso ${relacion.permisoId}`,
      );
    }

    return this.rolPermisoRepository.save(relacion);
  }
}
