import { Inject, Injectable } from '@nestjs/common';
import { VentaDetalle } from '../../domain/entities/venta-detalle.entity';
import { VENTA_DETALLE_REPOSITORY } from '../../domain/ports/venta-detalle.repository.port';
import type { VentaDetalleRepositoryPort } from '../../domain/ports/venta-detalle.repository.port';

@Injectable()
export class ListarDetallesVentaUseCase {
  constructor(
    @Inject(VENTA_DETALLE_REPOSITORY)
    private readonly repo: VentaDetalleRepositoryPort,
  ) {}

  async ejecutar(ventaId: number): Promise<VentaDetalle[]> {
    return this.repo.listarPorVenta(ventaId);
  }
}