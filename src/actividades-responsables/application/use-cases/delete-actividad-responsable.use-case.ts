import { Inject, Injectable } from '@nestjs/common';
import { ACTIVIDAD_RESPONSABLE_REPOSITORY } from '../../domain/ports/actividad-responsable.repository.port';
import type { ActividadResponsableRepositoryPort } from '../../domain/ports/actividad-responsable.repository.port';

@Injectable()
export class DeleteActividadResponsableUseCase {
  constructor(
    @Inject(ACTIVIDAD_RESPONSABLE_REPOSITORY)
    private readonly repository: ActividadResponsableRepositoryPort,
  ) {}

  execute(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}