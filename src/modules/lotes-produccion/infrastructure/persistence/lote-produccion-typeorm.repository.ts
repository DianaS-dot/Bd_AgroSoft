import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import type { LoteProduccionRepositoryPort } from '../../domain/ports/lote-produccion.repository.port';
import { LoteProduccion } from '../../domain/entities/lote-produccion.entity';
import { LoteProduccionOrmEntity } from './lote-produccion.orm-entity';

export class LoteProduccionTypeOrmRepository implements LoteProduccionRepositoryPort {
  constructor(
    @InjectRepository(LoteProduccionOrmEntity)
    private readonly ormRepo: Repository<LoteProduccionOrmEntity>,
  ) {}

  private toDomain(e: LoteProduccionOrmEntity): LoteProduccion {
    return new LoteProduccion(
      e.id,
      e.productoAgroId,
      e.cultivoId,
      e.loteId,
      e.subLoteId,
      e.actividadCosechaId,
      e.calidad,
      Number(e.cantidadKg),
      Number(e.stockDisponibleKg),
      Number(e.costoUnitarioKg),
      Number(e.costoTotal),
      e.precioSugeridoKg !== null ? Number(e.precioSugeridoKg) : null,
      e.createdAt,
    );
  }

  async crear(lote: LoteProduccion): Promise<LoteProduccion> {
    const entity = this.ormRepo.create({
      productoAgroId: lote.productoAgroId,
      cultivoId: lote.cultivoId,
      loteId: lote.loteId,
      subLoteId: lote.subLoteId ?? undefined,
      actividadCosechaId: lote.actividadCosechaId ?? undefined,
      calidad: lote.calidad ?? undefined,
      cantidadKg: lote.cantidadKg,
      stockDisponibleKg: lote.stockDisponibleKg,
      costoUnitarioKg: lote.costoUnitarioKg,
      costoTotal: lote.costoTotal,
      precioSugeridoKg: lote.precioSugeridoKg ?? undefined,
    });
    const saved = await this.ormRepo.save(entity);
    return this.toDomain(saved);
  }

  async actualizar(id: number, lote: LoteProduccion): Promise<LoteProduccion> {
    await this.ormRepo.update(id, {
      calidad: lote.calidad ?? undefined,
      stockDisponibleKg: lote.stockDisponibleKg,
      costoUnitarioKg: lote.costoUnitarioKg,
      costoTotal: lote.costoTotal,
      precioSugeridoKg: lote.precioSugeridoKg ?? undefined,
    });
    const actualizado = await this.ormRepo.findOneBy({ id });
    if (!actualizado) {
      throw new Error('Lote de producción no encontrado después de actualizar');
    }
    return this.toDomain(actualizado);
  }

  async eliminar(id: number): Promise<void> {
    await this.ormRepo.softDelete(id);
  }

  async buscarPorId(id: number): Promise<LoteProduccion | null> {
    const e = await this.ormRepo.findOneBy({ id });
    return e ? this.toDomain(e) : null;
  }

  async listar(): Promise<LoteProduccion[]> {
    const list = await this.ormRepo.find();
    return list.map((e) => this.toDomain(e));
  }

  async listarPorProductoAgro(productoAgroId: number): Promise<LoteProduccion[]> {
    const list = await this.ormRepo.findBy({ productoAgroId });
    return list.map((e) => this.toDomain(e));
  }

  async listarConStockDisponible(): Promise<LoteProduccion[]> {
    const list = await this.ormRepo.findBy({ stockDisponibleKg: MoreThan(0) });
    return list.map((e) => this.toDomain(e));
  }
}