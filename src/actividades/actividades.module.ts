import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateActividadUseCase } from './application/use-cases/create-actividad.use-case';
import { DeleteActividadUseCase } from './application/use-cases/delete-actividad.use-case';
import { FindActividadByIdUseCase } from './application/use-cases/find-actividad-by-id.use-case';
import { FindAllActividadesUseCase } from './application/use-cases/find-all-actividades.use-case';
import { UpdateActividadUseCase } from './application/use-cases/update-actividad.use-case';
import { ActividadesController } from './actividades.controller';
import { ActividadesService } from './actividades.service';
import { ACTIVIDAD_REPOSITORY } from './domain/ports/actividad.repository.port';
import { Actividad } from './entities/actividad.entity';
import { TypeOrmActividadRepository } from './infrastructure/persistence/typeorm-actividad.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Actividad])],
  controllers: [ActividadesController],
  providers: [
    ActividadesService,
    CreateActividadUseCase,
    FindAllActividadesUseCase,
    FindActividadByIdUseCase,
    UpdateActividadUseCase,
    DeleteActividadUseCase,
    {
      provide: ACTIVIDAD_REPOSITORY,
      useClass: TypeOrmActividadRepository,
    },
  ],
  exports: [ActividadesService],
})
export class ActividadesModule {}
