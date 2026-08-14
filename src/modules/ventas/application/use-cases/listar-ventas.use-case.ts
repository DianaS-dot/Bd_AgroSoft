import { Inject, Injectable } from '@nestjs/common';
import { Venta } from '../../domain/entities/venta.entity';
import { VENTA_REPOSITORY } from '../../domain/ports/venta.repository.port';
import type { VentaRepositoryPort } from '../../domain/ports/venta.repository.port';

@Injectable()
export class ListarVentasUseCase {
  constructor(
    @Inject(VENTA_REPOSITORY)
    private readonly repo: VentaRepositoryPort,
  ) {}

  async ejecutar(clienteId?: number): Promise<Venta[]> {
    if (clienteId) {
      return this.repo.listarPorCliente(clienteId);
    }
    return this.repo.listar();
  }
}
