import { PartialType } from '@nestjs/mapped-types';
import { CreateActividadHerramientaDto } from './create-actividad_herramienta.dto';

export class UpdateActividadHerramientaDto extends PartialType(CreateActividadHerramientaDto) {}
