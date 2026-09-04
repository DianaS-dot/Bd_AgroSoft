import { Inject, Injectable } from '@nestjs/common';
import { Actividad } from '../../domain/entities/actividad.entity';
import { ActividadRepository, ACTIVIDAD_REPOSITORY } from '../../domain/ports/actividad.repository-port';
import { ActividadNoEncontradaError } from '../../domain/errors/actividad-no-encontrada.error';

@Injectable()
export class ActualizarActividadUseCase {
  constructor(
    @Inject(ACTIVIDAD_REPOSITORY)
    private readonly actividadRepository: ActividadRepository,
  ) {}

  async execute(
    id: string,
    input: {
      nombre?: string;
      descripcion?: string;
      fechaInicio?: Date;
      fechaFin?: Date;
      estado?: string;
    },
  ): Promise<Actividad> {
    const actividadExistente = await this.actividadRepository.findById(id);
    if (!actividadExistente) {
      throw new ActividadNoEncontradaError(id);
    }

    const actividadActualizada = Actividad.create({
      id: actividadExistente.id,
      nombre: input.nombre ?? actividadExistente.nombre,
      descripcion: input.descripcion ?? actividadExistente.descripcion,
      fechaInicio: input.fechaInicio ?? actividadExistente.fechaInicio,
      fechaFin: input.fechaFin ?? actividadExistente.fechaFin,
      estado: input.estado ?? actividadExistente.estado,
    });

    await this.actividadRepository.update(actividadActualizada);
    return actividadActualizada;
  }
}
