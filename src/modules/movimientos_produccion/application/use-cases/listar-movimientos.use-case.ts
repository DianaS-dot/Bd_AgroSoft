import { Inject, Injectable } from '@nestjs/common';
import { MovimientoProduccion } from '../../domain/entities/movimiento-produccion.entity';
import { MOVIMIENTO_PRODUCCION_REPOSITORY } from '../../domain/ports/movimiento-produccion.repository.port';
import type { MovimientoProduccionRepositoryPort } from '../../domain/ports/movimiento-produccion.repository.port';

@Injectable()
export class ListarMovimientosUseCase {
  constructor(
    @Inject(MOVIMIENTO_PRODUCCION_REPOSITORY)
    private readonly repo: MovimientoProduccionRepositoryPort,
  ) {}

  async ejecutar(filtros?: { loteProduccionId?: number; ventaId?: number }): Promise<MovimientoProduccion[]> {
    if (filtros?.loteProduccionId) {
      return this.repo.listarPorLote(filtros.loteProduccionId);
    }
    if (filtros?.ventaId) {
      return this.repo.listarPorVenta(filtros.ventaId);
    }
    return this.repo.listar();
  }
}