import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SensorOrmEntity } from './infrastructure/database/sensor.orm-entity';
import { SensorController } from './infrastructure/controllers/sensor.controller';
import { SensorPostgresRepository } from './infrastructure/repositories/sensor-postgres.repository';

import { CrearSensorUseCase } from './application/use-cases/crear-sensor.use-case';
import { ObtenerSensoresUseCase } from './application/use-cases/obtener-sensores.use-case';
import { ObtenerSensorUseCase } from './application/use-cases/obtener-sensor.use-case';
import { ObtenerSensoresActivosUseCase } from './application/use-cases/obtener-sensores-activos.use-case';
import { ActualizarSensorUseCase } from './application/use-cases/actualizar-sensor.use-case';
import { EliminarSensorUseCase } from './application/use-cases/eliminar-sensor.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([SensorOrmEntity])],

  controllers: [SensorController],

  providers: [
    SensorPostgresRepository,

    {
      provide: CrearSensorUseCase,
      useFactory: (repository: SensorPostgresRepository) =>
        new CrearSensorUseCase(repository),
      inject: [SensorPostgresRepository],
    },

    {
      provide: ObtenerSensoresUseCase,
      useFactory: (repository: SensorPostgresRepository) =>
        new ObtenerSensoresUseCase(repository),
      inject: [SensorPostgresRepository],
    },

    {
      provide: ObtenerSensorUseCase,
      useFactory: (repository: SensorPostgresRepository) =>
        new ObtenerSensorUseCase(repository),
      inject: [SensorPostgresRepository],
    },

    {
      provide: ObtenerSensoresActivosUseCase,
      useFactory: (repository: SensorPostgresRepository) =>
        new ObtenerSensoresActivosUseCase(repository),
      inject: [SensorPostgresRepository],
    },

    {
      provide: ActualizarSensorUseCase,
      useFactory: (repository: SensorPostgresRepository) =>
        new ActualizarSensorUseCase(repository),
      inject: [SensorPostgresRepository],
    },

    {
      provide: EliminarSensorUseCase,
      useFactory: (repository: SensorPostgresRepository) =>
        new EliminarSensorUseCase(repository),
      inject: [SensorPostgresRepository],
    },
  ],
})
export class SensoresModule {}
