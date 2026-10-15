import { PartialType } from '@nestjs/mapped-types';
import { CreateActividadHerramientaDto } from './create-actividad-herramienta.dto';

export class SaveActividadHerramientaDto extends PartialType(CreateActividadHerramientaDto) {}
