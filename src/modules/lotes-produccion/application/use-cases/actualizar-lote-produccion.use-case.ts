import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LoteProduccion } from '../../domain/entities/lote-produccion.entity';
import { LOTE_PRODUCCION_REPOSITORY } from '../../domain/ports/lote-produccion.repository.port';
import type { LoteProduccionRepositoryPort } from '../../domain/ports/lote-produccion.repository.port';
import { ActualizarLoteProduccionDto } from '../dto/actualizar-lote-produccion.dto';

@Injectable()
export class ActualizarLoteProduccionUseCase {
  constructor(
    @Inject(LOTE_PRODUCCION_REPOSITORY)
    private readonly repo: LoteProduccionRepositoryPort,
  ) {}

  async ejecutar(id: number, dto: ActualizarLoteProduccionDto): Promise<LoteProduccion> {
    const lote = await this.repo.buscarPorId(id);
    if (!lote) {
      throw new NotFoundException('Lote de producción no encontrado');
    }
    lote.actualizar(dto);
    return this.repo.actualizar(id, lote);
  }
}