import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActividadHerramientaDto {
  @IsInt()
  @IsNotEmpty()
  id_actividad!: number;

  @IsString()
  @IsNotEmpty()
  nombre_herramienta!: string;

  @IsInt()
  @IsOptional()
  cantidad?: number;

  @IsString()
  @IsOptional()
  unidad_medida?: string;

  @IsString()
  @IsOptional()
  estado_uso?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
