import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Venta } from '../../domain/entities/venta.entity';
import { VENTA_REPOSITORY } from '../../domain/ports/venta.repository.port';
import type { VentaRepositoryPort } from '../../domain/ports/venta.repository.port';
import { AnularVentaDto } from '../../infrastructure/http/dto/anular-venta.dto';

@Injectable()
export class AnularVentaUseCase {
  constructor(
    @Inject(VENTA_REPOSITORY)
    private readonly repo: VentaRepositoryPort,
  ) {}

  async ejecutar(id: number, dto: AnularVentaDto): Promise<Venta> {
    const venta = await this.repo.buscarPorId(id);
    if (!venta) {
      throw new NotFoundException('Venta no encontrada');
    }

    try {
      venta.anular(dto.usuarioId);
    } catch (err) {
      throw new BadRequestException((err as Error).message);
    }

    // NOTA: cuando conectemos ventas_detalles + movimientos_produccion, aquí se
    // deberá disparar (dentro de una transacción) la reposición de stock de cada
    // lote_produccion vendido en esta venta. Por ahora solo cambia el estado.
    return this.repo.actualizar(id, venta);
  }
}