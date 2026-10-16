import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permiso } from '../../domain/entities/permiso.entity';
import { type PermisoRepository } from '../../domain/ports/permiso-repository.port';
import { PermisoOrmEntity } from './permiso.orm-entity';

@Injectable()
export class PermisoTypeOrmRepository implements PermisoRepository {
  constructor(
    @InjectRepository(PermisoOrmEntity)
    private readonly repository: Repository<PermisoOrmEntity>,
  ) {}

  async save(permiso: Permiso): Promise<Permiso> {
    const ormEntity = this.repository.create({
      ...(permiso.id != null && { id: permiso.id }),
      nombre: permiso.nombre,
      descripcion: permiso.descripcion,
      estado: permiso.estado,
    });

    const savedEntity = await this.repository.save(ormEntity);

    return this.toDomain(savedEntity);
  }

  async findById(id: number): Promise<Permiso | null> {
    const entity = await this.repository.findOneBy({ id });

    return entity ? this.toDomain(entity) : null;
  }

  async findByNombre(nombre: string): Promise<Permiso | null> {
    const entity = await this.repository.findOneBy({ nombre });

    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<Permiso[]> {
    const entities = await this.repository.find();

    return entities.map((entity) => this.toDomain(entity));
  }

  private toDomain(entity: PermisoOrmEntity): Permiso {
    return new Permiso(
      entity.id,
      entity.nombre,
      entity.descripcion,
      entity.estado as Permiso['estado'],
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }
}
