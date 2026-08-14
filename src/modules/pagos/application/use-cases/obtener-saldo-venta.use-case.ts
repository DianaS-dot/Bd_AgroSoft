import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PAGO_REPOSITORY } from '../../domain/ports/pago.repository.port';
import type { PagoRepositoryPort } from '../../domain/ports/pago.repository.port';
import { VENTA_REPOSITORY } from '../../../ventas/domain/ports/venta.repository.port';
import type { VentaRepositoryPort } from '../../../ventas/domain/ports/venta.repository.port';

@Injectable()
export class ObtenerSaldoVentaUseCase {
  constructor(
    @Inject(PAGO_REPOSITORY)
    private readonly pagoRepo: PagoRepositoryPort,
    @Inject(VENTA_REPOSITORY)
    private readonly ventaRepo: VentaRepositoryPort,
  ) {}

  async ejecutar(ventaId: number): Promise<{ total: number; totalPagado: number; saldoPendiente: number }> {
    const venta = await this.ventaRepo.buscarPorId(ventaId);
    if (!venta) {
      throw new NotFoundException('Venta no encontrada');
    }
    const totalPagado = await this.pagoRepo.sumarPagosPorVenta(ventaId);
    return {
      total: venta.total,
      totalPagado,
      saldoPendiente: venta.total - totalPagado,
    };
  }
}