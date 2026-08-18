import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SensorAlertaOrmEntity } from './infrastructure/database/sensor-alerta.orm-entity';
import { SensorAlertaController } from './infrastructure/controllers/sensor-alerta.controller';
import { SensorAlertaPostgresRepository } from './infrastructure/repositories/sensor-alerta-postgres.repository';

import { CrearSensorAlertaUseCase } from './application/use-cases/crear-sensor-alerta.use-case';
import { ObtenerSensorAlertasUseCase } from './application/use-cases/obtener-sensor-alertas.use-case';
import { ObtenerSensorAlertaUseCase } from './application/use-cases/obtener-sensor-alerta.use-case';
import { ObtenerAlertasPorSensorUseCase } from './application/use-cases/obtener-alertas-por-sensor.use-case';
import { EliminarSensorAlertaUseCase } from './application/use-cases/eliminar-sensor-alerta.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([SensorAlertaOrmEntity]),
  ],

  controllers: [
    SensorAlertaController,
  ],

  providers: [
    SensorAlertaPostgresRepository,

    {
      provide: CrearSensorAlertaUseCase,
      useFactory: (repository: SensorAlertaPostgresRepository) =>
        new CrearSensorAlertaUseCase(repository),
      inject: [SensorAlertaPostgresRepository],
    },

    {
      provide: ObtenerSensorAlertasUseCase,
      useFactory: (repository: SensorAlertaPostgresRepository) =>
        new ObtenerSensorAlertasUseCase(repository),
      inject: [SensorAlertaPostgresRepository],
    },

    {
      provide: ObtenerSensorAlertaUseCase,
      useFactory: (repository: SensorAlertaPostgresRepository) =>
        new ObtenerSensorAlertaUseCase(repository),
      inject: [SensorAlertaPostgresRepository],
    },

    {
      provide: ObtenerAlertasPorSensorUseCase,
      useFactory: (repository: SensorAlertaPostgresRepository) =>
        new ObtenerAlertasPorSensorUseCase(repository),
      inject: [SensorAlertaPostgresRepository],
    },

    {
      provide: EliminarSensorAlertaUseCase,
      useFactory: (repository: SensorAlertaPostgresRepository) =>
        new EliminarSensorAlertaUseCase(repository),
      inject: [SensorAlertaPostgresRepository],
    },
  ],
})
export class SensorAlertasModule {}
