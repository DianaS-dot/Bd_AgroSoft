import { PartialType } from '@nestjs/mapped-types';
import { CreateActividadEvidenciaDto } from './create-actividad_evidencia.dto';

export class UpdateActividadEvidenciaDto extends PartialType(CreateActividadEvidenciaDto) {}
