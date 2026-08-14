import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CrearProductoAgroDto {
  @IsString() @IsNotEmpty()
  nombre: string;

  @IsString() @IsNotEmpty()
  unidadBase: string;

  @IsOptional() @IsString()
  descripcion?: string;

  @IsOptional() @IsString()
  imagen?: string;
}