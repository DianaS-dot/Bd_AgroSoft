import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { VENTA_DETALLE_REPOSITORY } from '../../domain/ports/venta-detalle.repository.port';
import type { VentaDetalleRepositoryPort } from '../../domain/ports/venta-detalle.repository.port';
import { TRANSACTION_MANAGER } from '../../../../shared/ports/transaction-manager.port';
import type { TransactionManagerPort } from '../../../../shared/ports/transaction-manager.port';
import { LOTE_PRODUCCION_REPOSITORY } from '../../../lotes-produccion/domain/ports/lote-produccion.repository.port';
import type { LoteProduccionRepositoryPort } from '../../../lotes-produccion/domain/ports/lote-produccion.repository.port';
import { ActualizarTotalesVentaUseCase } from '../../../ventas/application/use-cases/actualizar-totales-venta.use-case';
import { VENTA_REPOSITORY } from '../../../ventas/domain/ports/venta.repository.port';
import type { VentaRepositoryPort } from '../../../ventas/domain/ports/venta.repository.port';
import { RegistrarMovimientoUseCase } from '../../../movimientos_produccion/application/use-cases/registrar-movimiento.use-case';
import { TipoMovimiento } from '../../../movimientos_produccion/domain/entities/tipo-movimiento.enum';

@Injectable()
export class EliminarVentaDetalleUseCase {
  constructor(
    @Inject(VENTA_DETALLE_REPOSITORY)
    private readonly detalleRepo: VentaDetalleRepositoryPort,
    @Inject(LOTE_PRODUCCION_REPOSITORY)
    private readonly loteRepo: LoteProduccionRepositoryPort,
    @Inject(VENTA_REPOSITORY)
    private readonly ventaRepo: VentaRepositoryPort,
    private readonly actualizarTotalesVenta: ActualizarTotalesVentaUseCase,
    private readonly registrarMovimiento: RegistrarMovimientoUseCase,
    @Inject(TRANSACTION_MANAGER)
    private readonly tx: TransactionManagerPort,
  ) {}

  async ejecutar(id: number, usuarioId: number): Promise<void> {
    const detalle = await this.detalleRepo.buscarPorId(id);
    if (!detalle) throw new NotFoundException('Detalle de venta no encontrado');

    const venta = await this.ventaRepo.buscarPorId(detalle.ventaId);
    if (!venta) throw new NotFoundException('Venta no encontrada');
    if (!venta.estaActiva()) {
      throw new BadRequestException('No se pueden eliminar detalles de una venta anulada');
    }

    await this.tx.ejecutarEnTransaccion(async (manager) => {
      const lote = await this.loteRepo.buscarPorId(detalle.loteProduccionId);
      if (lote) {
        lote.incrementarStock(detalle.cantidadKg);
        await this.loteRepo.actualizar(lote.id as number, lote);
      }

      await this.detalleRepo.eliminar(id, manager);

      const detallesRestantes = await this.detalleRepo.listarPorVenta(detalle.ventaId);
      const subtotal = detallesRestantes.reduce((acc, d) => acc + d.precioTotal, 0);
      await this.actualizarTotalesVenta.ejecutar(detalle.ventaId, {
        subtotal,
        impuestos: venta.impuestos,
        descuento: venta.descuento,
      });

      if (lote) {
        await this.registrarMovimiento.ejecutar(
          {
            loteProduccionId: detalle.loteProduccionId,
            tipo: TipoMovimiento.ENTRADA_ANULACION,
            cantidadKg: detalle.cantidadKg,
            costoUnitarioKg: detalle.costoUnitarioKg,
            ventaId: detalle.ventaId,
            descripcion: `Reposición de stock por eliminación del detalle #${id} de la venta #${detalle.ventaId}`,
            usuarioId,
          },
          manager,
        );
      }
    });
  }
}