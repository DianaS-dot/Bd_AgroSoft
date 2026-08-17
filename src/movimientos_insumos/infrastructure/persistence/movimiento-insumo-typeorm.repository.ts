import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovimientoInsumoRepository } from '../../domain/ports/movimiento-insumo-repository.port';
import { MovimientoInsumo } from '../../domain/entities/movimiento-insumo.entity';
import { MovimientoInsumoOrmEntity } from './movimiento-insumo.orm-entity';

@Injectable()
export class MovimientoInsumoTypeOrmRepository implements MovimientoInsumoRepository {
  constructor(
    @InjectRepository(MovimientoInsumoOrmEntity)
    private readonly repository: Repository<MovimientoInsumoOrmEntity>,
  ) {}

  private toDomain(entity: MovimientoInsumoOrmEntity): MovimientoInsumo {
    return new MovimientoInsumo(
      entity.id,
      entity.insumoId,
      entity.tipo,
      entity.cantidadPresentacion,
      entity.cantidadUso,
      entity.costoUnitarioPresentacion,
      entity.costoUnitarioUso,
      entity.costoTotal,
      entity.valorInventarioResultante,
      entity.descripcion,
      entity.actividadId,
      entity.usuarioId,
      entity.almacenOrigenId,
      entity.almacenDestinoId,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }

  async save(movimiento: MovimientoInsumo): Promise<MovimientoInsumo> {
    const ormEntity = new MovimientoInsumoOrmEntity();
    ormEntity.insumoId = movimiento.insumoId;
    ormEntity.tipo = movimiento.tipo;
    ormEntity.cantidadPresentacion = movimiento.cantidadPresentacion;
    ormEntity.cantidadUso = movimiento.cantidadUso;
    ormEntity.costoUnitarioPresentacion = movimiento.costoUnitarioPresentacion;
    ormEntity.costoUnitarioUso = movimiento.costoUnitarioUso;
    ormEntity.costoTotal = movimiento.costoTotal;
    ormEntity.valorInventarioResultante = movimiento.valorInventarioResultante;
    ormEntity.descripcion = movimiento.descripcion;
    ormEntity.actividadId = movimiento.actividadId;
    ormEntity.usuarioId = movimiento.usuarioId;
    ormEntity.almacenOrigenId = movimiento.almacenOrigenId;
    ormEntity.almacenDestinoId = movimiento.almacenDestinoId;

    const savedEntity = await this.repository.save(ormEntity);
    return this.toDomain(savedEntity);
  }

  async findAll(): Promise<MovimientoInsumo[]> {
    const entities = await this.repository.find();
    return entities.map(entity => this.toDomain(entity));
  }

  async findById(id: number): Promise<MovimientoInsumo | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? this.toDomain(entity) : null;
  }

  async update(id: number, movimiento: Partial<MovimientoInsumo>): Promise<MovimientoInsumo> {
    await this.repository.update(id, {
      tipo: movimiento.tipo,
      cantidadPresentacion: movimiento.cantidadPresentacion,
      cantidadUso: movimiento.cantidadUso,
      costoUnitarioPresentacion: movimiento.costoUnitarioPresentacion,
      costoUnitarioUso: movimiento.costoUnitarioUso,
      costoTotal: movimiento.costoTotal,
      valorInventarioResultante: movimiento.valorInventarioResultante,
      descripcion: movimiento.descripcion,
    });

    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new Error('MovimientoInsumo no encontrado');
    }
    return this.toDomain(entity);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
