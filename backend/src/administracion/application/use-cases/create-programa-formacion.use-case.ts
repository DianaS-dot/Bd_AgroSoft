import { Inject, Injectable } from '@nestjs/common';
import { ProgramaFormacion } from '../../domain/entities/programa-formacion.entity';
import type { ProgramaFormacionRepository } from '../../domain/ports/programa-formacion.repository.port';
import { PROGRAMA_FORMACION_REPOSITORY } from '../../domain/ports/programa-formacion.repository.port';

@Injectable()
export class CreateProgramaFormacionUseCase {
  constructor(
    @Inject(PROGRAMA_FORMACION_REPOSITORY)
    private readonly programaFormacionRepository: ProgramaFormacionRepository,
  ) {}

  async execute(input: {
    numeroFicha: string;
    nombre: string;
    tipo: string;
    descripcion?: string;
    fechaInicio: string;
    fechaFin: string;
    estado: string;
    cantidadAprendices: number;
  }): Promise<ProgramaFormacion> {
    const programa = ProgramaFormacion.create({
      ...input,
      fechaInicio: new Date(input.fechaInicio),
      fechaFin: new Date(input.fechaFin),
    });
    return this.programaFormacionRepository.save(programa);
  }
}