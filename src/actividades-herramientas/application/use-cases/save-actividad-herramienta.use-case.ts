import { Inject, Injectable } from '@nestjs/common';
import { ActividadHerramientaDomain } from '../../domain/entities/actividad-herramienta.entity';
import { ACTIVIDAD_HERRAMIENTA_REPOSITORY } from '../../domain/ports/actividad-herramienta.repository.port';
import type { ActividadHerramientaRepositoryPort, ActividadHerramientaUpdate } from '../../domain/ports/actividad-herramienta.repository.port';

@Injectable()
export class SaveActividadHerramientaUseCase {
  constructor(
    @Inject(ACTIVIDAD_HERRAMIENTA_REPOSITORY)
    private readonly repository: ActividadHerramientaRepositoryPort,
  ) {}

  execute(id: number, data: ActividadHerramientaUpdate): Promise<ActividadHerramientaDomain | null> {
    return this.repository.update(id, data);
  }
}