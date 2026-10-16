import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../../domain/entities/rol.entity';
import { type RolRepository } from '../../domain/ports/rol-repository.port';
import { RolOrmEntity } from './rol.orm-entity';

@Injectable()
export class RolTypeOrmRepository implements RolRepository {
  constructor(
    @InjectRepository(RolOrmEntity)
    private readonly repository: Repository<RolOrmEntity>,
  ) {}

  async save(rol: Rol): Promise<Rol> {
    const ormEntity = this.repository.create({
      ...(rol.id != null && { id: rol.id }),
      nombre: rol.nombre,
      descripcion: rol.descripcion,
      estado: rol.estado,
    });

    const savedEntity = await this.repository.save(ormEntity);

    return this.toDomain(savedEntity);
  }

  async findById(id: number): Promise<Rol | null> {
    const entity = await this.repository.findOneBy({ id });

    return entity ? this.toDomain(entity) : null;
  }

  async findByNombre(nombre: string): Promise<Rol | null> {
    const entity = await this.repository.findOneBy({ nombre });

    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<Rol[]> {
    const entities = await this.repository.find();

    return entities.map((entity) => this.toDomain(entity));
  }

  private toDomain(entity: RolOrmEntity): Rol {
    return new Rol(
      entity.id,
      entity.nombre,
      entity.descripcion,
      entity.estado as Rol['estado'],
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }
}
