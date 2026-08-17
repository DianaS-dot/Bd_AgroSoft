import { Injectable, Inject } from '@nestjs/common';
import { Reserva } from '../../domain/entities/reserva.entity';
import type { ReservaRepository } from '../../domain/ports/reserva-repository.port';
import { RESERVA_REPOSITORY } from '../../domain/ports/reserva-repository.port';

@Injectable()
export class GetReservaUseCase {
  constructor(
    @Inject(RESERVA_REPOSITORY)
    private readonly reservaRepository: ReservaRepository,
  ) {}

  async execute(id: number): Promise<Reserva | null> {
    return await this.reservaRepository.findById(id);
  }

  async executeAll(): Promise<Reserva[]> {
    return await this.reservaRepository.findAll();
  }
}
