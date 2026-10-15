import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateActividadHistorialUseCase } from './application/use-cases/create-actividad-historial.use-case';
import { GetActividadHistorialUseCase } from './application/use-cases/get-actividad-historial.use-case';
import { SaveActividadHistorialUseCase } from './application/use-cases/save-actividad-historial.use-case';
import { DeleteActividadHistorialUseCase } from './application/use-cases/delete-actividad-historial.use-case';
import { ActividadHistorialController } from './infrastructure/http/controllers/actividad-historial.controller';
import { ACTIVIDAD_HISTORIAL_REPOSITORY } from './domain/ports/actividad-historial.repository.port';
import { ActividadHistorialOrmEntity } from './infrastructure/persistence/actividad-historial.orm-entity';
import { TypeOrmActividadHistorialRepository } from './infrastructure/persistence/actividad-historial-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadHistorialOrmEntity])],
  controllers: [ActividadHistorialController],
  providers: [
    CreateActividadHistorialUseCase,
    GetActividadHistorialUseCase,
    SaveActividadHistorialUseCase,
    DeleteActividadHistorialUseCase,
    {
      provide: ACTIVIDAD_HISTORIAL_REPOSITORY,
      useClass: TypeOrmActividadHistorialRepository,
    },
  ],
  exports: [ACTIVIDAD_HISTORIAL_REPOSITORY],
})
export class ActividadHistorialModule {}
