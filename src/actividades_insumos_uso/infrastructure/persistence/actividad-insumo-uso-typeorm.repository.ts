import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActividadInsumoUsoRepository } from '../../domain/ports/actividad-insumo-uso-repository.port';
import { ActividadInsumoUso } from '../../domain/entities/actividad-insumo-uso.entity';
import { ActividadInsumoUsoOrmEntity } from './actividad-insumo-uso.orm-entity';

@Injectable()
export class ActividadInsumoUsoTypeOrmRepository implements ActividadInsumoUsoRepository {
  constructor(
    @InjectRepository(ActividadInsumoUsoOrmEntity)
    private readonly repository: Repository<ActividadInsumoUsoOrmEntity>,
  ) {}

  async save(actividadInsumoUso: ActividadInsumoUso): Promise<ActividadInsumoUso> {
    const ormEntity = this.repository.create({
      actividadId: actividadInsumoUso.actividadId,
      insumoId: actividadInsumoUso.insumoId,
      cantidadUsada: actividadInsumoUso.cantidadUsada,
      costoUnitarioUso: actividadInsumoUso.costoUnitarioUso,
      costoTotal: actividadInsumoUso.costoTotal,
    });

    const savedEntity = await this.repository.save(ormEntity);
    return new ActividadInsumoUso(
      savedEntity.id,
      savedEntity.actividadId,
      savedEntity.insumoId,
      savedEntity.cantidadUsada,
      savedEntity.costoUnitarioUso,
      savedEntity.costoTotal,
      savedEntity.createdAt,
      savedEntity.updatedAt,
      savedEntity.deletedAt,
    );
  }

  async findAll(): Promise<ActividadInsumoUso[]> {
    const entities = await this.repository.find();
    return entities.map(entity => new ActividadInsumoUso(
      entity.id,
      entity.actividadId,
      entity.insumoId,
      entity.cantidadUsada,
      entity.costoUnitarioUso,
      entity.costoTotal,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    ));
  }

  async findById(id: number): Promise<ActividadInsumoUso | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? new ActividadInsumoUso(
      entity.id,
      entity.actividadId,
      entity.insumoId,
      entity.cantidadUsada,
      entity.costoUnitarioUso,
      entity.costoTotal,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    ) : null;
  }

  async update(id: number, actividadInsumoUso: Partial<ActividadInsumoUso>): Promise<ActividadInsumoUso> {
    await this.repository.update(id, {
      cantidadUsada: actividadInsumoUso.cantidadUsada,
      costoUnitarioUso: actividadInsumoUso.costoUnitarioUso,
      costoTotal: actividadInsumoUso.costoTotal,
    });

    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new Error('ActividadInsumoUso no encontrado');
    }
    return new ActividadInsumoUso(
      entity.id,
      entity.actividadId,
      entity.insumoId,
      entity.cantidadUsada,
      entity.costoUnitarioUso,
      entity.costoTotal,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
