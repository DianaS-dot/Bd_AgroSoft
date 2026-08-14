import { Inject, Injectable } from '@nestjs/common';
import { MovimientoProduccion } from '../../domain/entities/movimiento-produccion.entity';
import { TipoMovimiento } from '../../domain/entities/tipo-movimiento.enum';
import { MOVIMIENTO_PRODUCCION_REPOSITORY } from '../../domain/ports/movimiento-produccion.repository.port';
import type { MovimientoProduccionRepositoryPort } from '../../domain/ports/movimiento-produccion.repository.port';

/**
 * Caso de uso interno: NO se expone por HTTP directamente.
 * Lo invocarán ventas_detalles (al vender o eliminar un detalle) y ventas
 * (al anular) dentro de su propia transacción, pasando el mismo `manager`.
 */
@Injectable()
export class RegistrarMovimientoUseCase {
  constructor(
    @Inject(MOVIMIENTO_PRODUCCION_REPOSITORY)
    private readonly repo: MovimientoProduccionRepositoryPort,
  ) {}

  async ejecutar(
    datos: {
      loteProduccionId: number;
      tipo: TipoMovimiento;
      cantidadKg: number;
      costoUnitarioKg: number;
      ventaId: number | null;
      descripcion: string | null;
      usuarioId: number;
    },
    manager?: unknown,
  ): Promise<MovimientoProduccion> {
    const movimiento = new MovimientoProduccion(
      null,
      datos.loteProduccionId,
      datos.tipo,
      datos.cantidadKg,
      datos.costoUnitarioKg,
      datos.cantidadKg * datos.costoUnitarioKg,
      datos.ventaId,
      datos.descripcion,
      datos.usuarioId,
      new Date(),
    );
    return this.repo.crear(movimiento, manager);
  }
}