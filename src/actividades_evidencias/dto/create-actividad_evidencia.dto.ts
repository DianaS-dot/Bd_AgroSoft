import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActividadEvidenciaDto {
  @IsInt()
  @IsNotEmpty()
  id_actividad!: number;

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
}
