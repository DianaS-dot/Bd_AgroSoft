import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoFormacionRepository } from '../../domain/ports/tipo-formacion.repository.port';
import { TipoFormacion } from '../../domain/entities/tipo-formacion.entity';
import { TipoFormacionOrmEntity } from './tipo-formacion.orm-entity';

@Injectable()
export class TipoFormacionTypeOrmRepository implements TipoFormacionRepository {
  constructor(
    @InjectRepository(TipoFormacionOrmEntity)
    private readonly ormRepo: Repository<TipoFormacionOrmEntity>,
  ) {}

  async save(tipoFormacion: TipoFormacion): Promise<TipoFormacion> {
    const saved = await this.ormRepo.save({
      id: tipoFormacion.id ?? undefined,
      codigo: tipoFormacion.codigo,
      nombre: tipoFormacion.nombre,
      descripcion: tipoFormacion.descripcion,
      activo: tipoFormacion.activo,
      orden: tipoFormacion.orden,
    });
    return this.toDomain(saved);
  }

  async findAll(): Promise<TipoFormacion[]> {
    return (await this.ormRepo.find()).map((row) => this.toDomain(row));
  }

  async findById(id: number): Promise<TipoFormacion | null> {
    const row = await this.ormRepo.findOneBy({ id });
    return row ? this.toDomain(row) : null;
  }

  private toDomain(row: TipoFormacionOrmEntity): TipoFormacion {
    return TipoFormacion.create({
      id: row.id,
      codigo: row.codigo,
      nombre: row.nombre,
      descripcion: row.descripcion,
      activo: row.activo,
      orden: row.orden,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
    });
  }
}