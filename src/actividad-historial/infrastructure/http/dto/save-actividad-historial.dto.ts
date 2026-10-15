import { PartialType } from '@nestjs/mapped-types';
import { CreateActividadHistorialDto } from './create-actividad-historial.dto';

export class SaveActividadHistorialDto extends PartialType(CreateActividadHistorialDto) {}
