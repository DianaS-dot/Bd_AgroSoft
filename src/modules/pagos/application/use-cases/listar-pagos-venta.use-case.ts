import { Inject, Injectable } from '@nestjs/common';
import { Pago } from '../../domain/entities/pago.entity';
import { PAGO_REPOSITORY } from '../../domain/ports/pago.repository.port';
import type { PagoRepositoryPort } from '../../domain/ports/pago.repository.port';

@Injectable()
export class ListarPagosVentaUseCase {
  constructor(
    @Inject(PAGO_REPOSITORY)
    private readonly repo: PagoRepositoryPort,
  ) {}

  async ejecutar(ventaId: number): Promise<Pago[]> {
    return this.repo.listarPorVenta(ventaId);
  }
}