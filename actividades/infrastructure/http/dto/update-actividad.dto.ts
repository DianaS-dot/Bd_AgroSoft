import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateActividadDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsDateString()
  @IsOptional()
  fechaInicio?: string;

  @IsDateString()
  @IsOptional()
  fechaFin?: string;

  @IsString()
  @IsOptional()
  estado?: string;
}
