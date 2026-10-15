import { Inject, Injectable } from '@nestjs/common';
import { ACTIVIDAD_REPOSITORY } from '../../domain/ports/actividad.repository.port';
import type { ActividadRepositoryPort } from '../../domain/ports/actividad.repository.port';

@Injectable()
export class DeleteActividadUseCase {
  constructor(
    @Inject(ACTIVIDAD_REPOSITORY)
    private readonly repository: ActividadRepositoryPort,
  ) {}

  execute(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}