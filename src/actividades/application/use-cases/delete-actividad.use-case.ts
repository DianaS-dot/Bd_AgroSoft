import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ACTIVIDAD_REPOSITORY } from '../../domain/ports/actividad.repository.port';
import type { ActividadRepositoryPort } from '../../domain/ports/actividad.repository.port';

@Injectable()
export class DeleteActividadUseCase {
  constructor(
    @Inject(ACTIVIDAD_REPOSITORY)
    private readonly actividadRepository: ActividadRepositoryPort,
  ) {}

  async execute(id: number): Promise<{ deleted: boolean }> {
    const deleted = await this.actividadRepository.delete(id);

    if (!deleted) {
      throw new NotFoundException(`Actividad con id ${id} no encontrada`);
    }

    return { deleted };
  }
}
