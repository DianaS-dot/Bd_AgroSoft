import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActividadRepository } from '../../domain/ports/actividad.repository-port';
import { Actividad } from '../../domain/entities/actividad.entity';
import { ActividadOrmEntity } from './actividad.orm-entity';

@Injectable()
export class ActividadTypeOrmRepository implements ActividadRepository {
  constructor(
    @InjectRepository(ActividadOrmEntity)
    private readonly ormRepo: Repository<ActividadOrmEntity>,
  ) {}

  async save(actividad: Actividad): Promise<void> {
    const entity = this.ormRepo.create({
      id: actividad.id,
      nombre: actividad.nombre,
      descripcion: actividad.descripcion,
      fechaInicio: actividad.fechaInicio,
      fechaFin: actividad.fechaFin,
      estado: actividad.estado,
    });
    await this.ormRepo.save(entity);
  }

  async findById(id: string): Promise<Actividad | null> {
    const row = await this.ormRepo.findOneBy({ id });
    if (!row) return null;
    return this.toDomain(row);
  }

  async findAll(): Promise<Actividad[]> {
    const rows = await this.ormRepo.find();
    return rows.map((row) => this.toDomain(row));
  }

  async update(actividad: Actividad): Promise<void> {
    await this.ormRepo.save({
      id: actividad.id,
      nombre: actividad.nombre,
      descripcion: actividad.descripcion,
      fechaInicio: actividad.fechaInicio,
      fechaFin: actividad.fechaFin,
      estado: actividad.estado,
    });
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  private toDomain(ormEntity: ActividadOrmEntity): Actividad {
    return Actividad.create({
      id: ormEntity.id,
      nombre: ormEntity.nombre,
      descripcion: ormEntity.descripcion,
      fechaInicio: ormEntity.fechaInicio,
      fechaFin: ormEntity.fechaFin,
      estado: ormEntity.estado,
    });
  }
}
