import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadesHerramientasController } from './actividades_herramientas.controller';
import { ActividadesHerramientasService } from './actividades_herramientas.service';
import { ActividadHerramienta } from './entities/actividad_herramienta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadHerramienta])],
  controllers: [ActividadesHerramientasController],
  providers: [ActividadesHerramientasService],
})
export class ActividadesHerramientasModule {}
