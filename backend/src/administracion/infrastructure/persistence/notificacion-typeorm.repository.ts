import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificacionRepository } from '../../domain/ports/notificacion.repository.port';
import { Notificacion } from '../../domain/entities/notificacion.entity';
import { NotificacionOrmEntity } from './notificacion.orm-entity';

@Injectable()
export class NotificacionTypeOrmRepository implements NotificacionRepository {
  constructor(
    @InjectRepository(NotificacionOrmEntity)
    private readonly ormRepo: Repository<NotificacionOrmEntity>,
  ) {}

  async save(notificacion: Notificacion): Promise<Notificacion> {
    const saved = await this.ormRepo.save({
      id: notificacion.id ?? undefined,
      titulo: notificacion.titulo,
      mensaje: notificacion.mensaje,
      leida: notificacion.leida,
      tipo: notificacion.tipo,
      metadata: notificacion.metadata,
      usuarioId: notificacion.usuarioId,
    });
    return this.toDomain(saved);
  }

  async findAll(): Promise<Notificacion[]> {
    return (await this.ormRepo.find()).map((row) => this.toDomain(row));
  }

  async findById(id: number): Promise<Notificacion | null> {
    const row = await this.ormRepo.findOneBy({ id });
    return row ? this.toDomain(row) : null;
  }

  async findByUsuarioId(usuarioId: number): Promise<Notificacion[]> {
    return (await this.ormRepo.findBy({ usuarioId })).map((row) => this.toDomain(row));
  }

  private toDomain(row: NotificacionOrmEntity): Notificacion {
    return Notificacion.create({
      id: row.id,
      titulo: row.titulo,
      mensaje: row.mensaje,
      leida: row.leida,
      tipo: row.tipo,
      metadata: row.metadata,
      usuarioId: row.usuarioId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
    });
  }
}