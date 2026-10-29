import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Epa } from '../../domain/entities/epa.entity';
import type { EpaRepository } from '../../domain/ports/epa.repository.port';
import { EPA_REPOSITORY } from '../../domain/ports/epa.repository.port';

@Injectable()
export class UpdateEpaUseCase {
  constructor(
    @Inject(EPA_REPOSITORY)
    private readonly epaRepository: EpaRepository,
  ) {}

  async execute(id: number, input: Partial<{
    nombre: string;
    tipoEpa: string;
    descripcion: string;
    sintomas: string;
    manejoYControl: string;
    mesesProbables: number[];
    temporadas: string[];
    notasEstacionalidad: string;
    fotosSintomas: string[];
    fotosGenerales: string[];
    tags: string[];
    creadoPorUsuarioId: number;
  }>): Promise<Epa> {
    const updated = await this.epaRepository.update(id, input);
    if (!updated) {
      throw new NotFoundException(`EPA con id ${id} no encontrada`);
    }
    return updated;
  }
}
