import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PRODUCTO_AGRO_REPOSITORY } from '../../domain/ports/producto-agro.repository.port';
import type { ProductoAgroRepositoryPort } from '../../domain/ports/producto-agro.repository.port';

@Injectable()
export class EliminarProductoAgroUseCase {
  constructor(
    @Inject(PRODUCTO_AGRO_REPOSITORY)
    private readonly repo: ProductoAgroRepositoryPort,
  ) {}

  async ejecutar(id: number): Promise<void> {
    const producto = await this.repo.buscarPorId(id);
    if (!producto) {
      throw new NotFoundException('Producto agro no encontrado');
    }
    await this.repo.eliminar(id);
  }
}