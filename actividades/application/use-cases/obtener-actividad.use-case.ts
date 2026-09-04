import { Inject, Injectable } from '@nestjs/common';
import { Actividad } from '../../domain/entities/actividad.entity';
import { ActividadRepository, ACTIVIDAD_REPOSITORY } from '../../domain/ports/actividad.repository-port';
import { ActividadNoEncontradaError } from '../../domain/errors/actividad-no-encontrada.error';

@Injectable()
export class ObtenerActividadUseCase {
  constructor(
    @Inject(ACTIVIDAD_REPOSITORY)
    private readonly actividadRepository: ActividadRepository,
  ) {}

  async executeById(id: string): Promise<Actividad> {
    const actividad = await this.actividadRepository.findById(id);
    if (!actividad) {
      throw new ActividadNoEncontradaError(id);
    }
    return actividad;
  }

  async executeAll(): Promise<Actividad[]> {
    return await this.actividadRepository.findAll();
  }
}
