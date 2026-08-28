import { Injectable, Inject } from '@nestjs/common';
import type { InsumoRepository } from '../../domain/ports/insumo-repository.port';
import { INSUMO_REPOSITORY } from '../../domain/ports/insumo-repository.port';

@Injectable()
export class DeleteInsumoUseCase {
  constructor(
    @Inject(INSUMO_REPOSITORY)
    private readonly insumoRepository: InsumoRepository,
  ) {}

  async execute(id: number): Promise<boolean> {
    const existingInsumo = await this.insumoRepository.findById(id);
    
    if (!existingInsumo) {
      throw new Error('Insumo no encontrado');
    }

    return await this.insumoRepository.delete(id);
  }
}
