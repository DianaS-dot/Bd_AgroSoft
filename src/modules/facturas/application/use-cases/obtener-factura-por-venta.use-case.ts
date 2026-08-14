import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Factura } from '../../domain/entities/factura.entity';
import { FACTURA_REPOSITORY } from '../../domain/ports/factura.repository.port';
import type { FacturaRepositoryPort } from '../../domain/ports/factura.repository.port';

@Injectable()
export class ObtenerFacturaPorVentaUseCase {
  constructor(
    @Inject(FACTURA_REPOSITORY)
    private readonly repo: FacturaRepositoryPort,
  ) {}

  async ejecutar(ventaId: number): Promise<Factura> {
    const factura = await this.repo.buscarPorVentaId(ventaId);
    if (!factura) {
      throw new NotFoundException('Esta venta no tiene factura asociada');
    }
    return factura;
  }
}