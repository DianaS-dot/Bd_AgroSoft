import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PAGO_REPOSITORY } from '../../domain/ports/pago.repository.port';
import type { PagoRepositoryPort } from '../../domain/ports/pago.repository.port';

@Injectable()
export class EliminarPagoUseCase {
  constructor(
    @Inject(PAGO_REPOSITORY)
    private readonly repo: PagoRepositoryPort,
  ) {}

  async ejecutar(id: number): Promise<void> {
    const pago = await this.repo.buscarPorId(id);
    if (!pago) {
      throw new NotFoundException('Pago no encontrado');
    }
    await this.repo.eliminar(id);
  }
}