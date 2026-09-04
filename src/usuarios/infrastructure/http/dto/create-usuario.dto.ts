import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import type { Estado } from '../../../domain/entities/usuario.entity';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(3, {
    message: 'El nombre debe tener al menos 3 caracteres',
  })
  @MaxLength(100)
  nombre!: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @MinLength(3, {
    message: 'El apellido debe tener al menos 3 caracteres',
  })
  @MaxLength(100)
  apellido!: string;

  @IsString()
  @IsNotEmpty({ message: 'La identificación es obligatoria' })
  @Matches(/^\d{6,15}$/, {
    message:
      'La identificación debe contener entre 6 y 15 dígitos numéricos',
  })
  identificacion!: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  idFicha?: string;

  @IsInt({
    message: 'El programa de formación debe ser un número entero',
  })
  @IsPositive({
    message: 'El programa de formación debe ser un ID válido',
  })
  programaFormacionId!: number;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @IsEmail({}, {
    message: 'El correo electrónico no es válido',
  })
  @IsNotEmpty({
    message: 'El correo es obligatorio',
  })
  correo!: string;

  @IsString()
  @IsNotEmpty({
    message: 'La contraseña es obligatoria',
  })
  @MinLength(8, {
    message: 'La contraseña debe tener al menos 8 caracteres',
  })
  password!: string;

  // Este debe ser el ID de roles.id
  @IsInt({
    message: 'El rol debe ser un número entero',
  })
  @IsPositive({
    message: 'El rol debe ser un ID válido',
  })
  rolId!: number;

  @IsOptional()
  @IsIn(['ACTIVO', 'INACTIVO', 'BLOQUEADO'], {
    message:
      "El estado debe ser 'ACTIVO', 'INACTIVO' o 'BLOQUEADO'",
  })
  estado?: Estado;
}