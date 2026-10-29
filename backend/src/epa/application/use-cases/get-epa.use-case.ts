import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Epa } from '../../domain/entities/epa.entity';
import type { EpaRepository } from '../../domain/ports/epa.repository.port';
import { EPA_REPOSITORY } from '../../domain/ports/epa.repository.port';

@Injectable()
export class GetEpaUseCase {
  constructor(
    @Inject(EPA_REPOSITORY)
    private readonly epaRepository: EpaRepository,
  ) {}

  async execute(id?: number): Promise<Epa | Epa[]> {
    if (id !== undefined) {
      const epa = await this.epaRepository.findById(id);
      if (!epa) {
        throw new NotFoundException(`EPA con id ${id} no encontrada`);
      }
      return epa;
    }
    return this.epaRepository.findAll();
  }
}