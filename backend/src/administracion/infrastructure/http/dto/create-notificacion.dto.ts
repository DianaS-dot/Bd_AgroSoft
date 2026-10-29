import { IsString, IsOptional, IsBoolean, IsInt, IsObject } from 'class-validator';

export class CreateNotificacionDto {
  @IsString()
  titulo: string;

  @IsString()
  mensaje: string;

  @IsOptional()
  @IsBoolean()
  leida?: boolean;

  @IsString()
  tipo: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @IsInt()
  usuarioId: number;
}