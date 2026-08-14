import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ActividadDomain } from '../../domain/models/actividad.model';
import { ACTIVIDAD_REPOSITORY } from '../../domain/ports/actividad.repository.port';
import type { ActividadRepositoryPort } from '../../domain/ports/actividad.repository.port';

@Injectable()
export class FindActividadByIdUseCase {
  constructor(
    @Inject(ACTIVIDAD_REPOSITORY)
    private readonly actividadRepository: ActividadRepositoryPort,
  ) {}

  async execute(id: number): Promise<ActividadDomain> {
    const actividad = await this.actividadRepository.findById(id);

    if (!actividad) {
      throw new NotFoundException(`Actividad con id ${id} no encontrada`);
    }

    return actividad;
  }
}
