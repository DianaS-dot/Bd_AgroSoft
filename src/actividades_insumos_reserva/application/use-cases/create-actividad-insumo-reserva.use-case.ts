import { Injectable, Inject } from '@nestjs/common';
import { ActividadInsumoReserva } from '../../domain/entities/actividad-insumo-reserva.entity';
import type { ActividadInsumoReservaRepository } from '../../domain/ports/actividad-insumo-reserva-repository.port';
import { ACTIVIDAD_INSUMO_RESERVA_REPOSITORY } from '../../domain/ports/actividad-insumo-reserva-repository.port';

@Injectable()
export class CreateActividadInsumoReservaUseCase {
  constructor(
    @Inject(ACTIVIDAD_INSUMO_RESERVA_REPOSITORY)
    private readonly actividadInsumoReservaRepository: ActividadInsumoReservaRepository,
  ) {}

  async execute(data: any): Promise<ActividadInsumoReserva> {
    const nuevaActividadInsumoReserva = new ActividadInsumoReserva(
      null,
      data.actividadId,
      data.insumoId,
      data.cantidadReservada,
    );
    return await this.actividadInsumoReservaRepository.save(nuevaActividadInsumoReserva);
  }
}
