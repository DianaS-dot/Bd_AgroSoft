import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProgramaFormacion } from '../../domain/entities/programa-formacion.entity';
import type { ProgramaFormacionRepository } from '../../domain/ports/programa-formacion.repository.port';
import { PROGRAMA_FORMACION_REPOSITORY } from '../../domain/ports/programa-formacion.repository.port';

@Injectable()
export class GetProgramaFormacionUseCase {
  constructor(
    @Inject(PROGRAMA_FORMACION_REPOSITORY)
    private readonly programaFormacionRepository: ProgramaFormacionRepository,
  ) {}

  async execute(id?: number): Promise<ProgramaFormacion | ProgramaFormacion[]> {
    if (id !== undefined) {
      const programa = await this.programaFormacionRepository.findById(id);
      if (!programa) {
        throw new NotFoundException(`Programa de formación con id ${id} no encontrado`);
      }
      return programa;
    }
    return this.programaFormacionRepository.findAll();
  }
}