import { Inject, Injectable } from '@nestjs/common';
import { Permiso } from '../../domain/entities/permiso.entity';
import {
  PERMISO_REPOSITORY,
  type PermisoRepository,
} from '../../domain/ports/permiso-repository.port';
import { PermisoNotFoundError } from '../../domain/errors/permiso-not-found.error';

@Injectable()
export class GetPermisoUseCase {
  constructor(
    @Inject(PERMISO_REPOSITORY)
    private readonly permisoRepository: PermisoRepository,
  ) {}

  async findById(id: number): Promise<Permiso> {
    const permiso = await this.permisoRepository.findById(id);
    if (!permiso) {
      throw new PermisoNotFoundError(`No se encontró un permiso con id ${id}`);
    }
    return permiso;
  }

  async findByNombre(nombre: string): Promise<Permiso> {
    const permiso = await this.permisoRepository.findByNombre(nombre?.trim());
    if (!permiso) {
      throw new PermisoNotFoundError(
        `No se encontró un permiso con nombre ${nombre}`,
      );
    }
    return permiso;
  }
}
