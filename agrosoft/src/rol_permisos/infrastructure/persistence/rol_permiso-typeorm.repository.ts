import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolPermiso } from '../../domain/entities/rol_permiso.entity';
import { type RolPermisoRepository } from '../../domain/ports/rol_permiso-repository.port';
import { RolPermisoOrmEntity } from './rol_permiso.orm-entity';

@Injectable()
export class RolPermisoTypeOrmRepository implements RolPermisoRepository {
  constructor(
    @InjectRepository(RolPermisoOrmEntity)
    private readonly repository: Repository<RolPermisoOrmEntity>,
  ) {}

  async save(rolPermiso: RolPermiso): Promise<RolPermiso> {
    const ormEntity = this.repository.create({
      ...(rolPermiso.id != null && { id: rolPermiso.id }),
      rolId: rolPermiso.rolId,
      permisoId: rolPermiso.permisoId,
      estado: rolPermiso.estado,
    });

    const savedEntity = await this.repository.save(ormEntity);

    return this.toDomain(savedEntity);
  }

  async findById(id: number): Promise<RolPermiso | null> {
    const entity = await this.repository.findOneBy({ id });

    return entity ? this.toDomain(entity) : null;
  }

  async findByRolIdAndPermisoId(
    rolId: number,
    permisoId: number,
  ): Promise<RolPermiso | null> {
    const entity = await this.repository.findOneBy({ rolId, permisoId });

    return entity ? this.toDomain(entity) : null;
  }

  async findByRolId(rolId: number): Promise<RolPermiso[]> {
    const entities = await this.repository.findBy({ rolId });

    return entities.map((entity) => this.toDomain(entity));
  }

  private toDomain(entity: RolPermisoOrmEntity): RolPermiso {
    return new RolPermiso(
      entity.id,
      entity.rolId,
      entity.permisoId,
      entity.estado as RolPermiso['estado'],
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }
}
