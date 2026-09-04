import { Injectable, Inject } from '@nestjs/common';

import { CultivoHistorial } from '../../domain/entities/cultivo-historial';
import { CultivoHistorialRepository } from '../../domain/ports/cultivo-historial.repository';

@Injectable()
export class CrearCultivoHistorialUseCase {
  constructor(
    @Inject(CultivoHistorialRepository)
    private readonly repository: CultivoHistorialRepository,
  ) {}

  ejecutar(historial: CultivoHistorial): Promise<CultivoHistorial> {
    return this.repository.crear(historial);
  }
}
