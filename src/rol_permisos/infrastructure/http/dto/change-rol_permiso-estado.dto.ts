import { IsIn, IsNotEmpty } from 'class-validator';
import type { Estado } from '../../../domain/rol_permiso.entity';

/**
 * DTO para cambiar el estado de una asignación rol-permiso.
 * Endpoint: PATCH /api/v1/rol-permisos/:id/estado
 */
export class ChangeRolPermisoEstadoDto {
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsIn(['ACTIVO', 'INACTIVO'], {
    message: "El estado debe ser 'ACTIVO' o 'INACTIVO'",
  })
  estado: Estado;
}
