import { PartialType } from '@nestjs/mapped-types';
import { CreateActividadEvidenciaDto } from './create-actividad-evidencia.dto';

export class SaveActividadEvidenciaDto extends PartialType(CreateActividadEvidenciaDto) {}
