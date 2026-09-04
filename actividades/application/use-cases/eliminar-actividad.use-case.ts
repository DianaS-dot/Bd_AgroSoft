import { Inject, Injectable } from '@nestjs/common';
import { ActividadRepository, ACTIVIDAD_REPOSITORY } from '../../domain/ports/actividad.repository-port';
import { ActividadNoEncontradaError } from '../../domain/errors/actividad-no-encontrada.error';

@Injectable()
export class EliminarActividadUseCase {
  constructor(
    @Inject(ACTIVIDAD_REPOSITORY)
    private readonly actividadRepository: ActividadRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const actividad = await this.actividadRepository.findById(id);
    if (!actividad) {
      throw new ActividadNoEncontradaError(id);
    }
    await this.actividadRepository.delete(id);
  }
}
