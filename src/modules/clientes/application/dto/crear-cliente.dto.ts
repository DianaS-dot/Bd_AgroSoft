import { IsString, IsOptional, IsNotEmpty, IsEmail } from 'class-validator';

export class CrearClienteDto {
  @IsString() @IsNotEmpty()
  nombre: string;

  @IsString() @IsNotEmpty()
  identificacion: string;

  @IsOptional() @IsString()
  telefono?: string;

  @IsOptional() @IsEmail()
  email?: string;

  @IsOptional() @IsString()
  direccion?: string;

  @IsOptional() @IsString()
  notas?: string;
}