import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActividadInsumoReservaRepository } from '../../domain/ports/actividad-insumo-reserva-repository.port';
import { ActividadInsumoReserva } from '../../domain/entities/actividad-insumo-reserva.entity';
import { ActividadInsumoReservaOrmEntity } from './actividad-insumo-reserva.orm-entity';

@Injectable()
export class ActividadInsumoReservaTypeOrmRepository implements ActividadInsumoReservaRepository {
  constructor(
    @InjectRepository(ActividadInsumoReservaOrmEntity)
    private readonly repository: Repository<ActividadInsumoReservaOrmEntity>,
  ) {}

  async save(actividadInsumoReserva: ActividadInsumoReserva): Promise<ActividadInsumoReserva> {
    const ormEntity = this.repository.create({
      actividadId: actividadInsumoReserva.actividadId,
      insumoId: actividadInsumoReserva.insumoId,
      cantidadReservada: actividadInsumoReserva.cantidadReservada,
    });

    const savedEntity = await this.repository.save(ormEntity);
    return new ActividadInsumoReserva(
      savedEntity.id,
      savedEntity.actividadId,
      savedEntity.insumoId,
      savedEntity.cantidadReservada,
      savedEntity.createdAt,
      savedEntity.updatedAt,
      savedEntity.deletedAt,
    );
  }

  async findAll(): Promise<ActividadInsumoReserva[]> {
    const entities = await this.repository.find();
    return entities.map(entity => new ActividadInsumoReserva(
      entity.id,
      entity.actividadId,
      entity.insumoId,
      entity.cantidadReservada,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    ));
  }

  async findById(id: number): Promise<ActividadInsumoReserva | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? new ActividadInsumoReserva(
      entity.id,
      entity.actividadId,
      entity.insumoId,
      entity.cantidadReservada,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    ) : null;
  }

  async update(id: number, actividadInsumoReserva: Partial<ActividadInsumoReserva>): Promise<ActividadInsumoReserva> {
    await this.repository.update(id, {
      cantidadReservada: actividadInsumoReserva.cantidadReservada,
    });

    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new Error('ActividadInsumoReserva no encontrado');
    }
    return new ActividadInsumoReserva(
      entity.id,
      entity.actividadId,
      entity.insumoId,
      entity.cantidadReservada,
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
