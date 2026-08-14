import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CrearFacturaDto } from './crear-factura.dto';

export class ActualizarFacturaDto extends PartialType(
  OmitType(CrearFacturaDto, ['ventaId'] as const),
) {}