import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Venta } from '../../../ventas/domain/entities/venta.entity';
import { VENTA_REPOSITORY } from '../../../ventas/domain/ports/venta.repository.port';
import type { VentaRepositoryPort } from '../../../ventas/domain/ports/venta.repository.port';
import { VENTA_DETALLE_REPOSITORY } from '../../domain/ports/venta-detalle.repository.port';
import type { VentaDetalleRepositoryPort } from '../../domain/ports/venta-detalle.repository.port';
import { LOTE_PRODUCCION_REPOSITORY } from '../../../lotes-produccion/domain/ports/lote-produccion.repository.port';
import type { LoteProduccionRepositoryPort } from '../../../lotes-produccion/domain/ports/lote-produccion.repository.port';
import { RegistrarMovimientoUseCase } from '../../../movimientos_produccion/application/use-cases/registrar-movimiento.use-case';
import { TipoMovimiento } from '../../../movimientos_produccion/domain/entities/tipo-movimiento.enum';
import { TRANSACTION_MANAGER } from '../../../../shared/ports/transaction-manager.port';
import type { TransactionManagerPort } from '../../../../shared/ports/transaction-manager.port';

/**
 * Anula una venta completa: repone el stock de TODOS sus detalles, registra
 * un movimiento ENTRADA_ANULACION por cada línea, y cambia el estado de la venta.
 * Este es el flujo recomendado para anular — el PATCH /ventas/:id/anular del
 * módulo ventas por sí solo NO toca stock ni movimientos.
 */
@Injectable()
export class AnularVentaCompletaUseCase {
  constructor(
    @Inject(VENTA_REPOSITORY)
    private readonly ventaRepo: VentaRepositoryPort,
    @Inject(VENTA_DETALLE_REPOSITORY)
    private readonly detalleRepo: VentaDetalleRepositoryPort,
    @Inject(LOTE_PRODUCCION_REPOSITORY)
    private readonly loteRepo: LoteProduccionRepositoryPort,
    private readonly registrarMovimiento: RegistrarMovimientoUseCase,
    @Inject(TRANSACTION_MANAGER)
    private readonly tx: TransactionManagerPort,
  ) {}

  async ejecutar(ventaId: number, usuarioId: number): Promise<Venta> {
    const venta = await this.ventaRepo.buscarPorId(ventaId);
    if (!venta) throw new NotFoundException('Venta no encontrada');
    if (!venta.estaActiva()) {
      throw new BadRequestException('La venta ya se encuentra anulada');
    }

    const detalles = await this.detalleRepo.listarPorVenta(ventaId);

    return this.tx.ejecutarEnTransaccion(async (manager) => {
      for (const detalle of detalles) {
        const lote = await this.loteRepo.buscarPorId(detalle.loteProduccionId);
        if (!lote) continue;

        lote.incrementarStock(detalle.cantidadKg);
        await this.loteRepo.actualizar(lote.id as number, lote);

        await this.registrarMovimiento.ejecutar(
          {
            loteProduccionId: detalle.loteProduccionId,
            tipo: TipoMovimiento.ENTRADA_ANULACION,
            cantidadKg: detalle.cantidadKg,
            costoUnitarioKg: detalle.costoUnitarioKg,
            ventaId,
            descripcion: `Reposición de stock por anulación de la venta #${ventaId}`,
            usuarioId,
          },
          manager,
        );
      }

      try {
        venta.anular(usuarioId);
      } catch (err) {
        throw new BadRequestException((err as Error).message);
      }

      return this.ventaRepo.actualizar(ventaId, venta);
    });
  }
}