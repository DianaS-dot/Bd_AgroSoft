import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActividadHistorialDto {
  @IsInt()
  @IsNotEmpty()
  id_actividad!: number;

  @IsString()
  @IsNotEmpty()
  accion!: string;

  @IsString()
  @IsOptional()
  estado_anterior?: string;

  @IsString()
  @IsOptional()
  estado_nuevo?: string;

  @IsInt()
  @IsNotEmpty()
  id_usuario!: number;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
