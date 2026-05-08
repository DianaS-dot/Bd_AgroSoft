import { PartialType } from '@nestjs/mapped-types';
import { CreateCultivoRealDto } from './create-cultivo_real.dto';

export class UpdateCultivoRealDto extends PartialType(CreateCultivoRealDto) {}
