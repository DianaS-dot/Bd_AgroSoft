import { PartialType } from '@nestjs/mapped-types';
import { CreateActividadServicioDto } from './create-actividad-servicio.dto';

export class SaveActividadServicioDto extends PartialType(CreateActividadServicioDto) {}
