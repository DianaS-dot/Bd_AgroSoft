import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservaRepository } from '../../domain/ports/reserva-repository.port';
import { Reserva } from '../../domain/entities/reserva.entity';
import { ReservaOrmEntity } from './reserva.orm-entity';

@Injectable()
export class ReservaTypeOrmRepository implements ReservaRepository {
  constructor(
    @InjectRepository(ReservaOrmEntity)
    private readonly repository: Repository<ReservaOrmEntity>,
  ) {}

  async save(reserva: Reserva): Promise<Reserva> {
    const ormEntity = this.repository.create({
      actividadId: reserva.actividadId,
      insumoId: reserva.insumoId,
      cantidadReservada: reserva.cantidadReservada,
    });

    const savedEntity = await this.repository.save(ormEntity);
    return new Reserva(
      savedEntity.id,
      savedEntity.actividadId,
      savedEntity.insumoId,
      savedEntity.cantidadReservada,
      savedEntity.createdAt,
      savedEntity.updatedAt,
      savedEntity.deletedAt,
    );
  }

  async findAll(): Promise<Reserva[]> {
    const entities = await this.repository.find();
    return entities.map(entity => new Reserva(
      entity.id,
      entity.actividadId,
      entity.insumoId,
      entity.cantidadReservada,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    ));
  }

  async findById(id: number): Promise<Reserva | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? new Reserva(
      entity.id,
      entity.actividadId,
      entity.insumoId,
      entity.cantidadReservada,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    ) : null;
  }

  async update(id: number, reserva: Partial<Reserva>): Promise<Reserva> {
    await this.repository.update(id, {
      cantidadReservada: reserva.cantidadReservada,
    });

    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new Error('Reserva no encontrada');
    }
    return new Reserva(
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
