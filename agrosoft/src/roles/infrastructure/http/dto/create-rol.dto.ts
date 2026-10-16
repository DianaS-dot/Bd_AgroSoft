import { IsString, IsNotEmpty, IsOptional, IsIn, MinLength, MaxLength } from 'class-validator';
import type { Estado } from '../../../domain/entities/rol.entity';

export class CreateRolDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del rol es obligatorio' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100)
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción del rol es obligatoria' })
  @MinLength(3, { message: 'La descripción debe tener al menos 3 caracteres' })
  @MaxLength(255)
  descripcion: string;

  /** ACTIVO por defecto si no se envía */
  @IsOptional()
  @IsIn(['ACTIVO', 'INACTIVO'], {
    message: "El estado debe ser 'ACTIVO' o 'INACTIVO'",
  })
  estado?: Estado;
}
