import {
  IsString,
  IsNumber,
  IsNotEmpty,
} from "class-validator";

export class CreateSubloteDto {

  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsNumber()
  loteId!: number;

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