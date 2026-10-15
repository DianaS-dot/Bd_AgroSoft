import { Inject, Injectable } from '@nestjs/common';
import { ActividadHistorialDomain, ActividadHistorialProps } from '../../domain/entities/actividad-historial.entity';
import { ACTIVIDAD_HISTORIAL_REPOSITORY } from '../../domain/ports/actividad-historial.repository.port';
import type { ActividadHistorialRepositoryPort } from '../../domain/ports/actividad-historial.repository.port';

@Injectable()
export class CreateActividadHistorialUseCase {
  constructor(
    @Inject(ACTIVIDAD_HISTORIAL_REPOSITORY)
    private readonly repository: ActividadHistorialRepositoryPort,
  ) {}

  execute(data: ActividadHistorialProps): Promise<ActividadHistorialDomain> {
    return this.repository.create(ActividadHistorialDomain.create(data));
  }
}
