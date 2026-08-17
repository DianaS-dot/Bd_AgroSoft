import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProveedorRepository } from '../../domain/ports/proveedor-repository.port';
import { Proveedor } from '../../domain/entities/proveedor.entity';
import { ProveedorOrmEntity } from './proveedor.orm-entity';

@Injectable()
export class ProveedorTypeOrmRepository implements ProveedorRepository {
  constructor(
    @InjectRepository(ProveedorOrmEntity)
    private readonly repository: Repository<ProveedorOrmEntity>,
  ) {}

  async save(proveedor: Proveedor): Promise<Proveedor> {
    const ormEntity = this.repository.create({
      nombre: proveedor.nombre,
    });

    const savedEntity = await this.repository.save(ormEntity);
    return new Proveedor(
      savedEntity.id,
      savedEntity.nombre,
      savedEntity.createdAt,
      savedEntity.updatedAt,
      savedEntity.deletedAt,
    );
  }

  async findAll(): Promise<Proveedor[]> {
    const entities = await this.repository.find();
    return entities.map(entity => new Proveedor(
      entity.id,
      entity.nombre,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    ));
  }

  async findById(id: number): Promise<Proveedor | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? new Proveedor(
      entity.id,
      entity.nombre,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    ) : null;
  }

  async update(id: number, proveedor: Partial<Proveedor>): Promise<Proveedor> {
    await this.repository.update(id, {
      nombre: proveedor.nombre,
    });

    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new Error('Proveedor no encontrado');
    }
    return new Proveedor(
      entity.id,
      entity.nombre,
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
