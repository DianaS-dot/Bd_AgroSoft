import { Inject, Injectable } from '@nestjs/common';
import { ACTIVIDAD_HERRAMIENTA_REPOSITORY } from '../../domain/ports/actividad-herramienta.repository.port';
import type { ActividadHerramientaRepositoryPort } from '../../domain/ports/actividad-herramienta.repository.port';

@Injectable()
export class DeleteActividadHerramientaUseCase {
  constructor(
    @Inject(ACTIVIDAD_HERRAMIENTA_REPOSITORY)
    private readonly repository: ActividadHerramientaRepositoryPort,
  ) {}

  execute(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}