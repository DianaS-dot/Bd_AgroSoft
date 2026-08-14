import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { ClienteRepositoryPort } from '../../domain/ports/cliente.repository.port';
import { Cliente } from '../../domain/entities/cliente.entity';
import { ClienteOrmEntity } from './cliente.orm-entity';

export class ClienteTypeOrmRepository implements ClienteRepositoryPort {
  constructor(
    @InjectRepository(ClienteOrmEntity)
    private readonly ormRepo: Repository<ClienteOrmEntity>,
  ) {}

  private toDomain(e: ClienteOrmEntity): Cliente {
    return new Cliente(
      e.id,
      e.nombre,
      e.identificacion,
      e.telefono,
      e.email,
      e.direccion,
      e.notas,
      e.createdAt,
    );
  }

  async crear(cliente: Cliente): Promise<Cliente> {
    const entity = this.ormRepo.create({
      nombre: cliente.nombre,
      identificacion: cliente.identificacion,
      telefono: cliente.telefono ?? undefined,
      email: cliente.email ?? undefined,
      direccion: cliente.direccion ?? undefined,
      notas: cliente.notas ?? undefined,
    });
    const saved = await this.ormRepo.save(entity);
    return this.toDomain(saved);
  }

  async actualizar(id: number, cliente: Cliente): Promise<Cliente> {
    await this.ormRepo.update(id, {
      nombre: cliente.nombre,
      identificacion: cliente.identificacion,
      telefono: cliente.telefono ?? undefined,
      email: cliente.email ?? undefined,
      direccion: cliente.direccion ?? undefined,
      notas: cliente.notas ?? undefined,
    });
    const actualizado = await this.ormRepo.findOneBy({ id });
    if (!actualizado) {
      throw new Error('Cliente no encontrado después de actualizar');
    }
    return this.toDomain(actualizado);
  }

  async eliminar(id: number): Promise<void> {
    await this.ormRepo.softDelete(id);
  }

  async buscarPorId(id: number): Promise<Cliente | null> {
    const e = await this.ormRepo.findOneBy({ id });
    return e ? this.toDomain(e) : null;
  }

  async buscarPorIdentificacion(identificacion: string): Promise<Cliente | null> {
    const e = await this.ormRepo.findOneBy({ identificacion });
    return e ? this.toDomain(e) : null;
  }

  async listar(): Promise<Cliente[]> {
    const list = await this.ormRepo.find();
    return list.map((e) => this.toDomain(e));
  }
}