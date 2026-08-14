import { IsInt, IsPositive } from 'class-validator';

export class AnularVentaDto {
  @IsInt() @IsPositive()
  usuarioId: number;
}