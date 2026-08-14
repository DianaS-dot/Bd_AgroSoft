import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { VentaDetalle } from '../../domain/entities/venta-detalle.entity';
import { VENTA_DETALLE_REPOSITORY } from '../../domain/ports/venta-detalle.repository.port';
import type { VentaDetalleRepositoryPort } from '../../domain/ports/venta-detalle.repository.port';
import { CrearVentaDetalleDto } from '../../infrastructure/http/dto/crear-venta-detalle.dto';
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
export class CrearVentaDetalleUseCase {
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

  async ejecutar(dto: CrearVentaDetalleDto): Promise<VentaDetalle> {
    const venta = await this.ventaRepo.buscarPorId(dto.ventaId);
    if (!venta) throw new NotFoundException('Venta no encontrada');
    if (!venta.estaActiva()) {
      throw new BadRequestException('No se pueden agregar detalles a una venta anulada');
    }

    const lote = await this.loteRepo.buscarPorId(dto.loteProduccionId);
    if (!lote) throw new NotFoundException('Lote de producción no encontrado');
    if (lote.productoAgroId !== dto.productoAgroId) {
      throw new BadRequestException('El lote de producción no corresponde al producto agro indicado');
    }

    return this.tx.ejecutarEnTransaccion(async (manager) => {
      try {
        lote.descontarStock(dto.cantidadKg);
      } catch (err) {
        throw new BadRequestException((err as Error).message);
      }
      const costoUnitarioLote = lote.costoUnitarioKg;
      await this.loteRepo.actualizar(lote.id as number, lote);

      const detalle = VentaDetalle.calcular({
        ventaId: dto.ventaId,
        productoAgroId: dto.productoAgroId,
        loteProduccionId: dto.loteProduccionId,
        cultivoId: dto.cultivoId,
        cantidadKg: dto.cantidadKg,
        precioUnitarioKg: dto.precioUnitarioKg,
        costoUnitarioKg: costoUnitarioLote,
      });
      const detalleCreado = await this.detalleRepo.crear(detalle, manager);

      const detallesActuales = await this.detalleRepo.listarPorVenta(dto.ventaId);
      const subtotal = detallesActuales.reduce((acc, d) => acc + d.precioTotal, 0);
      await this.actualizarTotalesVenta.ejecutar(dto.ventaId, {
        subtotal,
        impuestos: venta.impuestos,
        descuento: venta.descuento,
      });

      // Registra la salida de stock en el historial de movimientos
      await this.registrarMovimiento.ejecutar(
        {
          loteProduccionId: dto.loteProduccionId,
          tipo: TipoMovimiento.SALIDA_VENTA,
          cantidadKg: dto.cantidadKg,
          costoUnitarioKg: costoUnitarioLote,
          ventaId: dto.ventaId,
          descripcion: `Venta de ${dto.cantidadKg}kg registrada en el detalle de la venta #${dto.ventaId}`,
          usuarioId: dto.usuarioId,
        },
        manager,
      );

      return detalleCreado;
    });
  }
}