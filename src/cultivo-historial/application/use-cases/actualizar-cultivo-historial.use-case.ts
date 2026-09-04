import { Injectable, Inject } from '@nestjs/common';

import { CultivoHistorial } from '../../domain/entities/cultivo-historial';
import { CultivoHistorialRepository } from '../../domain/ports/cultivo-historial.repository';

@Injectable()
export class ActualizarCultivoHistorialUseCase {
  constructor(
    @Inject(CultivoHistorialRepository)
    private readonly repository: CultivoHistorialRepository,
  ) {}

  ejecutar(historial: CultivoHistorial) {
    return this.repository.actualizar(historial);
  }
}
