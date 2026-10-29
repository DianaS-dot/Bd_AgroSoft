import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TipoFormacion } from '../../domain/entities/tipo-formacion.entity';
import type { TipoFormacionRepository } from '../../domain/ports/tipo-formacion.repository.port';
import { TIPO_FORMACION_REPOSITORY } from '../../domain/ports/tipo-formacion.repository.port';

@Injectable()
export class GetTipoFormacionUseCase {
  constructor(
    @Inject(TIPO_FORMACION_REPOSITORY)
    private readonly tipoFormacionRepository: TipoFormacionRepository,
  ) {}

  async execute(id?: number): Promise<TipoFormacion | TipoFormacion[]> {
    if (id !== undefined) {
      const tipo = await this.tipoFormacionRepository.findById(id);
      if (!tipo) {
        throw new NotFoundException(`Tipo de formación con id ${id} no encontrado`);
      }
      return tipo;
    }
    return this.tipoFormacionRepository.findAll();
  }
}