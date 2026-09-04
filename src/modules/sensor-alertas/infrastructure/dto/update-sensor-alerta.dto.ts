import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorAlertaDto } from './create-sensor-alerta.dto';

export class UpdateSensorAlertaDto extends PartialType(CreateSensorAlertaDto) {}
