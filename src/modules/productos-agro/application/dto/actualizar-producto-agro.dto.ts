import { PartialType } from '@nestjs/mapped-types';
import { CrearProductoAgroDto } from './crear-producto-agro.dto';

export class ActualizarProductoAgroDto extends PartialType(CrearProductoAgroDto) {}