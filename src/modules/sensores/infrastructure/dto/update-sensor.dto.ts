import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class UpdateSensorDto {
  @IsString()
  @IsOptional()
  nombreSensor?: string;

  @IsNumber()
  @IsOptional()
  tipoSensorId?: number;

  @IsString()
  @IsOptional()
  protocolo?: string;

  @IsString()
  @IsOptional()
  endpointUrl?: string;

  @IsString()
  @IsOptional()
  mqttTopic?: string;

  @IsNumber()
  @IsOptional()
  valorMinimoSensor?: number;

  @IsNumber()
  @IsOptional()
  valorMaximoSensor?: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsString()
  @IsOptional()
  estadoConexion?: string;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsString()
  @IsOptional()
  ultimoValor?: string;

  @IsDateString()
  @IsOptional()
  ultimaMedicion?: Date;

  @IsDateString()
  @IsOptional()
  lastSeenAt?: Date;

  @IsNumber()
  @IsOptional()
  cultivoId?: number;

  @IsNumber()
  @IsOptional()
  creadoPorUsuarioId?: number;

  @IsNumber()
  @IsOptional()
  globalConfigId?: number;

  @IsNumber()
  @IsOptional()
  loteId?: number;

  @IsNumber()
  @IsOptional()
  subLoteId?: number;
}
