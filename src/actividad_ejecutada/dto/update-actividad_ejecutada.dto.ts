import { PartialType } from '@nestjs/mapped-types';
import { CreateActividadEjecutadaDto } from './create-actividad_ejecutada.dto';

export class UpdateActividadEjecutadaDto extends PartialType(CreateActividadEjecutadaDto) {}
