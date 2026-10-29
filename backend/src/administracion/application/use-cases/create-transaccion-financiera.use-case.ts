import { Inject, Injectable } from '@nestjs/common';
import { TransaccionFinanciera } from '../../domain/entities/transaccion-financiera.entity';
import type { TransaccionFinancieraRepository } from '../../domain/ports/transaccion-financiera.repository.port';
import { TRANSACCION_FINANCIERA_REPOSITORY } from '../../domain/ports/transaccion-financiera.repository.port';

@Injectable()
export class CreateTransaccionFinancieraUseCase {
  constructor(
    @Inject(TRANSACCION_FINANCIERA_REPOSITORY)
    private readonly transaccionFinancieraRepository: TransaccionFinancieraRepository,
  ) {}

  async execute(input: {
    tipo: string;
    categoria: string;
    monto: number;
    descripcion?: string;
    fecha: string;
    actividadId?: number;
    insumoId?: number;
    ventaId?: number;
    usuarioId: number;
  }): Promise<TransaccionFinanciera> {
    const transaccion = TransaccionFinanciera.create({
      ...input,
      fecha: new Date(input.fecha),
    });
    return this.transaccionFinancieraRepository.save(transaccion);
  }
}