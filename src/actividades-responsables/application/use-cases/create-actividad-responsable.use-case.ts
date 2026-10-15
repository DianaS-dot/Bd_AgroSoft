import { Inject, Injectable } from '@nestjs/common';
import { ActividadResponsableDomain, ActividadResponsableProps } from '../../domain/entities/actividad-responsable.entity';
import { ACTIVIDAD_RESPONSABLE_REPOSITORY } from '../../domain/ports/actividad-responsable.repository.port';
import type { ActividadResponsableRepositoryPort } from '../../domain/ports/actividad-responsable.repository.port';

@Injectable()
export class CreateActividadResponsableUseCase {
  constructor(
    @Inject(ACTIVIDAD_RESPONSABLE_REPOSITORY)
    private readonly repository: ActividadResponsableRepositoryPort,
  ) {}

  execute(data: ActividadResponsableProps): Promise<ActividadResponsableDomain> {
    return this.repository.create(ActividadResponsableDomain.create(data));
  }
}
