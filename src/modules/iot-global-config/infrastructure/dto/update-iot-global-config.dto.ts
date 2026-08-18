import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateIotGlobalConfigDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  broker?: string;

  @IsNumber()
  @IsOptional()
  port?: number;

  @IsString()
  @IsOptional()
  protocol?: string;

  @IsString()
  @IsOptional()
  topicPrefix?: string;

  @IsString()
  @IsOptional()
  defaultTopics?: string;

  @IsString()
  @IsOptional()
  customTopics?: string;

  @IsNumber()
  @IsOptional()
  loteId?: number;

  @IsNumber()
  @IsOptional()
  subLoteId?: number;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsBoolean()
  @IsOptional()
  defaultSensorsInitialized?: boolean;

  @IsBoolean()
  @IsOptional()
  autoDiscover?: boolean;
}
