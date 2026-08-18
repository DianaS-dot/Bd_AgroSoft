import {
  IsNumber,
  IsString,
  IsDateString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateSensorLecturaDto {
  @IsNumber()
  sensorId!: number;

  @IsString()
  @IsNotEmpty()
  valor!: string;

  @IsDateString()
  fechaLectura!: Date;

  @IsString()
  @IsNotEmpty()
  unidad!: string;

  @IsString()
  @IsOptional()
  observaciones!: string;
}
