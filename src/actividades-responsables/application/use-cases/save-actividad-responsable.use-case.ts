import { Inject, Injectable } from '@nestjs/common';
import { ActividadResponsableDomain } from '../../domain/entities/actividad-responsable.entity';
import { ACTIVIDAD_RESPONSABLE_REPOSITORY } from '../../domain/ports/actividad-responsable.repository.port';
import type { ActividadResponsableRepositoryPort, ActividadResponsableUpdate } from '../../domain/ports/actividad-responsable.repository.port';

@Injectable()
export class SaveActividadResponsableUseCase {
  constructor(
    @Inject(ACTIVIDAD_RESPONSABLE_REPOSITORY)
    private readonly repository: ActividadResponsableRepositoryPort,
  ) {}

  execute(id: number, data: ActividadResponsableUpdate): Promise<ActividadResponsableDomain | null> {
    return this.repository.update(id, data);
  }
}