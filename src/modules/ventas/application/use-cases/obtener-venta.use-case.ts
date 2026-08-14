import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Venta } from '../../domain/entities/venta.entity';
import { VENTA_REPOSITORY } from '../../domain/ports/venta.repository.port';
import type { VentaRepositoryPort } from '../../domain/ports/venta.repository.port';

@Injectable()
export class ObtenerVentaUseCase {
  constructor(
    @Inject(VENTA_REPOSITORY)
    private readonly repo: VentaRepositoryPort,
  ) {}

  async ejecutar(id: number): Promise<Venta> {
    const venta = await this.repo.buscarPorId(id);
    if (!venta) {
      throw new NotFoundException('Venta no encontrada');
    }
    return venta;
  }
}