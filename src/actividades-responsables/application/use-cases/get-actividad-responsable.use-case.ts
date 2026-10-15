import { Inject, Injectable } from '@nestjs/common';
import { ActividadResponsableDomain } from '../../domain/entities/actividad-responsable.entity';
import { ACTIVIDAD_RESPONSABLE_REPOSITORY } from '../../domain/ports/actividad-responsable.repository.port';
import type { ActividadResponsableRepositoryPort } from '../../domain/ports/actividad-responsable.repository.port';

@Injectable()
export class GetActividadResponsableUseCase {
  constructor(
    @Inject(ACTIVIDAD_RESPONSABLE_REPOSITORY)
    private readonly repository: ActividadResponsableRepositoryPort,
  ) {}

  findAll(): Promise<ActividadResponsableDomain[]> {
    return this.repository.findAll();
  }

  findById(id: number): Promise<ActividadResponsableDomain | null> {
    return this.repository.findById(id);
  }
}
