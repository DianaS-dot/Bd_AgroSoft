import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { PagoRepositoryPort } from '../../domain/ports/pago.repository.port';
import { Pago } from '../../domain/entities/pago.entity';
import { PagoOrmEntity } from './pago.orm-entity';

export class PagoTypeOrmRepository implements PagoRepositoryPort {
  constructor(
    @InjectRepository(PagoOrmEntity)
    private readonly ormRepo: Repository<PagoOrmEntity>,
  ) {}

  private toDomain(e: PagoOrmEntity): Pago {
    return new Pago(e.id, e.ventaId, e.metodo, Number(e.monto), e.moneda, e.referencia, e.createdAt);
  }

  async crear(pago: Pago): Promise<Pago> {
    const entity = this.ormRepo.create({
      ventaId: pago.ventaId,
      metodo: pago.metodo,
      monto: pago.monto,
      moneda: pago.moneda,
      referencia: pago.referencia ?? undefined,
    });
    const saved = await this.ormRepo.save(entity);
    return this.toDomain(saved);
  }

  async eliminar(id: number): Promise<void> {
    await this.ormRepo.delete(id);
  }

  async buscarPorId(id: number): Promise<Pago | null> {
    const e = await this.ormRepo.findOneBy({ id });
    return e ? this.toDomain(e) : null;
  }

  async listarPorVenta(ventaId: number): Promise<Pago[]> {
    const list = await this.ormRepo.findBy({ ventaId });
    return list.map((e) => this.toDomain(e));
  }

  async sumarPagosPorVenta(ventaId: number): Promise<number> {
  const resultado = await this.ormRepo
    .createQueryBuilder('pago')
    .select('COALESCE(SUM(pago.monto), 0)', 'suma')
    .where('pago.venta_id = :ventaId', { ventaId })
    .getRawOne<{ suma: string }>();

  return Number(resultado?.suma ?? 0);
    }
}