import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EpaRepository } from '../../domain/ports/epa.repository.port';
import { Epa } from '../../domain/entities/epa.entity';
import { EpaOrmEntity } from './epa.orm-entity';

@Injectable()
export class EpaTypeOrmRepository implements EpaRepository {
  constructor(
    @InjectRepository(EpaOrmEntity)
    private readonly ormRepo: Repository<EpaOrmEntity>,
  ) {}

  async save(epa: Epa): Promise<Epa> {
    const saved = await this.ormRepo.save({
      id: epa.id ?? undefined,
      nombre: epa.nombre,
      tipoEpa: epa.tipoEpa,
      descripcion: epa.descripcion,
      sintomas: epa.sintomas,
      manejoYControl: epa.manejoYControl,
      mesesProbables: epa.mesesProbables,
      temporadas: epa.temporadas,
      notasEstacionalidad: epa.notasEstacionalidad,
      fotosSintomas: epa.fotosSintomas,
      fotosGenerales: epa.fotosGenerales,
      tags: epa.tags,
      creadoPorUsuarioId: epa.creadoPorUsuarioId,
    });
    return this.toDomain(saved);
  }

  async findAll(): Promise<Epa[]> {
    return (await this.ormRepo.find()).map((row) => this.toDomain(row));
  }

  async findById(id: number): Promise<Epa | null> {
    const row = await this.ormRepo.findOneBy({ id });
    return row ? this.toDomain(row) : null;
  }

  async update(id: number, epaData: Partial<Epa>): Promise<Epa> {
    await this.ormRepo.update(id, epaData as any);
    const updated = await this.findById(id);
    if (!updated) {
      throw new NotFoundException(`EPA con ID ${id} no encontrado`);
    }
    return updated;
  }

  async softDelete(id: number): Promise<void> {
    await this.ormRepo.softDelete(id);
  }

  private toDomain(row: EpaOrmEntity): Epa {
    return Epa.create({
      id: row.id,
      nombre: row.nombre,
      tipoEpa: row.tipoEpa,
      descripcion: row.descripcion,
      sintomas: row.sintomas,
      manejoYControl: row.manejoYControl,
      mesesProbables: row.mesesProbables,
      temporadas: row.temporadas,
      notasEstacionalidad: row.notasEstacionalidad,
      fotosSintomas: row.fotosSintomas,
      fotosGenerales: row.fotosGenerales,
      tags: row.tags,
      creadoPorUsuarioId: row.creadoPorUsuarioId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
    });
  }
}