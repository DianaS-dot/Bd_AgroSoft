import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from '../../domain/entities/usuario.entity.js';
import { UsuarioRepository } from '../../domain/ports/usuario-repository.port.js';
import { UsuarioOrmEntity } from './usuario.orm-entity.js';

@Injectable()
export class UsuarioRepositoryImpl implements UsuarioRepository {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly repository: Repository<UsuarioOrmEntity>,
  ) {}

  async save(usuario: Usuario): Promise<Usuario> {
    const entityData: Partial<UsuarioOrmEntity> = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      identificacion: usuario.identificacion,
      idFicha: usuario.idFicha,
      programaFormacionId: usuario.programaFormacionId,
      telefono: usuario.telefono,
      correo: usuario.correo,
      passwordHash: usuario.passwordHash,
      emailVerifiedAt: usuario.emailVerifiedAt,
      estado: usuario.estado,
      lastLoginAt: usuario.lastLoginAt,
      avatarUrl: usuario.avatarUrl,
      rolId: usuario.rolId,
    };

    // Si el usuario ya existe, conservar su ID
    if (usuario.id !== null) {
      entityData.id = usuario.id;
    }

    const entity = this.repository.create(entityData);

    const saved = await this.repository.save(entity);

    return this.toDomain(saved);
  }

  async findById(id: number): Promise<Usuario | null> {
    const entity = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!entity) {
      return null;
    }

    return this.toDomain(entity);
  }

  async findByCorreo(correo: string): Promise<Usuario | null> {
    const entity = await this.repository.findOne({
      where: {
        correo: correo.trim(),
      },
    });

    if (!entity) {
      return null;
    }

    return this.toDomain(entity);
  }

  async existsByIdentificacion(
    identificacion: string,
  ): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        identificacion,
      },
    });

    return count > 0;
  }

  private toDomain(entity: UsuarioOrmEntity): Usuario {
    return new Usuario(
      entity.id,
      entity.nombre,
      entity.apellido,
      entity.identificacion,
      entity.idFicha,
      entity.programaFormacionId,
      entity.telefono,
      entity.correo,
      entity.passwordHash,
      entity.emailVerifiedAt,
      entity.estado as any,
      entity.lastLoginAt,
      entity.avatarUrl,
      entity.rolId,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }
}