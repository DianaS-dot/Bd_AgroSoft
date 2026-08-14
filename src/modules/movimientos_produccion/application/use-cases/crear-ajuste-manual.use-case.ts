import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { MovimientoProduccion } from '../../domain/entities/movimiento-produccion.entity';
import { TipoMovimiento } from '../../domain/entities/tipo-movimiento.enum';
import { RegistrarMovimientoUseCase } from './registrar-movimiento.use-case';
import { CrearAjusteManualDto } from '../dto/crear-ajuste-manual.dto';
import { LOTE_PRODUCCION_REPOSITORY } from '../../../lotes-produccion/domain/ports/lote-produccion.repository.port';
import type { LoteProduccionRepositoryPort } from '../../../lotes-produccion/domain/ports/lote-produccion.repository.port';
import { TRANSACTION_MANAGER } from '../../../../shared/ports/transaction-manager.port';
import type { TransactionManagerPort } from '../../../../shared/ports/transaction-manager.port';

/** Único caso de uso expuesto por HTTP para crear movimientos: ajustes manuales de inventario. */
@Injectable()
export class CrearAjusteManualUseCase {
  constructor(
    @Inject(LOTE_PRODUCCION_REPOSITORY)
    private readonly loteRepo: LoteProduccionRepositoryPort,
    private readonly registrarMovimiento: RegistrarMovimientoUseCase,
    @Inject(TRANSACTION_MANAGER)
    private readonly tx: TransactionManagerPort,
  ) {}

  async ejecutar(dto: CrearAjusteManualDto): Promise<MovimientoProduccion> {
    const lote = await this.loteRepo.buscarPorId(dto.loteProduccionId);
    if (!lote) throw new NotFoundException('Lote de producción no encontrado');

    return this.tx.ejecutarEnTransaccion(async (manager) => {
      try {
        if (dto.direccion === 'SALIDA') {
          lote.descontarStock(dto.cantidadKg);
        } else {
          lote.incrementarStock(dto.cantidadKg);
        }
      } catch (err) {
        throw new BadRequestException((err as Error).message);
      }
      await this.loteRepo.actualizar(lote.id as number, lote);

      return this.registrarMovimiento.ejecutar(
        {
          loteProduccionId: dto.loteProduccionId,
          tipo: dto.direccion === 'SALIDA' ? TipoMovimiento.AJUSTE_MANUAL_SALIDA : TipoMovimiento.AJUSTE_MANUAL_ENTRADA,
          cantidadKg: dto.cantidadKg,
          costoUnitarioKg: lote.costoUnitarioKg,
          ventaId: null,
          descripcion: dto.descripcion ?? null,
          usuarioId: dto.usuarioId,
        },
        manager,
      );
    });
  }
}