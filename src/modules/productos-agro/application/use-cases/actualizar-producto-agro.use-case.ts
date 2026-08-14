import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductoAgro } from '../../domain/entities/producto-agro.entity';
import { PRODUCTO_AGRO_REPOSITORY } from '../../domain/ports/producto-agro.repository.port';
import type { ProductoAgroRepositoryPort } from '../../domain/ports/producto-agro.repository.port';
import { ActualizarProductoAgroDto } from '../../infrastructure/http/dto/actualizar-producto-agro.dto';

@Injectable()
export class ActualizarProductoAgroUseCase {
  constructor(
    @Inject(PRODUCTO_AGRO_REPOSITORY)
    private readonly repo: ProductoAgroRepositoryPort,
  ) {}

  async ejecutar(id: number, dto: ActualizarProductoAgroDto): Promise<ProductoAgro> {
    const producto = await this.repo.buscarPorId(id);
    if (!producto) {
      throw new NotFoundException('Producto agro no encontrado');
    }

    producto.actualizar(dto);
    return this.repo.actualizar(id, producto);
  }
}