import { IsInt, IsPositive, IsOptional, IsIn } from 'class-validator';
import type { Estado } from '../../../domain/usuario_permiso.entity';

/**
 * DTO para asignar un permiso directo a un usuario (override del rol).
 * Relación: usuarios → usuarios_permisos ← permisos
 */
export class CreateUsuarioPermisoDto {
  /** FK → usuarios.id */
  @IsInt({ message: 'El usuarioId debe ser un número entero' })
  @IsPositive({ message: 'El usuarioId debe ser un ID válido' })
  usuarioId: number;

  /** FK → permisos.id */
  @IsInt({ message: 'El permisoId debe ser un número entero' })
  @IsPositive({ message: 'El permisoId debe ser un ID válido' })
  permisoId: number;

  /** ACTIVO por defecto si no se envía */
  @IsOptional()
  @IsIn(['ACTIVO', 'INACTIVO'], {
    message: "El estado debe ser 'ACTIVO' o 'INACTIVO'",
  })
  estado?: Estado;
}
