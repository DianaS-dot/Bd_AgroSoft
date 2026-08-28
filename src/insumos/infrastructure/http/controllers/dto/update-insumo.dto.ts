import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateInsumoDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stockUso?: number;

  @IsString()
  @IsOptional()
  unidadUso?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  costoUnitario?: number;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsNumber()
  @IsOptional()
  categoriaId?: number;

  @IsNumber()
  @IsOptional()
  almacenId?: number;

  @IsNumber()
  @IsOptional()
  proveedorId?: number;
}
