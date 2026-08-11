import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadesServiciosController } from './actividades_servicios.controller';
import { ActividadesServiciosService } from './actividades_servicios.service';
import { ActividadServicio } from './entities/actividad_servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadServicio])],
  controllers: [ActividadesServiciosController],
  providers: [ActividadesServiciosService],
})
export class ActividadesServiciosModule {}
