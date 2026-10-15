import { Inject, Injectable } from '@nestjs/common';
import { ActividadHerramientaDomain, ActividadHerramientaProps } from '../../domain/entities/actividad-herramienta.entity';
import { ACTIVIDAD_HERRAMIENTA_REPOSITORY } from '../../domain/ports/actividad-herramienta.repository.port';
import type { ActividadHerramientaRepositoryPort } from '../../domain/ports/actividad-herramienta.repository.port';

@Injectable()
export class CreateActividadHerramientaUseCase {
  constructor(
    @Inject(ACTIVIDAD_HERRAMIENTA_REPOSITORY)
    private readonly repository: ActividadHerramientaRepositoryPort,
  ) {}

  execute(data: ActividadHerramientaProps): Promise<ActividadHerramientaDomain> {
    return this.repository.create(ActividadHerramientaDomain.create(data));
  }
}
