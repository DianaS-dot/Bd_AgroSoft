import { IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateActividadInsumoUsoDto {
  @IsNumber()
  @IsNotEmpty()
  actividadId: number;

  @IsNumber()
  @IsNotEmpty()
  insumoId: number;

  @IsNumber()
  @Min(0)
  cantidadUsada: number;

  @IsNumber()
  @Min(0)
  costoUnitarioUso: number;

  @IsNumber()
  @Min(0)
  costoTotal: number;
}
