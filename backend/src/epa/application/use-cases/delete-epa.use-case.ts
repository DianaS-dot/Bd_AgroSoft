import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { EpaRepository } from '../../domain/ports/epa.repository.port';
import { EPA_REPOSITORY } from '../../domain/ports/epa.repository.port';

@Injectable()
export class DeleteEpaUseCase {
  constructor(
    @Inject(EPA_REPOSITORY)
    private readonly epaRepository: EpaRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const epa = await this.epaRepository.findById(id);
    if (!epa) {
      throw new NotFoundException(`EPA con id ${id} no encontrada`);
    }
    await this.epaRepository.softDelete(id);
  }
}
