import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateActividadDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsDateString({}, { message: 'fechaInicio debe ser una fecha ISO8601 válida.' })
  fechaInicio: string;

  @IsDateString({}, { message: 'fechaFin debe ser una fecha ISO8601 válida.' })
  fechaFin: string;

  @IsString()
  @IsOptional()
  estado?: string;
}
