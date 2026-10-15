import { Inject, Injectable } from '@nestjs/common';
import { ActividadEvidenciaDomain, ActividadEvidenciaProps } from '../../domain/entities/actividad-evidencia.entity';
import { ACTIVIDAD_EVIDENCIA_REPOSITORY } from '../../domain/ports/actividad-evidencia.repository.port';
import type { ActividadEvidenciaRepositoryPort } from '../../domain/ports/actividad-evidencia.repository.port';

@Injectable()
export class CreateActividadEvidenciaUseCase {
  constructor(
    @Inject(ACTIVIDAD_EVIDENCIA_REPOSITORY)
    private readonly repository: ActividadEvidenciaRepositoryPort,
  ) {}

  execute(data: ActividadEvidenciaProps): Promise<ActividadEvidenciaDomain> {
    return this.repository.create(ActividadEvidenciaDomain.create(data));
  }
}
