import { Injectable, Inject } from '@nestjs/common';
import { ActividadInsumoUso } from '../../domain/entities/actividad-insumo-uso.entity';
import type { ActividadInsumoUsoRepository } from '../../domain/ports/actividad-insumo-uso-repository.port';
import { ACTIVIDAD_INSUMO_USO_REPOSITORY } from '../../domain/ports/actividad-insumo-uso-repository.port';

@Injectable()
export class CreateActividadInsumoUsoUseCase {
  constructor(
    @Inject(ACTIVIDAD_INSUMO_USO_REPOSITORY)
    private readonly actividadInsumoUsoRepository: ActividadInsumoUsoRepository,
  ) {}

  async execute(data: any): Promise<ActividadInsumoUso> {
    const nuevaActividadInsumoUso = new ActividadInsumoUso(
      null,
      data.actividadId,
      data.insumoId,
      data.cantidadUsada,
      data.costoUnitarioUso,
      data.costoTotal,
    );
    return await this.actividadInsumoUsoRepository.save(nuevaActividadInsumoUso);
  }
}
