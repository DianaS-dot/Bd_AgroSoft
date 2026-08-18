import {
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateTipoSensorDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  unidad?: string;

  @IsNumber()
  @IsOptional()
  decimales?: number;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  imagen?: string;

  @IsNumber()
  @IsOptional()
  ttlMinutos?: number;
}
