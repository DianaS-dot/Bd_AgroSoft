import { IsString, IsNotEmpty, MinLength } from 'class-validator';

/**
 * DTO para el endpoint PATCH /usuarios/:id/password
 * Se recibe la contraseña actual para confirmar identidad y la nueva.
 */
export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'La contraseña actual es obligatoria' })
  passwordActual: string;

  @IsString()
  @IsNotEmpty({ message: 'La nueva contraseña es obligatoria' })
  @MinLength(8, { message: 'La nueva contraseña debe tener al menos 8 caracteres' })
  passwordNuevo: string;
}
