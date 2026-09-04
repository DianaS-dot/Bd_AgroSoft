import { IsString, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateCultivoDto {
  @IsString()
  @IsNotEmpty()
  nombreCultivo!: string;

  @IsString()
  @IsNotEmpty()
  tipoCultivo!: string;

  @IsString()
  descripcion!: string;

  @IsNumber()
  loteId!: number;

  @IsNumber()
  subloteId!: number;

  @IsString()
  imgCultivo!: string;

  @IsDateString()
  fechaSiembra!: Date;

  @IsDateString()
  fechaFinalizacion!: Date;

  @IsNumber()
  costoTotal!: number;

  @IsString()
  estado!: string;
}
