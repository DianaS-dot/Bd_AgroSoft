import { Injectable, Inject } from '@nestjs/common';
import { MovimientoInsumo } from '../../domain/entities/movimiento-insumo.entity';
import type { MovimientoInsumoRepository } from '../../domain/ports/movimiento-insumo-repository.port';
import { MOVIMIENTO_INSUMO_REPOSITORY } from '../../domain/ports/movimiento-insumo-repository.port';

@Injectable()
export class GetMovimientoInsumoUseCase {
  constructor(
    @Inject(MOVIMIENTO_INSUMO_REPOSITORY)
    private readonly movimientoInsumoRepository: MovimientoInsumoRepository,
  ) {}

  async execute(id: number): Promise<MovimientoInsumo | null> {
    return await this.movimientoInsumoRepository.findById(id);
  }

  async executeAll(): Promise<MovimientoInsumo[]> {
    return await this.movimientoInsumoRepository.findAll();
  }
}
