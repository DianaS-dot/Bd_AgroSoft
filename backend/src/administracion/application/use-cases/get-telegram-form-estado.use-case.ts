import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TelegramFormEstado } from '../../domain/entities/telegram-form-estado.entity';
import type { TelegramFormEstadoRepository } from '../../domain/ports/telegram-form-estado.repository.port';
import { TELEGRAM_FORM_ESTADO_REPOSITORY } from '../../domain/ports/telegram-form-estado.repository.port';

@Injectable()
export class GetTelegramFormEstadoUseCase {
  constructor(
    @Inject(TELEGRAM_FORM_ESTADO_REPOSITORY)
    private readonly telegramFormEstadoRepository: TelegramFormEstadoRepository,
  ) {}

  async execute(userId: bigint): Promise<TelegramFormEstado> {
    const estado = await this.telegramFormEstadoRepository.findByUserId(userId);
    if (!estado) {
      throw new NotFoundException(`No hay estado de formulario para el usuario ${userId}`);
    }
    return estado;
  }
}