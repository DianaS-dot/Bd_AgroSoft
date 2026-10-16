import { Injectable, Inject } from '@nestjs/common';
import { Insumo } from '../../domain/entities/insumo.entity';
import type { InsumoRepository } from '../../domain/ports/insumo-repository.port';
import { INSUMO_REPOSITORY } from '../../domain/ports/insumo-repository.port';

@Injectable()
export class GetInsumoUseCase {
  constructor(
    @Inject(INSUMO_REPOSITORY)
    private readonly insumoRepository: InsumoRepository,
  ) {}

  async execute(id: number): Promise<Insumo | null> {
    return await this.insumoRepository.findById(id);
  }

  async executeAll(): Promise<Insumo[]> {
    return await this.insumoRepository.findAll();
  }
}
