import { Inject, Injectable } from '@nestjs/common';
import { ActividadServicioDomain } from '../../domain/entities/actividad-servicio.entity';
import { ACTIVIDAD_SERVICIO_REPOSITORY } from '../../domain/ports/actividad-servicio.repository.port';
import type { ActividadServicioRepositoryPort, ActividadServicioUpdate } from '../../domain/ports/actividad-servicio.repository.port';

@Injectable()
export class SaveActividadServicioUseCase {
  constructor(
    @Inject(ACTIVIDAD_SERVICIO_REPOSITORY)
    private readonly repository: ActividadServicioRepositoryPort,
  ) {}

  execute(id: number, data: ActividadServicioUpdate): Promise<ActividadServicioDomain | null> {
    return this.repository.update(id, data);
  }
}