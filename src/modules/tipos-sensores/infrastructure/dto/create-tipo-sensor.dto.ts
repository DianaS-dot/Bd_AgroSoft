import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateTipoSensorDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  unidad!: string;

  @IsNumber()
  decimales!: number;

  @IsString()
  @IsOptional()
  descripcion!: string;

  @IsString()
  @IsOptional()
  imagen!: string;

  @IsNumber()
  @IsOptional()
  ttlMinutos!: number;
}
