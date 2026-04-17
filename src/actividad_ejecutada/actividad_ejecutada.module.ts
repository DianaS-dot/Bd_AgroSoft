import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadEjecutada } from './entities/actividad_ejecutada.entity';
import { ActividadEjecutadaService } from './actividad_ejecutada.service';
import { ActividadEjecutadaController } from './actividad_ejecutada.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadEjecutada])],
  controllers: [ActividadEjecutadaController],
  providers: [ActividadEjecutadaService],
})
export class ActividadEjecutadaModule {}