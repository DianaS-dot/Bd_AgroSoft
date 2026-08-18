import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreateSensorDto {
  @IsString()
  @IsNotEmpty()
  nombreSensor!: string;

  @IsNumber()
  tipoSensorId!: number;

  @IsString()
  @IsNotEmpty()
  protocolo!: string;

  @IsString()
  @IsOptional()
  endpointUrl!: string;

  @IsString()
  @IsOptional()
  mqttTopic!: string;

  @IsNumber()
  valorMinimoSensor!: number;

  @IsNumber()
  valorMaximoSensor!: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsString()
  @IsOptional()
  estadoConexion!: string;

  @IsString()
  @IsOptional()
  estado!: string;

  @IsString()
  @IsOptional()
  ultimoValor!: string;

  @IsDateString()
  @IsOptional()
  ultimaMedicion!: Date;

  @IsDateString()
  @IsOptional()
  lastSeenAt!: Date;

  @IsNumber()
  @IsOptional()
  cultivoId!: number;

  @IsNumber()
  @IsOptional()
  creadoPorUsuarioId!: number;

  @IsNumber()
  @IsOptional()
  globalConfigId!: number;

  @IsNumber()
  @IsOptional()
  loteId!: number;

  @IsNumber()
  @IsOptional()
  subLoteId!: number;
}
