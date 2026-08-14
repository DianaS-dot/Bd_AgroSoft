import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientoProduccionOrmEntity } from './infrastructure/persistence/movimiento-produccion.orm-entity';
import { MovimientoProduccionTypeOrmRepository } from './infrastructure/persistence/movimiento-produccion-typeorm.repository';
import { MOVIMIENTO_PRODUCCION_REPOSITORY } from './domain/ports/movimiento-produccion.repository.port';
import { MovimientoProduccionController } from './infrastructure/http/controllers/movimiento-produccion.controller';
import { RegistrarMovimientoUseCase } from './application/use-cases/registrar-movimiento.use-case';
import { CrearAjusteManualUseCase } from './application/use-cases/crear-ajuste-manual.use-case';
import { ListarMovimientosUseCase } from './application/use-cases/listar-movimientos.use-case';
import { LotesProduccionModule } from '../lotes-produccion/lotes-produccion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovimientoProduccionOrmEntity]),
    LotesProduccionModule,
  ],
  controllers: [MovimientoProduccionController],
  providers: [
    {
      provide: MOVIMIENTO_PRODUCCION_REPOSITORY,

      useClass: MovimientoProduccionTypeOrmRepository,
    },
    RegistrarMovimientoUseCase,
    CrearAjusteManualUseCase,
    ListarMovimientosUseCase,
  ],
  // RegistrarMovimientoUseCase se exporta porque ventas_detalles y ventas lo
  // invocarán para registrar SALIDA_VENTA / ENTRADA_ANULACION en su propia transacción.
  exports: [MOVIMIENTO_PRODUCCION_REPOSITORY, RegistrarMovimientoUseCase],
})
export class MovimientosProduccionModule {}
