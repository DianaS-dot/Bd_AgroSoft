import { PartialType } from '@nestjs/mapped-types';
import { CreateActividadHistorialDto } from './create-actividad_historial.dto';

export class UpdateActividadHistorialDto extends PartialType(CreateActividadHistorialDto) {}
