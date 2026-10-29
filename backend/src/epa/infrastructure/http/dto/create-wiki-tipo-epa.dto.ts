import { IsString, IsOptional } from 'class-validator';

export class CreateWikiTipoEpaDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsString()
  tipoEpaEnum: string;
}