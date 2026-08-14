import { IsIn, IsPositive } from 'class-validator';

export class AjustarStockDto {
  @IsPositive()
  cantidadKg: number;

  @IsIn(['DESCONTAR', 'INCREMENTAR'])
  operacion: 'DESCONTAR' | 'INCREMENTAR';
}