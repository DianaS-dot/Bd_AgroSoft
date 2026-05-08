import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCultivoBaseDto {
  @IsString()
  @IsNotEmpty()
  nombre_cultivo!: string;

  @IsString()
  @IsNotEmpty()
  tipo!: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  estado_cultivo?: string;
}