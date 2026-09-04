import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadController } from './infrastructure/http/controllers/actividad.controller';
import { CrearActividadUseCase } from './application/use-cases/crear-actividad.use-case';
import { ObtenerActividadUseCase } from './application/use-cases/obtener-actividad.use-case';
import { ActualizarActividadUseCase } from './application/use-cases/actualizar-actividad.use-case';
import { EliminarActividadUseCase } from './application/use-cases/eliminar-actividad.use-case';
import { ACTIVIDAD_REPOSITORY } from './domain/ports/actividad.repository-port';
import { ActividadTypeOrmRepository } from './infrastructure/persistence/actividad-typeorm.repository';
import { ActividadOrmEntity } from './infrastructure/persistence/actividad.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadOrmEntity])],
  controllers: [ActividadController],
  providers: [
    CrearActividadUseCase,
    ObtenerActividadUseCase,
    ActualizarActividadUseCase,
    EliminarActividadUseCase,
    {
      provide: ACTIVIDAD_REPOSITORY,
      useClass: ActividadTypeOrmRepository,
    },
  ],
  exports: [
    CrearActividadUseCase,
    ObtenerActividadUseCase,
    ActualizarActividadUseCase,
    EliminarActividadUseCase,
  ],
})
export class ActividadesModule {}
