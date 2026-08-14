import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { VentaRepositoryPort } from '../../domain/ports/venta.repository.port';
import { Venta } from '../../domain/entities/venta.entity';
import { VentaOrmEntity } from './venta.orm-entity';

export class VentaTypeOrmRepository implements VentaRepositoryPort {
  constructor(
    @InjectRepository(VentaOrmEntity)
    private readonly ormRepo: Repository<VentaOrmEntity>,
  ) {}

  private toDomain(e: VentaOrmEntity): Venta {
    return new Venta(
      e.id,
      e.clienteId,
      e.fecha,
      Number(e.subtotal),
      Number(e.impuestos),
      Number(e.descuento),
      Number(e.total),
      e.estado,
      e.usuarioId,
      e.anuladaPorUsuarioId,
      e.fechaAnulacion,
      e.createdAt,
    );
  }

  async crear(venta: Venta): Promise<Venta> {
    const entity = this.ormRepo.create({
      clienteId: venta.clienteId,
      fecha: venta.fecha,
      subtotal: venta.subtotal,
      impuestos: venta.impuestos,
      descuento: venta.descuento,
      total: venta.total,
      estado: venta.estado,
      usuarioId: venta.usuarioId,
      anuladaPorUsuarioId: venta.anuladaPorUsuarioId ?? undefined,
      fechaAnulacion: venta.fechaAnulacion ?? undefined,
    });
    const saved = await this.ormRepo.save(entity);
    return this.toDomain(saved);
  }

  async actualizar(id: number, venta: Venta): Promise<Venta> {
    await this.ormRepo.update(id, {
      subtotal: venta.subtotal,
      impuestos: venta.impuestos,
      descuento: venta.descuento,
      total: venta.total,
      estado: venta.estado,
      anuladaPorUsuarioId: venta.anuladaPorUsuarioId ?? undefined,
      fechaAnulacion: venta.fechaAnulacion ?? undefined,
    });
    const actualizado = await this.ormRepo.findOneBy({ id });
    if (!actualizado) {
      throw new Error('Venta no encontrada después de actualizar');
    }
    return this.toDomain(actualizado);
  }

  async buscarPorId(id: number): Promise<Venta | null> {
    const e = await this.ormRepo.findOneBy({ id });
    return e ? this.toDomain(e) : null;
  }

  async listar(): Promise<Venta[]> {
    const list = await this.ormRepo.find({ order: { fecha: 'DESC' } });
    return list.map((e) => this.toDomain(e));
  }

  async listarPorCliente(clienteId: number): Promise<Venta[]> {
    const list = await this.ormRepo.find({ where: { clienteId }, order: { fecha: 'DESC' } });
    return list.map((e) => this.toDomain(e));
  }
}