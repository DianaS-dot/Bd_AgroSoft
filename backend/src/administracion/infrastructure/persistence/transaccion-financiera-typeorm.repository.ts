import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransaccionFinancieraRepository } from '../../domain/ports/transaccion-financiera.repository.port';
import { TransaccionFinanciera } from '../../domain/entities/transaccion-financiera.entity';
import { TransaccionFinancieraOrmEntity } from './transaccion-financiera.orm-entity';

@Injectable()
export class TransaccionFinancieraTypeOrmRepository implements TransaccionFinancieraRepository {
  constructor(
    @InjectRepository(TransaccionFinancieraOrmEntity)
    private readonly ormRepo: Repository<TransaccionFinancieraOrmEntity>,
  ) {}

  async save(transaccion: TransaccionFinanciera): Promise<TransaccionFinanciera> {
    const saved = await this.ormRepo.save({
      id: transaccion.id ?? undefined,
      tipo: transaccion.tipo,
      categoria: transaccion.categoria,
      monto: transaccion.monto,
      descripcion: transaccion.descripcion,
      fecha: transaccion.fecha,
      actividadId: transaccion.actividadId,
      insumoId: transaccion.insumoId,
      ventaId: transaccion.ventaId,
      usuarioId: transaccion.usuarioId,
    });
    return this.toDomain(saved);
  }

  async findAll(): Promise<TransaccionFinanciera[]> {
    return (await this.ormRepo.find()).map((row) => this.toDomain(row));
  }

  async findById(id: number): Promise<TransaccionFinanciera | null> {
    const row = await this.ormRepo.findOneBy({ id });
    return row ? this.toDomain(row) : null;
  }

  private toDomain(row: TransaccionFinancieraOrmEntity): TransaccionFinanciera {
    return TransaccionFinanciera.create({
      id: row.id,
      tipo: row.tipo,
      categoria: row.categoria,
      monto: row.monto,
      descripcion: row.descripcion,
      fecha: row.fecha,
      actividadId: row.actividadId,
      insumoId: row.insumoId,
      ventaId: row.ventaId,
      usuarioId: row.usuarioId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
    });
  }
}