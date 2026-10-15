import { PartialType } from '@nestjs/mapped-types';
import { CreateActividadResponsableDto } from './create-actividad-responsable.dto';

export class SaveActividadResponsableDto extends PartialType(CreateActividadResponsableDto) {}
