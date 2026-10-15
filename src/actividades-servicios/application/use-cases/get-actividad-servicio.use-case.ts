import { Inject, Injectable } from '@nestjs/common';
import { ActividadServicioDomain } from '../../domain/entities/actividad-servicio.entity';
import { ACTIVIDAD_SERVICIO_REPOSITORY } from '../../domain/ports/actividad-servicio.repository.port';
import type { ActividadServicioRepositoryPort } from '../../domain/ports/actividad-servicio.repository.port';

@Injectable()
export class GetActividadServicioUseCase {
  constructor(
    @Inject(ACTIVIDAD_SERVICIO_REPOSITORY)
    private readonly repository: ActividadServicioRepositoryPort,
  ) {}

  findAll(): Promise<ActividadServicioDomain[]> {
    return this.repository.findAll();
  }

  findById(id: number): Promise<ActividadServicioDomain | null> {
    return this.repository.findById(id);
  }
}
