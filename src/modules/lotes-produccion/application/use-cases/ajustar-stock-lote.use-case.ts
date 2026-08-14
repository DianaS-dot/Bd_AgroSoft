import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { LoteProduccion } from '../../domain/entities/lote-produccion.entity';
import { LOTE_PRODUCCION_REPOSITORY } from '../../domain/ports/lote-produccion.repository.port';
import type { LoteProduccionRepositoryPort } from '../../domain/ports/lote-produccion.repository.port';
import { AjustarStockDto } from '../../infrastructure/http/dto/ajustar-stock.dto';

/**
 * Caso de uso reutilizable: lo usará este módulo vía endpoint administrativo,
 * y también lo invocarán (como servicio interno) los módulos de ventas_detalles
 * y movimientos_produccion cuando se registre una venta o su anulación.
 */
@Injectable()
export class AjustarStockLoteUseCase {
  constructor(
    @Inject(LOTE_PRODUCCION_REPOSITORY)
    private readonly repo: LoteProduccionRepositoryPort,
  ) {}

  async ejecutar(id: number, dto: AjustarStockDto): Promise<LoteProduccion> {
    const lote = await this.repo.buscarPorId(id);
    if (!lote) {
      throw new NotFoundException('Lote de producción no encontrado');
    }

    try {
      if (dto.operacion === 'DESCONTAR') {
        lote.descontarStock(dto.cantidadKg);
      } else {
        lote.incrementarStock(dto.cantidadKg);
      }
    } catch (err) {
      throw new BadRequestException((err as Error).message);
    }

    return this.repo.actualizar(id, lote);
  }
}