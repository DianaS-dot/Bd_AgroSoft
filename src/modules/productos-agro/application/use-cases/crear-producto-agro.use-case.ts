import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { ProductoAgro } from '../../domain/entities/producto-agro.entity';
import { PRODUCTO_AGRO_REPOSITORY } from '../../domain/ports/producto-agro.repository.port';
import type { ProductoAgroRepositoryPort } from '../../domain/ports/producto-agro.repository.port';
import { CrearProductoAgroDto } from '../dto/crear-producto-agro.dto';

@Injectable()
export class CrearProductoAgroUseCase {
  constructor(
    @Inject(PRODUCTO_AGRO_REPOSITORY)
    private readonly repo: ProductoAgroRepositoryPort,
  ) {}

  async ejecutar(dto: CrearProductoAgroDto): Promise<ProductoAgro> {
    const existente = await this.repo.buscarPorNombre(dto.nombre);
    if (existente) {
      throw new ConflictException('Ya existe un producto agro con ese nombre');
    }

    const producto = new ProductoAgro(
      null,
      dto.nombre,
      dto.unidadBase,
      dto.descripcion ?? null,
      dto.imagen ?? null,
    );
    return this.repo.crear(producto);
  }
}