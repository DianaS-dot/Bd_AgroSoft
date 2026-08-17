import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadInsumoUsoOrmEntity } from './infrastructure/persistence/actividad-insumo-uso.orm-entity';
import { ActividadInsumoUsoTypeOrmRepository } from './infrastructure/persistence/actividad-insumo-uso-typeorm.repository';
import { ACTIVIDAD_INSUMO_USO_REPOSITORY } from './domain/ports/actividad-insumo-uso-repository.port';
import { CreateActividadInsumoUsoUseCase } from './application/use-cases/create-actividad-insumo-uso.use-case';
import { GetActividadInsumoUsoUseCase } from './application/use-cases/get-actividad-insumo-uso.use-case';
import { ActividadInsumoUsoController } from './infrastructure/http/controllers/actividad-insumo-uso.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActividadInsumoUsoOrmEntity])
  ],
  controllers: [ActividadInsumoUsoController],
  providers: [
    CreateActividadInsumoUsoUseCase,
    GetActividadInsumoUsoUseCase,
    {
      provide: ACTIVIDAD_INSUMO_USO_REPOSITORY,
      useClass: ActividadInsumoUsoTypeOrmRepository,
    },
  ],
  exports: [CreateActividadInsumoUsoUseCase, GetActividadInsumoUsoUseCase],
})
export class ActividadesInsumosUsoModule {}
