import { EmailCode, TipoEmailCode } from './email_code.entity';

export interface EmailCodeRepository {
  save(emailCode: EmailCode): Promise<EmailCode>;
  findById(id: number): Promise<EmailCode | null>;
  findByCodigo(codigo: string): Promise<EmailCode | null>;
  findByUsuarioIdAndTipo(
    usuarioId: number,
    tipo: TipoEmailCode,
  ): Promise<EmailCode | null>;
}

// Token de inyección — en TS las interfaces no existen en tiempo de ejecución,
// así que necesitamos un "token" para que NestJS sepa qué inyectar.
export const EMAIL_CODE_REPOSITORY = Symbol('EMAIL_CODE_REPOSITORY');
