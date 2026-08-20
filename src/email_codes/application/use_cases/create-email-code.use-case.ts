import { Inject, Injectable } from '@nestjs/common';
import { CreateEmailCodeInput, EmailCode } from '../../domain/email_code.entity';
import {
  EMAIL_CODE_REPOSITORY,
  type EmailCodeRepository,
} from '../../domain/email-code-repository.port';
import { EmailCodeAlreadyExistsError } from '../../domain/errors/email-code-already-exists.error';

@Injectable()
export class CreateEmailCodeUseCase {
  constructor(
    @Inject(EMAIL_CODE_REPOSITORY)
    private readonly emailCodeRepository: EmailCodeRepository,
  ) {}

  async execute(input: CreateEmailCodeInput): Promise<EmailCode> {
    // Valida las reglas de negocio (usuario, código y expiración válidos).
    const emailCode = EmailCode.create(input);

    // No debe existir un código aún válido para el mismo usuario y tipo.
    const existente = await this.emailCodeRepository.findByUsuarioIdAndTipo(
      emailCode.usuarioId,
      emailCode.tipo,
    );
    if (existente && existente.esValido()) {
      throw new EmailCodeAlreadyExistsError(
        `Ya existe un código válido de tipo ${emailCode.tipo} para el usuario ${emailCode.usuarioId}`,
      );
    }

    return this.emailCodeRepository.save(emailCode);
  }
}
