import { IsDate, IsDecimal, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateActividadEjecutadaDto {
  @IsInt()
  id_cultivo_real: number;

  @IsInt()
  id_cultivo: number;

  @IsDate()
  @Type(() => Date)
  fecha_ejecucion: Date;

  @IsInt()
  id_usuario: number;

  @IsDecimal()
  cantidad_usada: number;

  @IsDecimal()
  costo_aplicado: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}