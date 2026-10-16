
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from '../../domain/entities/usuario';
import { UsuarioRepositoryPort } from '../../domain/ports/usuario-repository.port';
import { UsuarioOrmEntity } from './usuario.orm-entity';

@Injectable()
export class UsuarioTypeOrmRepository
  implements UsuarioRepositoryPort
{
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly repository: Repository<UsuarioOrmEntity>,
  ) {}

  async guardar(usuario: Usuario): Promise<Usuario> {
    const datos = this.repository.create({
      id: usuario.props.id,
      nombre: usuario.props.nombre,
      apellido: usuario.props.apellido,
      identificacion: usuario.props.identificacion,
      idFicha: usuario.props.idFicha,
      programaFormacionId: usuario.props.programaFormacionId,
      telefono: usuario.props.telefono,
      correo: usuario.props.correo,
      passwordHash: usuario.props.passwordHash,
      emailVerifiedAt: usuario.props.emailVerifiedAt,
      estado: usuario.props.estado,
      lastLoginAt: usuario.props.lastLoginAt,
      avatarUrl: usuario.props.avatarUrl,
      rolId: usuario.props.rolId,
    });

    const guardado = await this.repository.save(datos);

    return this.toDomain(guardado);
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    const usuario = await this.repository.findOne({
      where: { id },
    });

    return usuario ? this.toDomain(usuario) : null;
  }

  async buscarPorCorreo(correo: string): Promise<Usuario | null> {
    const usuario = await this.repository.findOne({
      where: { correo },
    });

    return usuario ? this.toDomain(usuario) : null;
  }

  async buscarPorIdentificacion(
    identificacion: string,
  ): Promise<Usuario | null> {
    const usuario = await this.repository.findOne({
      where: { identificacion },
    });

    return usuario ? this.toDomain(usuario) : null;
  }

  async listar(): Promise<Usuario[]> {
    const usuarios = await this.repository.find();

    return usuarios.map((usuario) => this.toDomain(usuario));
  }

  async eliminar(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  private toDomain(usuario: UsuarioOrmEntity): Usuario {
    return new Usuario({
      id: usuario.id,
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
      createdAt: usuario.created_at,
      updatedAt: usuario.updated_at,
      deletedAt: usuario.deleted_at,
    });
  }
}
