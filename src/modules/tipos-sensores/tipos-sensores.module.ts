import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TipoSensorOrmEntity } from './infrastructure/database/tipo-sensor.orm-entity';
import { TipoSensorController } from './infrastructure/controllers/tipo-sensor.controller';
import { TipoSensorPostgresRepository } from './infrastructure/repositories/tipo-sensor-postgres.repository';

import { CrearTipoSensorUseCase } from './application/use-cases/crear-tipo-sensor.use-case';
import { ObtenerTiposSensoresUseCase } from './application/use-cases/obtener-tipos-sensores.use-case';
import { ObtenerTipoSensorUseCase } from './application/use-cases/obtener-tipo-sensor.use-case';
import { ActualizarTipoSensorUseCase } from './application/use-cases/actualizar-tipo-sensor.use-case';
import { EliminarTipoSensorUseCase } from './application/use-cases/eliminar-tipo-sensor.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TipoSensorOrmEntity])],

  controllers: [TipoSensorController],

  providers: [
    TipoSensorPostgresRepository,

    {
      provide: CrearTipoSensorUseCase,
      useFactory: (repository: TipoSensorPostgresRepository) =>
        new CrearTipoSensorUseCase(repository),
      inject: [TipoSensorPostgresRepository],
    },

    {
      provide: ObtenerTiposSensoresUseCase,
      useFactory: (repository: TipoSensorPostgresRepository) =>
        new ObtenerTiposSensoresUseCase(repository),
      inject: [TipoSensorPostgresRepository],
    },

    {
      provide: ObtenerTipoSensorUseCase,
      useFactory: (repository: TipoSensorPostgresRepository) =>
        new ObtenerTipoSensorUseCase(repository),
      inject: [TipoSensorPostgresRepository],
    },

    {
      provide: ActualizarTipoSensorUseCase,
      useFactory: (repository: TipoSensorPostgresRepository) =>
        new ActualizarTipoSensorUseCase(repository),
      inject: [TipoSensorPostgresRepository],
    },

    {
      provide: EliminarTipoSensorUseCase,
      useFactory: (repository: TipoSensorPostgresRepository) =>
        new EliminarTipoSensorUseCase(repository),
      inject: [TipoSensorPostgresRepository],
    },
  ],
})
export class TiposSensoresModule {}
