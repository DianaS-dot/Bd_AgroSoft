import { Inject, Injectable } from '@nestjs/common';
import { ACTIVIDAD_EVIDENCIA_REPOSITORY } from '../../domain/ports/actividad-evidencia.repository.port';
import type { ActividadEvidenciaRepositoryPort } from '../../domain/ports/actividad-evidencia.repository.port';

@Injectable()
export class DeleteActividadEvidenciaUseCase {
  constructor(
    @Inject(ACTIVIDAD_EVIDENCIA_REPOSITORY)
    private readonly repository: ActividadEvidenciaRepositoryPort,
  ) {}

  execute(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}