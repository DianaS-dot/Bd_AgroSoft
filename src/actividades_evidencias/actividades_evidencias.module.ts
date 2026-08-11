import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadesEvidenciasController } from './actividades_evidencias.controller';
import { ActividadesEvidenciasService } from './actividades_evidencias.service';
import { ActividadEvidencia } from './entities/actividad_evidencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadEvidencia])],
  controllers: [ActividadesEvidenciasController],
  providers: [ActividadesEvidenciasService],
})
export class ActividadesEvidenciasModule {}
