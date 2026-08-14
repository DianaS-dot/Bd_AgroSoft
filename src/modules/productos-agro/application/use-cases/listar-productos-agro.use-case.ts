import { Inject, Injectable } from '@nestjs/common';
import { ProductoAgro } from '../../domain/entities/producto-agro.entity';
import { PRODUCTO_AGRO_REPOSITORY } from '../../domain/ports/producto-agro.repository.port';
import type { ProductoAgroRepositoryPort } from '../../domain/ports/producto-agro.repository.port';

@Injectable()
export class ListarProductosAgroUseCase {
  constructor(
    @Inject(PRODUCTO_AGRO_REPOSITORY)
    private readonly repo: ProductoAgroRepositoryPort,
  ) {}

  async ejecutar(): Promise<ProductoAgro[]> {
    return this.repo.listar();
  }
}