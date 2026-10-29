import { IsString, IsOptional, IsInt, IsArray } from 'class-validator';

export class CreateEpaDto {
  @IsString()
  nombre: string;

  @IsString()
  tipoEpa: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  sintomas?: string;

  @IsOptional()
  @IsString()
  manejoYControl?: string;

  @IsOptional()
  @IsArray()
  mesesProbables?: number[];

  @IsOptional()
  @IsArray()
  temporadas?: string[];

  @IsOptional()
  @IsString()
  notasEstacionalidad?: string;

  @IsOptional()
  @IsArray()
  fotosSintomas?: string[];

  @IsOptional()
  @IsArray()
  fotosGenerales?: string[];

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsInt()
  creadoPorUsuarioId: number;
}