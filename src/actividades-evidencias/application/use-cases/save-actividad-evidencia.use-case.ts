import { Inject, Injectable } from '@nestjs/common';
import { ActividadEvidenciaDomain } from '../../domain/entities/actividad-evidencia.entity';
import { ACTIVIDAD_EVIDENCIA_REPOSITORY } from '../../domain/ports/actividad-evidencia.repository.port';
import type { ActividadEvidenciaRepositoryPort, ActividadEvidenciaUpdate } from '../../domain/ports/actividad-evidencia.repository.port';

@Injectable()
export class SaveActividadEvidenciaUseCase {
  constructor(
    @Inject(ACTIVIDAD_EVIDENCIA_REPOSITORY)
    private readonly repository: ActividadEvidenciaRepositoryPort,
  ) {}

  execute(id: number, data: ActividadEvidenciaUpdate): Promise<ActividadEvidenciaDomain | null> {
    return this.repository.update(id, data);
  }
}