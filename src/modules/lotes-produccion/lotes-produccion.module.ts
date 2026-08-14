import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoteProduccionOrmEntity } from './infrastructure/persistence/lote-produccion.orm-entity';
import { LoteProduccionTypeOrmRepository } from './infrastructure/persistence/lote-produccion-typeorm.repository';
import { LOTE_PRODUCCION_REPOSITORY } from './domain/ports/lote-produccion.repository.port';
import { LoteProduccionController } from './infrastructure/http/controllers/lote-produccion.controller';
import { CrearLoteProduccionUseCase } from './application/use-cases/crear-lote-produccion.use-case';
import { ListarLotesProduccionUseCase } from './application/use-cases/listar-lotes-produccion.use-case';
import { ObtenerLoteProduccionUseCase } from './application/use-cases/obtener-lote-produccion.use-case';
import { ActualizarLoteProduccionUseCase } from './application/use-cases/actualizar-lote-produccion.use-case';
import { AjustarStockLoteUseCase } from './application/use-cases/ajustar-stock-lote.use-case';
import { EliminarLoteProduccionUseCase } from './application/use-cases/eliminar-lote-produccion.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([LoteProduccionOrmEntity])],
  controllers: [LoteProduccionController],
  providers: [
    {
      provide: LOTE_PRODUCCION_REPOSITORY,

      useClass: LoteProduccionTypeOrmRepository,
    },
    CrearLoteProduccionUseCase,
    ListarLotesProduccionUseCase,
    ObtenerLoteProduccionUseCase,
    ActualizarLoteProduccionUseCase,
    AjustarStockLoteUseCase,
    EliminarLoteProduccionUseCase,
  ],
  // AjustarStockLoteUseCase se exporta porque ventas_detalles y movimientos_produccion
  // lo necesitarán para descontar/reponer stock desde su propia lógica transaccional.
  exports: [LOTE_PRODUCCION_REPOSITORY, AjustarStockLoteUseCase],
})
export class LotesProduccionModule {}
