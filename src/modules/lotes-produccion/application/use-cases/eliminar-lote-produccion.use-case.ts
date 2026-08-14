import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LOTE_PRODUCCION_REPOSITORY } from '../../domain/ports/lote-produccion.repository.port';
import type { LoteProduccionRepositoryPort } from '../../domain/ports/lote-produccion.repository.port';

@Injectable()
export class EliminarLoteProduccionUseCase {
  constructor(
    @Inject(LOTE_PRODUCCION_REPOSITORY)
    private readonly repo: LoteProduccionRepositoryPort,
  ) {}

  async ejecutar(id: number): Promise<void> {
    const lote = await this.repo.buscarPorId(id);
    if (!lote) {
      throw new NotFoundException('Lote de producción no encontrado');
    }
    await this.repo.eliminar(id);
  }
}