import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateActividadHerramientaUseCase } from './application/use-cases/create-actividad-herramienta.use-case';
import { GetActividadHerramientaUseCase } from './application/use-cases/get-actividad-herramienta.use-case';
import { SaveActividadHerramientaUseCase } from './application/use-cases/save-actividad-herramienta.use-case';
import { DeleteActividadHerramientaUseCase } from './application/use-cases/delete-actividad-herramienta.use-case';
import { ActividadesHerramientasController } from './infrastructure/http/controllers/actividades-herramientas.controller';
import { ACTIVIDAD_HERRAMIENTA_REPOSITORY } from './domain/ports/actividad-herramienta.repository.port';
import { ActividadHerramientaOrmEntity } from './infrastructure/persistence/actividad-herramienta.orm-entity';
import { TypeOrmActividadHerramientaRepository } from './infrastructure/persistence/actividad-herramienta-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadHerramientaOrmEntity])],
  controllers: [ActividadesHerramientasController],
  providers: [
    CreateActividadHerramientaUseCase,
    GetActividadHerramientaUseCase,
    SaveActividadHerramientaUseCase,
    DeleteActividadHerramientaUseCase,
    {
      provide: ACTIVIDAD_HERRAMIENTA_REPOSITORY,
      useClass: TypeOrmActividadHerramientaRepository,
    },
  ],
  exports: [ACTIVIDAD_HERRAMIENTA_REPOSITORY],
})
export class ActividadesHerramientasModule {}
