import { Inject, Injectable } from '@nestjs/common';
import { CreatePermisoInput, Permiso } from '../../domain/entities/permiso.entity';
import {
  PERMISO_REPOSITORY,
  type PermisoRepository,
} from '../../domain/ports/permiso-repository.port';
import { PermisoAlreadyExistsError } from '../../domain/errors/permiso-already-exists.error';

@Injectable()
export class CreatePermisoUseCase {
  constructor(
    @Inject(PERMISO_REPOSITORY)
    private readonly permisoRepository: PermisoRepository,
  ) {}

  async execute(input: CreatePermisoInput): Promise<Permiso> {
    // Valida las reglas de negocio (nombre y descripción obligatorios).
    const permiso = Permiso.create(input);

    // Unicidad del nombre del permiso — regla de negocio.
    const permisoExistente = await this.permisoRepository.findByNombre(
      permiso.nombre,
    );
    if (permisoExistente) {
      throw new PermisoAlreadyExistsError(
        `Ya existe un permiso con el nombre ${permiso.nombre}`,
      );
    }

    return this.permisoRepository.save(permiso);
  }
}
