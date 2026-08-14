import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import type { VentaDetalleRepositoryPort } from '../../domain/ports/venta-detalle.repository.port';
import { VentaDetalle } from '../../domain/entities/venta-detalle.entity';
import { VentaDetalleOrmEntity } from './venta-detalle.orm-entity';

export class VentaDetalleTypeOrmRepository implements VentaDetalleRepositoryPort {
  constructor(
    @InjectRepository(VentaDetalleOrmEntity)
    private readonly ormRepo: Repository<VentaDetalleOrmEntity>,
  ) {}

  private toDomain(e: VentaDetalleOrmEntity): VentaDetalle {
    return new VentaDetalle(
      e.id,
      e.ventaId,
      e.productoAgroId,
      e.loteProduccionId,
      e.cultivoId,
      Number(e.cantidadKg),
      Number(e.precioUnitarioKg),
      Number(e.precioTotal),
      Number(e.costoUnitarioKg),
      Number(e.costoTotal),
      e.createdAt,
    );
  }

  private repoDe(manager?: unknown): Repository<VentaDetalleOrmEntity> {
    if (manager instanceof EntityManager) {
      return manager.getRepository(VentaDetalleOrmEntity);
    }
    return this.ormRepo;
  }

  async crear(detalle: VentaDetalle, manager?: unknown): Promise<VentaDetalle> {
    const repo = this.repoDe(manager);
    const entity = repo.create({
      ventaId: detalle.ventaId,
      productoAgroId: detalle.productoAgroId,
      loteProduccionId: detalle.loteProduccionId,
      cultivoId: detalle.cultivoId,
      cantidadKg: detalle.cantidadKg,
      precioUnitarioKg: detalle.precioUnitarioKg,
      precioTotal: detalle.precioTotal,
      costoUnitarioKg: detalle.costoUnitarioKg,
      costoTotal: detalle.costoTotal,
    });
    const saved = await repo.save(entity);
    return this.toDomain(saved);
  }

  async eliminar(id: number, manager?: unknown): Promise<void> {
    const repo = this.repoDe(manager);
    await repo.delete(id);
  }

  async buscarPorId(id: number): Promise<VentaDetalle | null> {
    const e = await this.ormRepo.findOneBy({ id });
    return e ? this.toDomain(e) : null;
  }

  async listarPorVenta(ventaId: number): Promise<VentaDetalle[]> {
    const list = await this.ormRepo.findBy({ ventaId });
    return list.map((e) => this.toDomain(e));
  }
}