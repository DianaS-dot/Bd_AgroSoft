import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramaFormacionRepository } from '../../domain/ports/programa-formacion.repository.port';
import { ProgramaFormacion } from '../../domain/entities/programa-formacion.entity';
import { ProgramaFormacionOrmEntity } from './programa-formacion.orm-entity';

@Injectable()
export class ProgramaFormacionTypeOrmRepository implements ProgramaFormacionRepository {
  constructor(
    @InjectRepository(ProgramaFormacionOrmEntity)
    private readonly ormRepo: Repository<ProgramaFormacionOrmEntity>,
  ) {}

  async save(programa: ProgramaFormacion): Promise<ProgramaFormacion> {
    const saved = await this.ormRepo.save({
      id: programa.id ?? undefined,
      numeroFicha: programa.numeroFicha,
      nombre: programa.nombre,
      tipo: programa.tipo,
      descripcion: programa.descripcion,
      fechaInicio: programa.fechaInicio.toISOString().slice(0, 10),
      fechaFin: programa.fechaFin.toISOString().slice(0, 10),
      estado: programa.estado,
      cantidadAprendices: programa.cantidadAprendices,
    });
    return this.toDomain(saved);
  }

  async findAll(): Promise<ProgramaFormacion[]> {
    return (await this.ormRepo.find()).map((row) => this.toDomain(row));
  }

  async findById(id: number): Promise<ProgramaFormacion | null> {
    const row = await this.ormRepo.findOneBy({ id });
    return row ? this.toDomain(row) : null;
  }

  private toDomain(row: ProgramaFormacionOrmEntity): ProgramaFormacion {
    return ProgramaFormacion.create({
      id: row.id,
      numeroFicha: row.numeroFicha,
      nombre: row.nombre,
      tipo: row.tipo,
      descripcion: row.descripcion,
      fechaInicio: new Date(row.fechaInicio),
      fechaFin: new Date(row.fechaFin),
      estado: row.estado,
      cantidadAprendices: row.cantidadAprendices,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
    });
  }
}