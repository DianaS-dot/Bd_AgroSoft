import { IsEnum, IsInt, IsOptional, IsPositive, IsString, IsNotEmpty } from 'class-validator';
import { MetodoPago } from '../../domain/entities/metodo-pago.enum';

export class CrearPagoDto {
  @IsInt() @IsPositive()
  ventaId: number;

  @IsEnum(MetodoPago)
  metodo: MetodoPago;

  @IsPositive()
  monto: number;

  @IsString() @IsNotEmpty()
  moneda: string;

  @IsOptional() @IsString()
  referencia?: string;
}