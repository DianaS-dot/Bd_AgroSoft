import { TelegramFormEstado } from '../entities/telegram-form-estado.entity';

export interface TelegramFormEstadoRepository {
  save(telegramFormEstado: TelegramFormEstado): Promise<TelegramFormEstado>;
  findByUserId(userId: bigint): Promise<TelegramFormEstado | null>;
}

export const TELEGRAM_FORM_ESTADO_REPOSITORY = Symbol('TELEGRAM_FORM_ESTADO_REPOSITORY');