import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FACTURA_REPOSITORY } from '../../domain/ports/factura.repository.port';
import type { FacturaRepositoryPort } from '../../domain/ports/factura.repository.port';

@Injectable()
export class EliminarFacturaUseCase {
  constructor(
    @Inject(FACTURA_REPOSITORY)
    private readonly repo: FacturaRepositoryPort,
  ) {}

  async ejecutar(id: number): Promise<void> {
    const factura = await this.repo.buscarPorId(id);
    if (!factura) {
      throw new NotFoundException('Factura no encontrada');
    }
    await this.repo.eliminar(id);
  }
}