import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ActividadDomain } from '../../domain/entities/actividad.entity';
import { ACTIVIDAD_REPOSITORY } from '../../domain/ports/actividad.repository.port';
import type { ActividadRepositoryPort } from '../../domain/ports/actividad.repository.port';

@Injectable()
export class GetActividadUseCase {
  constructor(
    @Inject(ACTIVIDAD_REPOSITORY)
    private readonly actividadRepository: ActividadRepositoryPort,
  ) {}

  findAll(): Promise<ActividadDomain[]> {
    return this.actividadRepository.findAll();
  }

  async findById(id: number): Promise<ActividadDomain> {
    const actividad = await this.actividadRepository.findById(id);

    if (!actividad) {
      throw new NotFoundException(`Actividad con id ${id} no encontrada`);
    }

    return actividad;
  }
}
