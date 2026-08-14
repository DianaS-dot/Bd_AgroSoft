import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ACTIVIDAD_REPOSITORY } from '../../domain/ports/actividad.repository.port';
import type {
  ActividadRepositoryPort,
  ActividadUpdate,
} from '../../domain/ports/actividad.repository.port';
import { ActividadDomain } from '../../domain/models/actividad.model';

@Injectable()
export class UpdateActividadUseCase {
  constructor(
    @Inject(ACTIVIDAD_REPOSITORY)
    private readonly actividadRepository: ActividadRepositoryPort,
  ) {}

  async execute(id: number, data: ActividadUpdate): Promise<ActividadDomain> {
    const actividad = await this.actividadRepository.update(id, data);

    if (!actividad) {
      throw new NotFoundException(`Actividad con id ${id} no encontrada`);
    }

    return actividad;
  }
}
