import { IsString, IsOptional, IsInt, IsDateString, Min, MaxLength } from 'class-validator';

export class CreateProgramaFormacionDto {
  @IsString()
  @MaxLength(20)
  numeroFicha: string;

  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @MaxLength(50)
  tipo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsDateString()
  fechaInicio: string;

  @IsDateString()
  fechaFin: string;

  @IsString()
  estado: string;

  @IsInt()
  @Min(0)
  cantidadAprendices: number;
}