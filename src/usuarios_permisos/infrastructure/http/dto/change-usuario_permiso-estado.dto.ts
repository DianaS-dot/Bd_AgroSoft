import { IsIn, IsNotEmpty } from 'class-validator';
import type { Estado } from '../../../domain/usuario_permiso.entity';

/**
 * DTO para cambiar el estado de un permiso asignado directamente a un usuario.
 * Endpoint: PATCH /api/v1/usuarios-permisos/:id/estado
 */
export class ChangeUsuarioPermisoEstadoDto {
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsIn(['ACTIVO', 'INACTIVO'], {
    message: "El estado debe ser 'ACTIVO' o 'INACTIVO'",
  })
  estado: Estado;
}
