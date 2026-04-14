import { Module } from '@nestjs/common';
import { ActividadEjecutadaService } from './actividad_ejecutada.service';
import { ActividadEjecutadaController } from './actividad_ejecutada.controller';

@Module({
  controllers: [ActividadEjecutadaController],
  providers: [ActividadEjecutadaService],
})
export class ActividadEjecutadaModule {}
