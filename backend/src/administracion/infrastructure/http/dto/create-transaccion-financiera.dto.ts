import { IsString, IsOptional, IsNumber, IsInt, IsDateString } from 'class-validator';

export class CreateTransaccionFinancieraDto {
  @IsString()
  tipo: string;

  @IsString()
  categoria: string;

  @IsNumber()
  monto: number;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsDateString()
  fecha: string;

  @IsOptional()
  @IsInt()
  actividadId?: number;

  @IsOptional()
  @IsInt()
  insumoId?: number;

  @IsOptional()
  @IsInt()
  ventaId?: number;

  @IsInt()
  usuarioId: number;
}