import { IsString, IsNumber, Min, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateInsumoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @Min(0)
  stockUso: number;

  @IsString()
  unidadUso: string;

  @IsNumber()
  costoUnitario: number;

  @IsString()
  estado: string;

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
