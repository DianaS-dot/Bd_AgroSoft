import { IsString, IsOptional, IsIn, MinLength, MaxLength } from 'class-validator';
import type { Estado } from '../../../domain/entities/rol.entity';

/** Todos los campos opcionales para soportar PATCH parcial */
export class UpdateRolDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'La descripción debe tener al menos 3 caracteres' })
  @MaxLength(255)
  descripcion?: string;

  @IsOptional()
  @IsIn(['ACTIVO', 'INACTIVO'], {
    message: "El estado debe ser 'ACTIVO' o 'INACTIVO'",
  })
  estado?: Estado;
}
