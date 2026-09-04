import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubloteOrmEntity } from './infrastructure/database/sublote.orm-entity';

import { SubloteController } from './infrastructure/controllers/sublote.controller';

import { SublotePostgresRepository } from './infrastructure/repositories/sublote-postgres.repository';

import { CrearSubloteUseCase } from './application/use-cases/crear-sublote.use-case';
import { ObtenerSublotesUseCase } from './application/use-cases/obtener-sublotes.use-case';
import { ObtenerSubloteUseCase } from './application/use-cases/obtener-sublote.use-case';
import { ActualizarSubloteUseCase } from './application/use-cases/actualizar-sublote.use-case';
import { EliminarSubloteUseCase } from './application/use-cases/eliminar-sublote.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([SubloteOrmEntity])],

  controllers: [SubloteController],

  providers: [
    SublotePostgresRepository,

    {
      provide: CrearSubloteUseCase,
      useFactory: (repository: SublotePostgresRepository) =>
        new CrearSubloteUseCase(repository),
      inject: [SublotePostgresRepository],
    },

    {
      provide: ObtenerSublotesUseCase,
      useFactory: (repository: SublotePostgresRepository) =>
        new ObtenerSublotesUseCase(repository),
      inject: [SublotePostgresRepository],
    },

    {
      provide: ObtenerSubloteUseCase,
      useFactory: (repository: SublotePostgresRepository) =>
        new ObtenerSubloteUseCase(repository),
      inject: [SublotePostgresRepository],
    },

    {
      provide: ActualizarSubloteUseCase,
      useFactory: (repository: SublotePostgresRepository) =>
        new ActualizarSubloteUseCase(repository),
      inject: [SublotePostgresRepository],
    },

    {
      provide: EliminarSubloteUseCase,
      useFactory: (repository: SublotePostgresRepository) =>
        new EliminarSubloteUseCase(repository),
      inject: [SublotePostgresRepository],
    },
  ],
})
export class SublotesModule {}
