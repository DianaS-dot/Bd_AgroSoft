import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateActividadResponsableUseCase } from './application/use-cases/create-actividad-responsable.use-case';
import { GetActividadResponsableUseCase } from './application/use-cases/get-actividad-responsable.use-case';
import { SaveActividadResponsableUseCase } from './application/use-cases/save-actividad-responsable.use-case';
import { DeleteActividadResponsableUseCase } from './application/use-cases/delete-actividad-responsable.use-case';
import { ActividadesResponsablesController } from './infrastructure/http/controllers/actividades-responsables.controller';
import { ACTIVIDAD_RESPONSABLE_REPOSITORY } from './domain/ports/actividad-responsable.repository.port';
import { ActividadResponsableOrmEntity } from './infrastructure/persistence/actividad-responsable.orm-entity';
import { TypeOrmActividadResponsableRepository } from './infrastructure/persistence/actividad-responsable-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadResponsableOrmEntity])],
  controllers: [ActividadesResponsablesController],
  providers: [
    CreateActividadResponsableUseCase,
    GetActividadResponsableUseCase,
    SaveActividadResponsableUseCase,
    DeleteActividadResponsableUseCase,
    {
      provide: ACTIVIDAD_RESPONSABLE_REPOSITORY,
      useClass: TypeOrmActividadResponsableRepository,
    },
  ],
  exports: [ACTIVIDAD_RESPONSABLE_REPOSITORY],
})
export class ActividadesResponsablesModule {}
