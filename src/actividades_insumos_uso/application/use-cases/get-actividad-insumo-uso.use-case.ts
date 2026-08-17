import { Injectable, Inject } from '@nestjs/common';
import { ActividadInsumoUso } from '../../domain/entities/actividad-insumo-uso.entity';
import type { ActividadInsumoUsoRepository } from '../../domain/ports/actividad-insumo-uso-repository.port';
import { ACTIVIDAD_INSUMO_USO_REPOSITORY } from '../../domain/ports/actividad-insumo-uso-repository.port';

@Injectable()
export class GetActividadInsumoUsoUseCase {
  constructor(
    @Inject(ACTIVIDAD_INSUMO_USO_REPOSITORY)
    private readonly actividadInsumoUsoRepository: ActividadInsumoUsoRepository,
  ) {}

  async execute(id: number): Promise<ActividadInsumoUso | null> {
    return await this.actividadInsumoUsoRepository.findById(id);
  }

  async executeAll(): Promise<ActividadInsumoUso[]> {
    return await this.actividadInsumoUsoRepository.findAll();
  }
}
