import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlmacenRepository } from '../../domain/ports/almacen-repository.port';
import { Almacen } from '../../domain/entities/almacen.entity';
import { AlmacenOrmEntity } from './almacen.orm-entity';

@Injectable()
export class AlmacenTypeOrmRepository implements AlmacenRepository {
  constructor(
    @InjectRepository(AlmacenOrmEntity)
    private readonly repository: Repository<AlmacenOrmEntity>,
  ) {}

  async save(almacen: Almacen): Promise<Almacen> {
    const ormEntity = this.repository.create({
      nombre: almacen.nombre,
      descripcion: almacen.descripcion,
      ubicacion: almacen.ubicacion,
    });

    const savedEntity = await this.repository.save(ormEntity);
    return new Almacen(
      savedEntity.id,
      savedEntity.nombre,
      savedEntity.descripcion,
      savedEntity.ubicacion,
      savedEntity.createdAt,
      savedEntity.updatedAt,
      savedEntity.deletedAt,
    );
  }

  async findAll(): Promise<Almacen[]> {
    const entities = await this.repository.find();
    return entities.map(entity => new Almacen(
      entity.id,
      entity.nombre,
      entity.descripcion,
      entity.ubicacion,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    ));
  }

  async findById(id: number): Promise<Almacen | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? new Almacen(
      entity.id,
      entity.nombre,
      entity.descripcion,
      entity.ubicacion,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    ) : null;
  }

  async update(id: number, almacen: Partial<Almacen>): Promise<Almacen> {
    await this.repository.update(id, {
      nombre: almacen.nombre,
      descripcion: almacen.descripcion,
      ubicacion: almacen.ubicacion,
    });

    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new Error('Almacen no encontrado');
    }
    return new Almacen(
      entity.id,
      entity.nombre,
      entity.descripcion,
      entity.ubicacion,
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
