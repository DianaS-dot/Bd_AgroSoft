import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAlmacenDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsNotEmpty()
  ubicacion: string;
}
