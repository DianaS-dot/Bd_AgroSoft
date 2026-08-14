import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CrearAjusteManualDto {
  @IsInt() @IsPositive()
  loteProduccionId: number;

  @IsPositive()
  cantidadKg: number;

  @IsIn(['ENTRADA', 'SALIDA'])
  direccion: 'ENTRADA' | 'SALIDA';

  @IsInt() @IsPositive()
  usuarioId: number;

  @IsOptional() @IsString()
  descripcion?: string;
}