import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadInsumoReservaOrmEntity } from './infrastructure/persistence/actividad-insumo-reserva.orm-entity';
import { ActividadInsumoReservaTypeOrmRepository } from './infrastructure/persistence/actividad-insumo-reserva-typeorm.repository';
import { ACTIVIDAD_INSUMO_RESERVA_REPOSITORY } from './domain/ports/actividad-insumo-reserva-repository.port';
import { CreateActividadInsumoReservaUseCase } from './application/use-cases/create-actividad-insumo-reserva.use-case';
import { GetActividadInsumoReservaUseCase } from './application/use-cases/get-actividad-insumo-reserva.use-case';
import { ActividadInsumoReservaController } from './infrastructure/http/controllers/actividad-insumo-reserva.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActividadInsumoReservaOrmEntity])
  ],
  controllers: [ActividadInsumoReservaController],
  providers: [
    CreateActividadInsumoReservaUseCase,
    GetActividadInsumoReservaUseCase,
    {
      provide: ACTIVIDAD_INSUMO_RESERVA_REPOSITORY,
      useClass: ActividadInsumoReservaTypeOrmRepository,
    },
  ],
  exports: [CreateActividadInsumoReservaUseCase, GetActividadInsumoReservaUseCase],
})
export class ActividadesInsumosReservaModule {}
