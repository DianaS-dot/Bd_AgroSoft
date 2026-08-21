import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioPermiso } from '../../domain/entities/usuario_permiso.entity';
import { type UsuarioPermisoRepository } from '../../domain/ports/usuario_permiso-repository.port';
import { UsuarioPermisoOrmEntity } from './usuario_permiso.orm-entity';

@Injectable()
export class UsuarioPermisoTypeOrmRepository implements UsuarioPermisoRepository {
  constructor(
    @InjectRepository(UsuarioPermisoOrmEntity)
    private readonly repository: Repository<UsuarioPermisoOrmEntity>,
  ) {}

  async save(usuarioPermiso: UsuarioPermiso): Promise<UsuarioPermiso> {
    const ormEntity = this.repository.create({
      ...(usuarioPermiso.id != null && { id: usuarioPermiso.id }),
      usuarioId: usuarioPermiso.usuarioId,
      permisoId: usuarioPermiso.permisoId,
      estado: usuarioPermiso.estado,
    });

    const savedEntity = await this.repository.save(ormEntity);

    return this.toDomain(savedEntity);
  }

  async findById(id: number): Promise<UsuarioPermiso | null> {
    const entity = await this.repository.findOneBy({ id });

    return entity ? this.toDomain(entity) : null;
  }

  async findByUsuarioIdAndPermisoId(
    usuarioId: number,
    permisoId: number,
  ): Promise<UsuarioPermiso | null> {
    const entity = await this.repository.findOneBy({ usuarioId, permisoId });

    return entity ? this.toDomain(entity) : null;
  }

  async findByUsuarioId(usuarioId: number): Promise<UsuarioPermiso[]> {
    const entities = await this.repository.findBy({ usuarioId });

    return entities.map((entity) => this.toDomain(entity));
  }

  private toDomain(entity: UsuarioPermisoOrmEntity): UsuarioPermiso {
    return new UsuarioPermiso(
      entity.id,
      entity.usuarioId,
      entity.permisoId,
      entity.estado as UsuarioPermiso['estado'],
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }
}
