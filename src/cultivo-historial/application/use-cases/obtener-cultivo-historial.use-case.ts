import { Injectable, Inject } from '@nestjs/common';

import { CultivoHistorialRepository } from '../../domain/ports/cultivo-historial.repository';

@Injectable()
export class ObtenerCultivoHistorialUseCase {
  constructor(
    @Inject(CultivoHistorialRepository)
    private readonly repository: CultivoHistorialRepository,
  ) {}

  ejecutar(id: number) {
    return this.repository.obtenerPorId(id);
  }
}
