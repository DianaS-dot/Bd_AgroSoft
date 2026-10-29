import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TransaccionFinanciera } from '../../domain/entities/transaccion-financiera.entity';
import type { TransaccionFinancieraRepository } from '../../domain/ports/transaccion-financiera.repository.port';
import { TRANSACCION_FINANCIERA_REPOSITORY } from '../../domain/ports/transaccion-financiera.repository.port';

@Injectable()
export class GetTransaccionFinancieraUseCase {
  constructor(
    @Inject(TRANSACCION_FINANCIERA_REPOSITORY)
    private readonly transaccionFinancieraRepository: TransaccionFinancieraRepository,
  ) {}

  async execute(id?: number): Promise<TransaccionFinanciera | TransaccionFinanciera[]> {
    if (id !== undefined) {
      const transaccion = await this.transaccionFinancieraRepository.findById(id);
      if (!transaccion) {
        throw new NotFoundException(`Transacción financiera con id ${id} no encontrada`);
      }
      return transaccion;
    }
    return this.transaccionFinancieraRepository.findAll();
  }
}