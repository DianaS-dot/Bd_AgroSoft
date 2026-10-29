import { Inject, Injectable } from '@nestjs/common';
import { TipoFormacion } from '../../domain/entities/tipo-formacion.entity';
import type { TipoFormacionRepository } from '../../domain/ports/tipo-formacion.repository.port';
import { TIPO_FORMACION_REPOSITORY } from '../../domain/ports/tipo-formacion.repository.port';

@Injectable()
export class CreateTipoFormacionUseCase {
  constructor(
    @Inject(TIPO_FORMACION_REPOSITORY)
    private readonly tipoFormacionRepository: TipoFormacionRepository,
  ) {}

  async execute(input: {
    codigo: string;
    nombre: string;
    descripcion?: string;
    activo?: boolean;
    orden: number;
  }): Promise<TipoFormacion> {
    const tipoFormacion = TipoFormacion.create(input);
    return this.tipoFormacionRepository.save(tipoFormacion);
  }
}