import { IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class CrearLoteProduccionDto {
  @IsInt() @IsPositive()
  productoAgroId: number;

  @IsInt() @IsPositive()
  cultivoId: number;

  @IsInt() @IsPositive()
  loteId: number;

  @IsOptional() @IsInt() @IsPositive()
  subLoteId?: number;

  @IsOptional() @IsInt() @IsPositive()
  actividadCosechaId?: number;

  @IsOptional() @IsString()
  calidad?: string;

  @IsPositive()
  cantidadKg: number;

  @Min(0)
  costoUnitarioKg: number;

  @Min(0)
  costoTotal: number;

  @IsOptional() @Min(0)
  precioSugeridoKg?: number;
}