import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateActividadServicioUseCase } from './application/use-cases/create-actividad-servicio.use-case';
import { GetActividadServicioUseCase } from './application/use-cases/get-actividad-servicio.use-case';
import { SaveActividadServicioUseCase } from './application/use-cases/save-actividad-servicio.use-case';
import { DeleteActividadServicioUseCase } from './application/use-cases/delete-actividad-servicio.use-case';
import { ActividadesServiciosController } from './infrastructure/http/controllers/actividades-servicios.controller';
import { ACTIVIDAD_SERVICIO_REPOSITORY } from './domain/ports/actividad-servicio.repository.port';
import { ActividadServicioOrmEntity } from './infrastructure/persistence/actividad-servicio.orm-entity';
import { TypeOrmActividadServicioRepository } from './infrastructure/persistence/actividad-servicio-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadServicioOrmEntity])],
  controllers: [ActividadesServiciosController],
  providers: [
    CreateActividadServicioUseCase,
    GetActividadServicioUseCase,
    SaveActividadServicioUseCase,
    DeleteActividadServicioUseCase,
    {
      provide: ACTIVIDAD_SERVICIO_REPOSITORY,
      useClass: TypeOrmActividadServicioRepository,
    },
  ],
  exports: [ACTIVIDAD_SERVICIO_REPOSITORY],
})
export class ActividadesServiciosModule {}
