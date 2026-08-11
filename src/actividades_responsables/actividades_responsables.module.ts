import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadesResponsablesController } from './actividades_responsables.controller';
import { ActividadesResponsablesService } from './actividades_responsables.service';
import { ActividadResponsable } from './entities/actividad_responsable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadResponsable])],
  controllers: [ActividadesResponsablesController],
  providers: [ActividadesResponsablesService],
})
export class ActividadesResponsablesModule {}
