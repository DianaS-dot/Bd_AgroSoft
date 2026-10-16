import { Injectable, Inject } from '@nestjs/common';
import { Categoria } from '../../domain/entities/categoria.entity';
import type { CategoriaRepository } from '../../domain/ports/categoria-repository.port';
import { CATEGORIA_REPOSITORY } from '../../domain/ports/categoria-repository.port';

@Injectable()
export class GetCategoriaUseCase {
  constructor(
    @Inject(CATEGORIA_REPOSITORY)
    private readonly categoriaRepository: CategoriaRepository,
  ) {}

  async execute(id: number): Promise<Categoria | null> {
    return await this.categoriaRepository.findById(id);
  }

  async executeAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.findAll();
  }
}
