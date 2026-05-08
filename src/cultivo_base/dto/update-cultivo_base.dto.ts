import { PartialType } from '@nestjs/mapped-types';
import { CreateCultivoBaseDto } from './create-cultivo_base.dto';

export class UpdateCultivoBaseDto extends PartialType(CreateCultivoBaseDto) {}
