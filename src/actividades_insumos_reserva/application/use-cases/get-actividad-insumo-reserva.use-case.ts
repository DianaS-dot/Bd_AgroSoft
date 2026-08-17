import { Injectable, Inject } from '@nestjs/common';
import { ActividadInsumoReserva } from '../../domain/entities/actividad-insumo-reserva.entity';
import type { ActividadInsumoReservaRepository } from '../../domain/ports/actividad-insumo-reserva-repository.port';
import { ACTIVIDAD_INSUMO_RESERVA_REPOSITORY } from '../../domain/ports/actividad-insumo-reserva-repository.port';

@Injectable()
export class GetActividadInsumoReservaUseCase {
  constructor(
    @Inject(ACTIVIDAD_INSUMO_RESERVA_REPOSITORY)
    private readonly actividadInsumoReservaRepository: ActividadInsumoReservaRepository,
  ) {}

  async execute(id: number): Promise<ActividadInsumoReserva | null> {
    return await this.actividadInsumoReservaRepository.findById(id);
  }

  async executeAll(): Promise<ActividadInsumoReserva[]> {
    return await this.actividadInsumoReservaRepository.findAll();
  }
}
