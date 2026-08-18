import {
  IsNumber,
  IsString,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreateSensorAlertaDto {
  @IsNumber()
  sensorId!: number;

  @IsNumber()
  valor!: number;

  @IsNumber()
  umbral!: number;

  @IsString()
  @IsNotEmpty()
  tipo!: string;

  @IsDateString()
  fechaAlerta!: Date;

  @IsNumber()
  loteId!: number;

  @IsNumber()
  subLoteId!: number;
}
