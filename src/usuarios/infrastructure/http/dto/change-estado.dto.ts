import { IsIn, IsNotEmpty } from 'class-validator';
import type { Estado } from '../../../domain/entities/usuario.entity';

/**
 * DTO para el endpoint PATCH /usuarios/:id/estado
 * Permite cambiar el estado del usuario de forma explícita y controlada.
 */
export class ChangeEstadoDto {
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsIn(['ACTIVO', 'INACTIVO', 'BLOQUEADO'], {
    message: "El estado debe ser 'ACTIVO', 'INACTIVO' o 'BLOQUEADO'",
  })
  estado!: Estado;
}
