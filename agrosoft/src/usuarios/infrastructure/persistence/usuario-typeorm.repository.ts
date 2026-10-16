import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../domain/entities/usuario.entity';
import { type UsuarioRepository } from '../../domain/ports/usuario-repository.port';
import { UsuarioOrmEntity } from './usuario.orm-entity';

@Injectable()
export class UsuarioTypeOrmRepository implements UsuarioRepository {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly repository: Repository<UsuarioOrmEntity>,
  ) {}

  async save(usuario: Usuario): Promise<Usuario> {
    // Mapear de Dominio a ORM. Se incluye el id cuando existe para
    // distinguir INSERT (nuevo) de UPDATE (entidad ya persistida).
    const ormEntity = this.repository.create({
      ...(usuario.id != null && { id: usuario.id }),
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
    });

    const savedEntity = await this.repository.save(ormEntity);

    // Mapear de ORM a Dominio.
    return this.toDomain(savedEntity);
  }

  async findById(id: number): Promise<Usuario | null> {
    const entity = await this.repository.findOneBy({ id });

    return entity ? this.toDomain(entity) : null;
  }

  async findByCorreo(correo: string): Promise<Usuario | null> {
    const entity = await this.repository.findOneBy({ correo });

    return entity ? this.toDomain(entity) : null;
  }

  async existsByIdentificacion(identificacion: string): Promise<boolean> {
    return this.repository.exists({ where: { identificacion } });
  }

  async findAll(): Promise<Usuario[]> {
    const entities = await this.repository.find();

    return entities.map((entity) => this.toDomain(entity));
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
      entity.estado as Usuario['estado'],
      entity.lastLoginAt,
      entity.avatarUrl,
      entity.rolId,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }
}
