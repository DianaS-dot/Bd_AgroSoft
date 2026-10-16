import { Inject, Injectable } from '@nestjs/common';
import { EmailCode, TipoEmailCode } from '../../domain/entities/email_code.entity';
import {
  EMAIL_CODE_REPOSITORY,
  type EmailCodeRepository,
} from '../../domain/ports/email-code-repository.port';
import { EmailCodeNotFoundError } from '../../domain/errors/email-code-not-found.error';

@Injectable()
export class GetEmailCodeUseCase {
  constructor(
    @Inject(EMAIL_CODE_REPOSITORY)
    private readonly emailCodeRepository: EmailCodeRepository,
  ) {}

  async findById(id: number): Promise<EmailCode> {
    const emailCode = await this.emailCodeRepository.findById(id);
    if (!emailCode) {
      throw new EmailCodeNotFoundError(`No se encontró un código con id ${id}`);
    }
    return emailCode;
  }

  async findByCodigo(codigo: string): Promise<EmailCode> {
    const emailCode = await this.emailCodeRepository.findByCodigo(
      codigo?.trim(),
    );
    if (!emailCode) {
      throw new EmailCodeNotFoundError(
        `No se encontró un código con valor ${codigo}`,
      );
    }
    return emailCode;
  }

  async findByUsuarioIdAndTipo(
    usuarioId: number,
    tipo: TipoEmailCode,
  ): Promise<EmailCode> {
    const emailCode = await this.emailCodeRepository.findByUsuarioIdAndTipo(
      usuarioId,
      tipo,
    );
    if (!emailCode) {
      throw new EmailCodeNotFoundError(
        `No se encontró un código de tipo ${tipo} para el usuario ${usuarioId}`,
      );
    }
    return emailCode;
  }
}
