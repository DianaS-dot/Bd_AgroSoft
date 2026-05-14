import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEvidenciaDto {
  @IsString()
  @IsNotEmpty()
  tipo_evidencia!: string;

  @IsString()
  @IsNotEmpty()
  archivo_url!: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;

  @IsString()
  @IsOptional()
  resultado_preliminar?: string;
}