import { IsInt, IsOptional, IsObject, IsString, MaxLength } from 'class-validator';

export class SaveTelegramFormEstadoDto {
  @IsInt()
  userId: number; // se recibe como number/string y se convierte a bigint en el use-case

  @IsInt()
  step: number;

  @IsOptional()
  @IsObject()
  data?: Record<string, any>;

  @IsString()
  @MaxLength(20)
  estado: string;

  @IsOptional()
  @IsString()
  accessToken?: string;
}