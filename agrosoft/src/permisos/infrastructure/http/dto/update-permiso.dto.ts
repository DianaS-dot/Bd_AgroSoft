import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

/** Todos los campos opcionales para soportar PATCH parcial */
export class UpdatePermisoDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  modulo?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  accion?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  clave?: string;
}
