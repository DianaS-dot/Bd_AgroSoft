import { Inject, Injectable } from '@nestjs/common';
import { LoteProduccion } from '../../domain/entities/lote-produccion.entity';
import { LOTE_PRODUCCION_REPOSITORY } from '../../domain/ports/lote-produccion.repository.port';
import type { LoteProduccionRepositoryPort } from '../../domain/ports/lote-produccion.repository.port';

@Injectable()
export class ListarLotesProduccionUseCase {
  constructor(
    @Inject(LOTE_PRODUCCION_REPOSITORY)
    private readonly repo: LoteProduccionRepositoryPort,
  ) {}

  async ejecutar(soloConStock?: boolean): Promise<LoteProduccion[]> {
    if (soloConStock) {
      return this.repo.listarConStockDisponible();
    }
    return this.repo.listar();
  }
}