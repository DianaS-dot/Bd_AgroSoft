import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateCultivoRealDto {
  @IsDateString()
  @IsNotEmpty()
  fecha_inicio!: string;

  @IsString()
  @IsNotEmpty()
  tamaño_lote!: string;

  @IsString()
  @IsNotEmpty()
  estado!: string;

  @IsNumber()
  @IsNotEmpty()
  id_cultivo_base!: number; // Para relacionarlo con el cultivo base
}