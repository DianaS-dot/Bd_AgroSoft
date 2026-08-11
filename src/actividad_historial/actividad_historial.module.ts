import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadHistorialController } from './actividad_historial.controller';
import { ActividadHistorialService } from './actividad_historial.service';
import { ActividadHistorial } from './entities/actividad_historial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadHistorial])],
  controllers: [ActividadHistorialController],
  providers: [ActividadHistorialService],
})
export class ActividadHistorialModule {}
