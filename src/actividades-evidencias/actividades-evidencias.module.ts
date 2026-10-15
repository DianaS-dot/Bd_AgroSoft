import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateActividadEvidenciaUseCase } from './application/use-cases/create-actividad-evidencia.use-case';
import { GetActividadEvidenciaUseCase } from './application/use-cases/get-actividad-evidencia.use-case';
import { SaveActividadEvidenciaUseCase } from './application/use-cases/save-actividad-evidencia.use-case';
import { DeleteActividadEvidenciaUseCase } from './application/use-cases/delete-actividad-evidencia.use-case';
import { ActividadesEvidenciasController } from './infrastructure/http/controllers/actividades-evidencias.controller';
import { ACTIVIDAD_EVIDENCIA_REPOSITORY } from './domain/ports/actividad-evidencia.repository.port';
import { ActividadEvidenciaOrmEntity } from './infrastructure/persistence/actividad-evidencia.orm-entity';
import { TypeOrmActividadEvidenciaRepository } from './infrastructure/persistence/actividad-evidencia-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadEvidenciaOrmEntity])],
  controllers: [ActividadesEvidenciasController],
  providers: [
    CreateActividadEvidenciaUseCase,
    GetActividadEvidenciaUseCase,
    SaveActividadEvidenciaUseCase,
    DeleteActividadEvidenciaUseCase,
    {
      provide: ACTIVIDAD_EVIDENCIA_REPOSITORY,
      useClass: TypeOrmActividadEvidenciaRepository,
    },
  ],
  exports: [ACTIVIDAD_EVIDENCIA_REPOSITORY],
})
export class ActividadesEvidenciasModule {}
