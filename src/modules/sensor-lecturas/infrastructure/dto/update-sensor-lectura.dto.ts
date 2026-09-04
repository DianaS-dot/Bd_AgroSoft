import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorLecturaDto } from './create-sensor-lectura.dto';

export class UpdateSensorLecturaDto extends PartialType(
  CreateSensorLecturaDto,
) {}
