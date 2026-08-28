import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';
import { User } from '../../domain/entities/user.entity';
import type { UserRepository } from '../../domain/ports/user-repository.port';
import { USER_REPOSITORY } from '../../domain/ports/user-repository.port';

@Injectable()
export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const userOrm = await this.userRepository.findOne({
      where: { correo_usuario: email },
      relations: {
        rol: true,
      },
    });

    if (!userOrm) return null;

    return this.mapToDomain(userOrm);
  }

  async findById(id: number): Promise<User | null> {
    const userOrm = await this.userRepository.findOne({
      where: { id_usuario: id },
      relations: {
        rol: true,
      },
    });

    if (!userOrm) return null;

    return this.mapToDomain(userOrm);
  }

  async save(user: User): Promise<User> {
    const userOrm = this.mapToOrm(user);
    const savedOrm = await this.userRepository.save(userOrm);
    return this.mapToDomain(savedOrm);
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    await this.userRepository.update(id, {
      nombre: data.nombre,
      correo_usuario: data.email,
      contrasena_hash: data.password,
      id_rol: data.rolId,
      telefono: data.telefono,
      id_cultivo_real: data.cultivoRealId,
    });

    const updated = await this.findById(id);
    if (!updated) throw new Error('Usuario no encontrado después de actualizar');
    return updated;
  }

  private mapToDomain(orm: UserOrmEntity): User {
    return new User(
      orm.id_usuario,
      orm.nombre,
      orm.correo_usuario,
      orm.contrasena_hash,
      orm.id_rol,
      orm.estado,
      orm.telefono || undefined,
      orm.id_cultivo_real || undefined,
    );
  }

  private mapToOrm(domain: User): UserOrmEntity {
    const orm = new UserOrmEntity();
    orm.id_usuario = domain.id;
    orm.nombre = domain.nombre;
    orm.correo_usuario = domain.email;
    orm.contrasena_hash = domain.password;
    orm.id_rol = domain.rolId;
    orm.estado = domain.estado;
    orm.telefono = domain.telefono || null;
    orm.id_cultivo_real = domain.cultivoRealId || null;
    return orm;
  }
}