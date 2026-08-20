import { InvalidEmailCodeError } from './errors/invalid-email-code.error';
import { EmailCodeExpiredError } from './errors/email-code-expired.error';

export type TipoEmailCode = 'VERIFICACION' | 'RECUPERACION';

export interface CreateEmailCodeInput {
  usuarioId: number;
  codigo: string;
  tipo: TipoEmailCode;
  expiresAt: Date;
}

const CODIGO_REGEX = /^\d{6}$/;

export class EmailCode {
  constructor(
    public readonly id: number | null,
    public readonly usuarioId: number,
    public readonly codigo: string,
    public readonly tipo: TipoEmailCode,
    public readonly expiresAt: Date,
    public usedAt: Date | null,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date | null,
  ) {}

  /**
   * Reglas de negocio:
   * - el código pertenece a un usuario con ID válido.
   * - el código es numérico de 6 dígitos.
   * - no puede crearse un código ya vencido.
   */
  static create(input: CreateEmailCodeInput): EmailCode {
    if (!Number.isInteger(input.usuarioId) || input.usuarioId <= 0) {
      throw new InvalidEmailCodeError(
        'El usuario es obligatorio y debe tener un ID válido',
      );
    }

    const codigo = input.codigo?.trim();
    if (!codigo || !CODIGO_REGEX.test(codigo)) {
      throw new InvalidEmailCodeError(
        'El código debe ser numérico de 6 dígitos',
      );
    }

    if (
      !(input.expiresAt instanceof Date) ||
      Number.isNaN(input.expiresAt.getTime())
    ) {
      throw new InvalidEmailCodeError(
        'La fecha de expiración del código es obligatoria',
      );
    }

    if (input.expiresAt.getTime() <= Date.now()) {
      throw new InvalidEmailCodeError(
        'El código no puede estar vencido al momento de crearlo',
      );
    }

    const now = new Date();

    return new EmailCode(
      null,
      input.usuarioId,
      codigo,
      input.tipo,
      input.expiresAt,
      null,
      now,
      now,
      null,
    );
  }

  estaExpirado(): boolean {
    return this.expiresAt.getTime() <= Date.now();
  }

  esValido(): boolean {
    return !this.usedAt && !this.deletedAt && !this.estaExpirado();
  }

  marcarUsado(): void {
    if (this.usedAt) {
      throw new InvalidEmailCodeError('El código ya fue utilizado');
    }
    if (this.deletedAt) {
      throw new InvalidEmailCodeError('El código fue eliminado');
    }
    if (this.estaExpirado()) {
      throw new EmailCodeExpiredError();
    }
    this.usedAt = new Date();
    this.updatedAt = new Date();
  }

  eliminar(): void {
    if (this.deletedAt) {
      throw new InvalidEmailCodeError('El código ya fue eliminado');
    }
    this.deletedAt = new Date();
    this.updatedAt = new Date();
  }
}
