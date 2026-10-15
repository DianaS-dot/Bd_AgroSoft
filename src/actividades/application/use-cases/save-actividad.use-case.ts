import { Inject, Injectable } from '@nestjs/common';
import { ActividadDomain } from '../../domain/entities/actividad.entity';
import { ACTIVIDAD_REPOSITORY } from '../../domain/ports/actividad.repository.port';
import type { ActividadRepositoryPort, ActividadUpdate } from '../../domain/ports/actividad.repository.port';

@Injectable()
export class SaveActividadUseCase {
  constructor(
    @Inject(ACTIVIDAD_REPOSITORY)
    private readonly repository: ActividadRepositoryPort,
  ) {}

  execute(id: number, data: ActividadUpdate): Promise<ActividadDomain | null> {
    return this.repository.update(id, data);
  }
}