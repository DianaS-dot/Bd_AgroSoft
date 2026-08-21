import { Inject, Injectable } from '@nestjs/common';
import { RolPermiso } from '../../domain/entities/rol_permiso.entity';
import {
  ROL_PERMISO_REPOSITORY,
  type RolPermisoRepository,
} from '../../domain/ports/rol_permiso-repository.port';
import { RolPermisoNotFoundError } from '../../domain/errors/rol-permiso-not-found.error';

@Injectable()
export class GetRolPermisoUseCase {
  constructor(
    @Inject(ROL_PERMISO_REPOSITORY)
    private readonly rolPermisoRepository: RolPermisoRepository,
  ) {}

  async findById(id: number): Promise<RolPermiso> {
    const relacion = await this.rolPermisoRepository.findById(id);
    if (!relacion) {
      throw new RolPermisoNotFoundError(
        `No se encontró la relación rol-permiso con id ${id}`,
      );
    }
    return relacion;
  }

  findByRolId(rolId: number): Promise<RolPermiso[]> {
    return this.rolPermisoRepository.findByRolId(rolId);
  }
}
