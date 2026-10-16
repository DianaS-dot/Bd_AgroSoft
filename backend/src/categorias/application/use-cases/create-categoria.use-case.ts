import { Injectable, Inject } from '@nestjs/common';
import { Categoria } from '../../domain/entities/categoria.entity';
import type { CategoriaRepository } from '../../domain/ports/categoria-repository.port';
import { CATEGORIA_REPOSITORY } from '../../domain/ports/categoria-repository.port';

@Injectable()
export class CreateCategoriaUseCase {
  constructor(
    @Inject(CATEGORIA_REPOSITORY)
    private readonly categoriaRepository: CategoriaRepository,
  ) {}

  async execute(data: any): Promise<Categoria> {
    const nuevaCategoria = new Categoria(
      null,
      data.nombre,
      data.descripcion,
      data.tipoInsumo,
    );
    return await this.categoriaRepository.save(nuevaCategoria);
  }
}
