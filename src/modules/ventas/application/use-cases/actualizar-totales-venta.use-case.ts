import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Venta } from '../../domain/entities/venta.entity';
import { VENTA_REPOSITORY } from '../../domain/ports/venta.repository.port';
import type { VentaRepositoryPort } from '../../domain/ports/venta.repository.port';

/**
 * Caso de uso interno: NO se expone por HTTP directamente. Lo invocará el módulo
 * ventas_detalles cada vez que se agregue, edite o elimine una línea de venta,
 * para mantener sincronizados subtotal/impuestos/descuento/total de la venta padre.
 */
@Injectable()
export class ActualizarTotalesVentaUseCase {
  constructor(
    @Inject(VENTA_REPOSITORY)
    private readonly repo: VentaRepositoryPort,
  ) {}

  async ejecutar(
    ventaId: number,
    totales: { subtotal: number; impuestos: number; descuento: number },
  ): Promise<Venta> {
    const venta = await this.repo.buscarPorId(ventaId);
    if (!venta) {
      throw new NotFoundException('Venta no encontrada');
    }
    venta.recalcularTotales(totales.subtotal, totales.impuestos, totales.descuento);
    return this.repo.actualizar(ventaId, venta);
  }
}