import { Injectable, Inject } from '@nestjs/common';

import { CultivoHistorialRepository } from '../../domain/ports/cultivo-historial.repository';

@Injectable()
export class ObtenerCultivosHistorialUseCase {
  constructor(
    @Inject(CultivoHistorialRepository)
    private readonly repository: CultivoHistorialRepository,
  ) {}

  ejecutar() {
    return this.repository.obtenerTodos();
  }
}
