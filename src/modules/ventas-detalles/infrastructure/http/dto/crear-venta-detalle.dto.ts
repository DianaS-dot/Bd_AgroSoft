import { IsInt, IsPositive, Min } from 'class-validator';

export class CrearVentaDetalleDto {
  @IsInt() @IsPositive()
  ventaId: number;

  @IsInt() @IsPositive()
  productoAgroId: number;

  @IsInt() @IsPositive()
  loteProduccionId: number;

  @IsInt() @IsPositive()
  cultivoId: number;

  @IsPositive()
  cantidadKg: number;

  @Min(0)
  precioUnitarioKg: number;

  @IsInt() @IsPositive()
  usuarioId: number;
}