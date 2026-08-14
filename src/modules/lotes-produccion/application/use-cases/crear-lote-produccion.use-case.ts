import { Inject, Injectable } from '@nestjs/common';
import { LoteProduccion } from '../../domain/entities/lote-produccion.entity';
import { LOTE_PRODUCCION_REPOSITORY } from '../../domain/ports/lote-produccion.repository.port';
import type { LoteProduccionRepositoryPort } from '../../domain/ports/lote-produccion.repository.port';
import { CrearLoteProduccionDto } from '../../infrastructure/http/dto/crear-lote-produccion.dto';

@Injectable()
export class CrearLoteProduccionUseCase {
  constructor(
    @Inject(LOTE_PRODUCCION_REPOSITORY)
    private readonly repo: LoteProduccionRepositoryPort,
  ) {}

  async ejecutar(dto: CrearLoteProduccionDto): Promise<LoteProduccion> {
    // Al crearse, todo el stock producido queda disponible por defecto
    const lote = new LoteProduccion(
      null,
      dto.productoAgroId,
      dto.cultivoId,
      dto.loteId,
      dto.subLoteId ?? null,
      dto.actividadCosechaId ?? null,
      dto.calidad ?? null,
      dto.cantidadKg,
      dto.cantidadKg, // stockDisponibleKg = cantidadKg al crear
      dto.costoUnitarioKg,
      dto.costoTotal,
      dto.precioSugeridoKg ?? null,
    );
    return this.repo.crear(lote);
  }
}