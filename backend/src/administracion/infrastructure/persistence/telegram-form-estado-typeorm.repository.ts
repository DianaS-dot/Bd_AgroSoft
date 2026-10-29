import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelegramFormEstadoRepository } from '../../domain/ports/telegram-form-estado.repository.port';
import { TelegramFormEstado } from '../../domain/entities/telegram-form-estado.entity';
import { TelegramFormEstadoOrmEntity } from './telegram-form-estado.orm-entity';

@Injectable()
export class TelegramFormEstadoTypeOrmRepository implements TelegramFormEstadoRepository {
  constructor(
    @InjectRepository(TelegramFormEstadoOrmEntity)
    private readonly ormRepo: Repository<TelegramFormEstadoOrmEntity>,
  ) {}

  async save(estado: TelegramFormEstado): Promise<TelegramFormEstado> {
    const saved = await this.ormRepo.save({
      id: estado.id ?? undefined,
      user_id: estado.userId.toString(),
      step: estado.step,
      data: estado.data ?? {},
      estado: estado.estado,
      access_token: estado.accessToken,
    });
    return this.toDomain(saved);
  }

  async findByUserId(userId: bigint): Promise<TelegramFormEstado | null> {
    const row = await this.ormRepo.findOneBy({ user_id: userId.toString() });
    return row ? this.toDomain(row) : null;
  }

  private toDomain(row: TelegramFormEstadoOrmEntity): TelegramFormEstado {
    return TelegramFormEstado.create({
      id: row.id,
      userId: BigInt(row.user_id),
      step: row.step,
      data: row.data,
      estado: row.estado,
      accessToken: row.access_token,
      updatedAt: row.updated_at,
    });
  }
}