import { IsInt, IsString, IsOptional, IsNotEmpty, IsDateString, IsPositive } from 'class-validator';

export class CrearFacturaDto {
  @IsInt() @IsPositive()
  ventaId: number;

  @IsString() @IsNotEmpty()
  numero: string;

  @IsOptional() @IsString()
  prefijo?: string;

  @IsDateString()
  fechaEmision: string;

  @IsOptional() @IsDateString()
  vencimiento?: string;

  @IsOptional() @IsString()
  qrUrl?: string;

  @IsOptional() @IsString()
  pdfUrl?: string;
}