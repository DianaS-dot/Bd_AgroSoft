import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActividadResponsableDto {
  @IsInt()
  @IsNotEmpty()
  id_actividad!: number;

  @IsInt()
  @IsNotEmpty()
  id_usuario!: number;

  @IsString()
  @IsOptional()
  rol?: string;

  @IsString()
  @IsOptional()
  estado_asignacion?: string;
}
