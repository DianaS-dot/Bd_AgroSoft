import { Inject, Injectable } from '@nestjs/common';
import { ActividadHistorialDomain } from '../../domain/entities/actividad-historial.entity';
import { ACTIVIDAD_HISTORIAL_REPOSITORY } from '../../domain/ports/actividad-historial.repository.port';
import type { ActividadHistorialRepositoryPort, ActividadHistorialUpdate } from '../../domain/ports/actividad-historial.repository.port';

@Injectable()
export class SaveActividadHistorialUseCase {
  constructor(
    @Inject(ACTIVIDAD_HISTORIAL_REPOSITORY)
    private readonly repository: ActividadHistorialRepositoryPort,
  ) {}

  execute(id: number, data: ActividadHistorialUpdate): Promise<ActividadHistorialDomain | null> {
    return this.repository.update(id, data);
  }
}