import { Inject, Injectable } from '@nestjs/common';
import { ActividadDomain } from '../../domain/models/actividad.model';
import { ACTIVIDAD_REPOSITORY } from '../../domain/ports/actividad.repository.port';
import type { ActividadRepositoryPort } from '../../domain/ports/actividad.repository.port';

@Injectable()
export class FindAllActividadesUseCase {
  constructor(
    @Inject(ACTIVIDAD_REPOSITORY)
    private readonly actividadRepository: ActividadRepositoryPort,
  ) {}

  execute(): Promise<ActividadDomain[]> {
    return this.actividadRepository.findAll();
  }
}
