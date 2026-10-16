import { Injectable, Inject } from '@nestjs/common';
import { MovimientoInsumo } from '../../domain/entities/movimiento-insumo.entity';
import type { MovimientoInsumoRepository } from '../../domain/ports/movimiento-insumo-repository.port';
import { MOVIMIENTO_INSUMO_REPOSITORY } from '../../domain/ports/movimiento-insumo-repository.port';

@Injectable()
export class CreateMovimientoInsumoUseCase {
  constructor(
    @Inject(MOVIMIENTO_INSUMO_REPOSITORY)
    private readonly movimientoInsumoRepository: MovimientoInsumoRepository,
  ) {}

  async execute(data: any): Promise<MovimientoInsumo> {
    const nuevoMovimiento = new MovimientoInsumo(
      null,
      data.insumoId,
      data.tipo,
      data.cantidadPresentacion,
      data.cantidadUso,
      data.costoUnitarioPresentacion,
      data.costoUnitarioUso,
      data.costoTotal,
      data.valorInventarioResultante,
      data.descripcion,
      data.actividadId,
      data.usuarioId,
      data.almacenOrigenId,
      data.almacenDestinoId,
    );
    return await this.movimientoInsumoRepository.save(nuevoMovimiento);
  }
}
