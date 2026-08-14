import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Factura } from '../../domain/entities/factura.entity';
import { FACTURA_REPOSITORY } from '../../domain/ports/factura.repository.port';
import type { FacturaRepositoryPort } from '../../domain/ports/factura.repository.port';

@Injectable()
export class ObtenerFacturaUseCase {
  constructor(
    @Inject(FACTURA_REPOSITORY)
    private readonly repo: FacturaRepositoryPort,
  ) {}

  async ejecutar(id: number): Promise<Factura> {
    const factura = await this.repo.buscarPorId(id);
    if (!factura) {
      throw new NotFoundException('Factura no encontrada');
    }
    return factura;
  }
}