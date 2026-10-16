import { IsString, IsNotEmpty, Matches } from 'class-validator';

/**
 * DTO para verificar un código de email recibido por el usuario.
 * Endpoint: POST /api/v1/email-codes/verificar
 *
 * El cliente envía el código de 6 dígitos que llegó a su correo.
 */
export class VerifyEmailCodeDto {
  /** Código numérico de 6 dígitos enviado al correo del usuario */
  @IsString()
  @IsNotEmpty({ message: 'El código es obligatorio' })
  @Matches(/^\d{6}$/, {
    message: 'El código debe ser numérico y tener exactamente 6 dígitos',
  })
  codigo: string;
}
