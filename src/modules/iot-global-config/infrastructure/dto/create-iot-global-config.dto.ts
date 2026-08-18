import {
  IsString,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateIotGlobalConfigDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  broker!: string;

  @IsNumber()
  port!: number;

  @IsString()
  @IsNotEmpty()
  protocol!: string;

  @IsString()
  @IsOptional()
  topicPrefix!: string;

  @IsString()
  @IsOptional()
  defaultTopics!: string;

  @IsString()
  @IsOptional()
  customTopics!: string;

  @IsNumber()
  @IsOptional()
  loteId!: number;

  @IsNumber()
  @IsOptional()
  subLoteId!: number;

  @IsString()
  @IsOptional()
  username!: string;

  @IsString()
  @IsOptional()
  password!: string;

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
