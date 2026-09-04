import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateLoteDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  geom!: string;

  @IsNumber()
  areaM2!: number;

  @IsNumber()
  areaHa!: number;

  @IsString()
  centroide!: string;

  @IsString()
  descripcion!: string;

  @IsString()
  estado!: string;
}
