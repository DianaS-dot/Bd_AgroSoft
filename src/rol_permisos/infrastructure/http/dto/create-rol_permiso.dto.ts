import { IsInt, IsPositive, IsOptional, IsIn } from 'class-validator';
import type { Estado } from '../../../domain/rol_permiso.entity';

/**
 * DTO para asignar un permiso a un rol.
 * Relación: roles → rol_permisos ← permisos
 */
export class CreateRolPermisoDto {
  /** FK → roles.id */
  @IsInt({ message: 'El rolId debe ser un número entero' })
  @IsPositive({ message: 'El rolId debe ser un ID válido' })
  rolId: number;

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
