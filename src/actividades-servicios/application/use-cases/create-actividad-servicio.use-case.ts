import { Inject, Injectable } from '@nestjs/common';
import { ActividadServicioDomain, ActividadServicioProps } from '../../domain/entities/actividad-servicio.entity';
import { ACTIVIDAD_SERVICIO_REPOSITORY } from '../../domain/ports/actividad-servicio.repository.port';
import type { ActividadServicioRepositoryPort } from '../../domain/ports/actividad-servicio.repository.port';

@Injectable()
export class CreateActividadServicioUseCase {
  constructor(
    @Inject(ACTIVIDAD_SERVICIO_REPOSITORY)
    private readonly repository: ActividadServicioRepositoryPort,
  ) {}

  execute(data: ActividadServicioProps): Promise<ActividadServicioDomain> {
    return this.repository.create(ActividadServicioDomain.create(data));
  }
}
