import { Inject, Injectable } from '@nestjs/common';
import { ActividadDomain, ActividadProps } from '../../domain/models/actividad.model';
import { ACTIVIDAD_REPOSITORY } from '../../domain/ports/actividad.repository.port';
import type { ActividadRepositoryPort } from '../../domain/ports/actividad.repository.port';

@Injectable()
export class CreateActividadUseCase {
  constructor(
    @Inject(ACTIVIDAD_REPOSITORY)
    private readonly actividadRepository: ActividadRepositoryPort,
  ) {}

  execute(data: ActividadProps): Promise<ActividadDomain> {
    return this.actividadRepository.create(ActividadDomain.create(data));
  }
}
