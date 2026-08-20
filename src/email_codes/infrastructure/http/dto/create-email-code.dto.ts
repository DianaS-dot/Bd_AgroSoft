import { IsInt, IsPositive, IsIn } from 'class-validator';
import type { TipoEmailCode } from '../../../domain/email_code.entity';


/**
 * DTO para generar un código de verificación/recuperación por email.
 *
 * Basado en la tabla `email_codes`:
 *   usuarioId  integer      FK → usuarios.id
 *   tipo       varchar(10)  'VERIFICACION' | 'RECUPERACION'
 *   code       varchar(6)   código numérico de 6 dígitos
 *   expiresAt  timestamp    fecha de expiración (obligatoria, debe ser futura)
 *
 * NOTA: En un flujo real el `codigo` y `expiresAt` se generan en el caso de uso,
 * no los envía el cliente. Este DTO representa el caso en que el backend los
 * genera internamente — el cliente sólo envía `usuarioId` y `tipo`.
 */
export class CreateEmailCodeDto {
  /** FK → usuarios.id */
  @IsInt({ message: 'El usuarioId debe ser un número entero' })
  @IsPositive({ message: 'El usuarioId debe ser un ID válido' })
  usuarioId: number;

  @IsIn(['VERIFICACION', 'RECUPERACION'], {
    message: "El tipo debe ser 'VERIFICACION' o 'RECUPERACION'",
  })
  tipo: TipoEmailCode;
}
