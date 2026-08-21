import {
  IsString,
  IsEmail,
  IsOptional,
  IsInt,
  IsPositive,
  IsIn,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import type { Estado } from '../../../domain/entities/usuario.entity';

/**
 * Todos los campos son opcionales para permitir actualizaciones parciales (PATCH).
 * Los campos que NO deben cambiar nunca por esta vía (passwordHash, correo, etc.)
 * se manejan con endpoints dedicados.
 */
export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  apellido?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{6,15}$/, {
    message: 'La identificación debe contener entre 6 y 15 dígitos numéricos',
  })
  identificacion?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  idFicha?: string;

  /** FK → programas_formacion.id */
  @IsOptional()
  @IsInt()
  @IsPositive()
  programaFormacionId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  correo?: string;

  /** FK → roles.id */
  @IsOptional()
  @IsInt()
  @IsPositive()
  rolId?: number;

  @IsOptional()
  @IsIn(['ACTIVO', 'INACTIVO', 'BLOQUEADO'], {
    message: "El estado debe ser 'ACTIVO', 'INACTIVO' o 'BLOQUEADO'",
  })
  estado?: Estado;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
