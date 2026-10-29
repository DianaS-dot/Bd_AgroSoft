import { Inject, Injectable } from '@nestjs/common';
import { TelegramFormEstado } from '../../domain/entities/telegram-form-estado.entity';
import type { TelegramFormEstadoRepository } from '../../domain/ports/telegram-form-estado.repository.port';
import { TELEGRAM_FORM_ESTADO_REPOSITORY } from '../../domain/ports/telegram-form-estado.repository.port';

@Injectable()
export class SaveTelegramFormEstadoUseCase {
  constructor(
    @Inject(TELEGRAM_FORM_ESTADO_REPOSITORY)
    private readonly telegramFormEstadoRepository: TelegramFormEstadoRepository,
  ) {}

  async execute(input: {
    userId: bigint;
    step: number;
    data?: Record<string, any>;
    estado: string;
    accessToken?: string;
  }): Promise<TelegramFormEstado> {
    const existente = await this.telegramFormEstadoRepository.findByUserId(input.userId);
    const estado = TelegramFormEstado.create({
      id: existente?.id ?? null,
      userId: input.userId,
      step: input.step,
      data: input.data,
      estado: input.estado,
      accessToken: input.accessToken,
    });
    return this.telegramFormEstadoRepository.save(estado);
  }
}