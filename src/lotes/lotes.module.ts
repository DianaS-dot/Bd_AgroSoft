import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoteOrmEntity } from './infrastructure/database/lote.orm-entity';

import { LoteController } from './infrastructure/controllers/lote.controller';

import { LotePostgresRepository } from './infrastructure/repositories/lote-postgres.repository';

import { CrearLoteUseCase } from './application/use-cases/crear-lote.use-case';
import { ObtenerLotesUseCase } from './application/use-cases/obtener-lotes.use-case';
import { ObtenerLoteUseCase } from './application/use-cases/obtener-lote.use-case';
import { ActualizarLoteUseCase } from './application/use-cases/actualizar-lote.use-case';
import { EliminarLoteUseCase } from './application/use-cases/eliminar-lote.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([LoteOrmEntity])],

  controllers: [LoteController],

  providers: [
    LotePostgresRepository,

    {
      provide: CrearLoteUseCase,
      useFactory: (repository: LotePostgresRepository) =>
        new CrearLoteUseCase(repository),

      inject: [LotePostgresRepository],
    },

    {
      provide: ObtenerLotesUseCase,
      useFactory: (repository: LotePostgresRepository) =>
        new ObtenerLotesUseCase(repository),

      inject: [LotePostgresRepository],
    },

    {
      provide: ObtenerLoteUseCase,
      useFactory: (repository: LotePostgresRepository) =>
        new ObtenerLoteUseCase(repository),

      inject: [LotePostgresRepository],
    },

    {
      provide: ActualizarLoteUseCase,
      useFactory: (repository: LotePostgresRepository) =>
        new ActualizarLoteUseCase(repository),

      inject: [LotePostgresRepository],
    },

    {
      provide: EliminarLoteUseCase,
      useFactory: (repository: LotePostgresRepository) =>
        new EliminarLoteUseCase(repository),

      inject: [LotePostgresRepository],
    },
  ],
})
export class LotesModule {}
