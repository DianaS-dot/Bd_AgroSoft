import { PartialType } from '@nestjs/mapped-types';
import { CreateActividadDto } from './create-actividad.dto';

export class SaveActividadDto extends PartialType(CreateActividadDto) {}