import { Inject, Injectable } from '@nestjs/common';
import { ACTIVIDAD_SERVICIO_REPOSITORY } from '../../domain/ports/actividad-servicio.repository.port';
import type { ActividadServicioRepositoryPort } from '../../domain/ports/actividad-servicio.repository.port';

@Injectable()
export class DeleteActividadServicioUseCase {
  constructor(
    @Inject(ACTIVIDAD_SERVICIO_REPOSITORY)
    private readonly repository: ActividadServicioRepositoryPort,
  ) {}

  execute(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}