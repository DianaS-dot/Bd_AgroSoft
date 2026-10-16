import { Injectable, Inject } from '@nestjs/common';
import { Reserva } from '../../domain/entities/reserva.entity';
import type { ReservaRepository } from '../../domain/ports/reserva-repository.port';
import { RESERVA_REPOSITORY } from '../../domain/ports/reserva-repository.port';

@Injectable()
export class CreateReservaUseCase {
  constructor(
    @Inject(RESERVA_REPOSITORY)
    private readonly reservaRepository: ReservaRepository,
  ) {}

  async execute(data: any): Promise<Reserva> {
    const nuevaReserva = new Reserva(
      null,
      data.actividadId,
      data.insumoId,
      data.cantidadReservada,
    );
    return await this.reservaRepository.save(nuevaReserva);
  }
}
