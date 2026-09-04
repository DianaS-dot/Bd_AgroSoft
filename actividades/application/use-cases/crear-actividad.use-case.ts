import { Inject, Injectable } from '@nestjs/common';
import { Actividad } from '../../domain/entities/actividad.entity';
import { ActividadRepository, ACTIVIDAD_REPOSITORY } from '../../domain/ports/actividad.repository-port';
import { randomUUID } from 'crypto';

@Injectable()
export class CrearActividadUseCase {
  constructor(
    @Inject(ACTIVIDAD_REPOSITORY)
    private readonly actividadRepository: ActividadRepository,
  ) {}

  async execute(input: {
    nombre: string;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;
    estado?: string;
  }): Promise<Actividad> {
    const actividad = Actividad.create({
      id: randomUUID(),
      nombre: input.nombre,
      descripcion: input.descripcion,
      fechaInicio: input.fechaInicio,
      fechaFin: input.fechaFin,
      estado: input.estado,
    });

    await this.actividadRepository.save(actividad);
    return actividad;
  }
}
