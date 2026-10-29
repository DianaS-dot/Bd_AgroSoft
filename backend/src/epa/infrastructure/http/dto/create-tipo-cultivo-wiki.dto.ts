import { IsString, IsOptional } from 'class-validator';

export class CreateTipoCultivoWikiDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}