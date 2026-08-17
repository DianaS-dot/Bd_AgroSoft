import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientoInsumoOrmEntity } from './infrastructure/persistence/movimiento-insumo.orm-entity';
import { MovimientoInsumoTypeOrmRepository } from './infrastructure/persistence/movimiento-insumo-typeorm.repository';
import { MOVIMIENTO_INSUMO_REPOSITORY } from './domain/ports/movimiento-insumo-repository.port';
import { CreateMovimientoInsumoUseCase } from './application/use-cases/create-movimiento-insumo.use-case';
import { GetMovimientoInsumoUseCase } from './application/use-cases/get-movimiento-insumo.use-case';
import { MovimientoInsumoController } from './infrastructure/http/controllers/movimiento-insumo.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovimientoInsumoOrmEntity])
  ],
  controllers: [MovimientoInsumoController],
  providers: [
    CreateMovimientoInsumoUseCase,
    GetMovimientoInsumoUseCase,
    {
      provide: MOVIMIENTO_INSUMO_REPOSITORY,
      useClass: MovimientoInsumoTypeOrmRepository,
    },
  ],
  exports: [CreateMovimientoInsumoUseCase, GetMovimientoInsumoUseCase],
})
export class MovimientosInsumosModule {}
