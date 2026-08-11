import { PartialType } from '@nestjs/mapped-types';
import { CreateActividadResponsableDto } from './create-actividad_responsable.dto';

export class UpdateActividadResponsableDto extends PartialType(CreateActividadResponsableDto) {}
