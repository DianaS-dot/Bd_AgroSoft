import { PartialType } from '@nestjs/mapped-types';
import { CreateActividadServicioDto } from './create-actividad_servicio.dto';

export class UpdateActividadServicioDto extends PartialType(CreateActividadServicioDto) {}
