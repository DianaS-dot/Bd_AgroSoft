import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsPositive,
  IsIn,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import type { Estado } from '../../../domain/usuario.entity';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100)
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @MinLength(3, { message: 'El apellido debe tener al menos 3 caracteres' })
  @MaxLength(100)
  apellido: string;

  @IsString()
  @IsNotEmpty({ message: 'La identificación es obligatoria' })
  @Matches(/^\d{6,15}$/, {
    message: 'La identificación debe contener entre 6 y 15 dígitos numéricos',
  })
  identificacion: string;

  /** Número de ficha SENA (opcional) */
  @IsOptional()
  @IsString()
  @MaxLength(20)
  idFicha?: string;

  /** FK → programas_formacion.id */
  @IsInt({ message: 'El programa de formación debe ser un número entero' })
  @IsPositive({ message: 'El programa de formación debe ser un ID válido' })
  programaFormacionId: number;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty()
  correo: string;

  /**
   * Contraseña en texto plano. En producción el hash se genera en el
   * caso de uso antes de persistir; aquí sólo se recibe el valor crudo.
   */
  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;

  /** FK → roles.id */
  @IsInt({ message: 'El rol debe ser un número entero' })
  @IsPositive({ message: 'El rol debe ser un ID válido' })
  rolId: number;

  /** ACTIVO por defecto si no se envía */
  @IsOptional()
  @IsIn(['ACTIVO', 'INACTIVO', 'BLOQUEADO'], {
    message: "El estado debe ser 'ACTIVO', 'INACTIVO' o 'BLOQUEADO'",
  })
  estado?: Estado;
}
