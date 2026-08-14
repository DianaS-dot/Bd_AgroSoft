import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CultivoOrmEntity } from './infrastructure/database/cultivo.orm-entity';
import { CultivoController } from './infrastructure/controllers/cultivo.controller';
import { CultivoPostgresRepository } from './infrastructure/repositories/cultivo-postgres.repository';

import { CrearCultivoUseCase } from './application/use-cases/crear-cultivo.use-case';
import { ObtenerCultivosUseCase } from './application/use-cases/obtener-cultivos.use-case';
import { ObtenerCultivoUseCase } from './application/use-cases/obtener-cultivo.use-case';
import { ActualizarCultivoUseCase } from './application/use-cases/actualizar-cultivo.use-case';
import { EliminarCultivoUseCase } from './application/use-cases/eliminar-cultivo.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([CultivoOrmEntity]),
  ],

  controllers: [
    CultivoController,
  ],

  providers: [
    CultivoPostgresRepository,

    {
      provide: CrearCultivoUseCase,
      useFactory: (repository: CultivoPostgresRepository) =>
        new CrearCultivoUseCase(repository),
      inject: [CultivoPostgresRepository],
    },

    {
      provide: ObtenerCultivosUseCase,
      useFactory: (repository: CultivoPostgresRepository) =>
        new ObtenerCultivosUseCase(repository),
      inject: [CultivoPostgresRepository],
    },

    {
      provide: ObtenerCultivoUseCase,
      useFactory: (repository: CultivoPostgresRepository) =>
        new ObtenerCultivoUseCase(repository),
      inject: [CultivoPostgresRepository],
    },

    {
      provide: ActualizarCultivoUseCase,
      useFactory: (repository: CultivoPostgresRepository) =>
        new ActualizarCultivoUseCase(repository),
      inject: [CultivoPostgresRepository],
    },

    {
      provide: EliminarCultivoUseCase,
      useFactory: (repository: CultivoPostgresRepository) =>
        new EliminarCultivoUseCase(repository),
      inject: [CultivoPostgresRepository],
    },
  ],
})
export class CultivosModule {}


// aqui nestjs aprende que calses debe de crear y como conctarlas, cuando llega una peticion nestjs ya sabe que objeto entregar al controlador gracias a los privers