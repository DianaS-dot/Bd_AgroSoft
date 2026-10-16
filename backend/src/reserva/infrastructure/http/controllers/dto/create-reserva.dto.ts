import { IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateReservaDto {
  @IsNumber()
  @IsNotEmpty()
  actividadId: number;

  @IsNumber()
  @IsNotEmpty()
  insumoId: number;

  @IsNumber()
  @Min(0)
  cantidadReservada: number;
}
