import { IsOptional, IsString, Min } from 'class-validator';

// Solo se permite ajustar campos comerciales/calidad; la cantidad y el stock
// se gestionan mediante operaciones de dominio (descontar/incrementar), no edición libre.
export class ActualizarLoteProduccionDto {
  @IsOptional() @IsString()
  calidad?: string;

  @IsOptional() @Min(0)
  costoUnitarioKg?: number;

  @IsOptional() @Min(0)
  costoTotal?: number;

  @IsOptional() @Min(0)
  precioSugeridoKg?: number;
}