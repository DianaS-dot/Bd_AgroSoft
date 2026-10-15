import { Inject, Injectable } from '@nestjs/common';
import { ACTIVIDAD_HISTORIAL_REPOSITORY } from '../../domain/ports/actividad-historial.repository.port';
import type { ActividadHistorialRepositoryPort } from '../../domain/ports/actividad-historial.repository.port';

@Injectable()
export class DeleteActividadHistorialUseCase {
  constructor(
    @Inject(ACTIVIDAD_HISTORIAL_REPOSITORY)
    private readonly repository: ActividadHistorialRepositoryPort,
  ) {}

  execute(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}