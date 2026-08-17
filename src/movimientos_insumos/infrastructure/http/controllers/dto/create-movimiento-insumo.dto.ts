import { IsString, IsNumber, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateMovimientoInsumoDto {
  @IsNumber()
  @IsNotEmpty()
  insumoId: number;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsNumber()
  @Min(0)
  cantidadPresentacion: number;

  @IsNumber()
  @Min(0)
  cantidadUso: number;

  @IsNumber()
  @Min(0)
  costoUnitarioPresentacion: number;

  @IsNumber()
  @Min(0)
  costoUnitarioUso: number;

  @IsNumber()
  @Min(0)
  costoTotal: number;

  @IsNumber()
  @Min(0)
  valorInventarioResultante: number;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsOptional()
  actividadId?: number;

  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;

  @IsNumber()
  @IsOptional()
  almacenOrigenId?: number;

  @IsNumber()
  @IsOptional()
  almacenDestinoId?: number;
}
