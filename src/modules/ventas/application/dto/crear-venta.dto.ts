import { IsInt, IsPositive, IsDateString, IsOptional, Min } from 'class-validator';

// Se crea la venta en "borrador" con totales en cero; los totales reales
// se calculan cuando ventas_detalles agregue las líneas de venta.
export class CrearVentaDto {
  @IsInt() @IsPositive()
  clienteId: number;

  @IsDateString()
  fecha: string;

  @IsInt() @IsPositive()
  usuarioId: number;

  @IsOptional() @Min(0)
  subtotal?: number;

  @IsOptional() @Min(0)
  impuestos?: number;

  @IsOptional() @Min(0)
  descuento?: number;
}