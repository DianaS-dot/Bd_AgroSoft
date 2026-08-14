import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import type { MovimientoProduccionRepositoryPort } from '../../domain/ports/movimiento-produccion.repository.port';
import { MovimientoProduccion } from '../../domain/entities/movimiento-produccion.entity';
import { MovimientoProduccionOrmEntity } from './movimiento-produccion.orm-entity';

export class MovimientoProduccionTypeOrmRepository implements MovimientoProduccionRepositoryPort {
  constructor(
    @InjectRepository(MovimientoProduccionOrmEntity)
    private readonly ormRepo: Repository<MovimientoProduccionOrmEntity>,
  ) {}

  private toDomain(e: MovimientoProduccionOrmEntity): MovimientoProduccion {
    return new MovimientoProduccion(
      e.id,
      e.loteProduccionId,
      e.tipo,
      Number(e.cantidadKg),
      Number(e.costoUnitarioKg),
      Number(e.costoTotal),
      e.ventaId,
      e.descripcion,
      e.usuarioId,
      e.fecha,
      e.createdAt,
    );
  }

  private repoDe(manager?: unknown): Repository<MovimientoProduccionOrmEntity> {
    if (manager instanceof EntityManager) {
      return manager.getRepository(MovimientoProduccionOrmEntity);
    }
    return this.ormRepo;
  }

  async crear(movimiento: MovimientoProduccion, manager?: unknown): Promise<MovimientoProduccion> {
    const repo = this.repoDe(manager);
    const entity = repo.create({
      loteProduccionId: movimiento.loteProduccionId,
      tipo: movimiento.tipo,
      cantidadKg: movimiento.cantidadKg,
      costoUnitarioKg: movimiento.costoUnitarioKg,
      costoTotal: movimiento.costoTotal,
      ventaId: movimiento.ventaId ?? undefined,
      descripcion: movimiento.descripcion ?? undefined,
      usuarioId: movimiento.usuarioId,
      fecha: movimiento.fecha,
    });
    const saved = await repo.save(entity);
    return this.toDomain(saved);
  }

  async buscarPorId(id: number): Promise<MovimientoProduccion | null> {
    const e = await this.ormRepo.findOneBy({ id });
    return e ? this.toDomain(e) : null;
  }

  async listarPorLote(loteProduccionId: number): Promise<MovimientoProduccion[]> {
    const list = await this.ormRepo.find({ where: { loteProduccionId }, order: { fecha: 'DESC' } });
    return list.map((e) => this.toDomain(e));
  }

  async listarPorVenta(ventaId: number): Promise<MovimientoProduccion[]> {
    const list = await this.ormRepo.find({ where: { ventaId }, order: { fecha: 'DESC' } });
    return list.map((e) => this.toDomain(e));
  }

  async listar(): Promise<MovimientoProduccion[]> {
    const list = await this.ormRepo.find({ order: { fecha: 'DESC' } });
    return list.map((e) => this.toDomain(e));
  }
}