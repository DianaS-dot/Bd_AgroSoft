import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SensorLecturaOrmEntity } from './infrastructure/database/sensor-lectura.orm-entity';
import { SensorLecturaController } from './infrastructure/controllers/sensor-lectura.controller';
import { SensorLecturaPostgresRepository } from './infrastructure/repositories/sensor-lectura-postgres.repository';

import { RegistrarLecturaUseCase } from './application/use-cases/registrar-lectura.use-case';
import { ObtenerSensorLecturasUseCase } from './application/use-cases/obtener-sensor-lecturas.use-case';
import { ObtenerSensorLecturaUseCase } from './application/use-cases/obtener-sensor-lectura.use-case';
import { ObtenerLecturasPorSensorUseCase } from './application/use-cases/obtener-lecturas-por-sensor.use-case';
import { ObtenerLecturasPorRangoFechasUseCase } from './application/use-cases/obtener-lecturas-por-rango-fechas.use-case';
import { ActualizarSensorLecturaUseCase } from './application/use-cases/actualizar-sensor-lectura.use-case';
import { EliminarSensorLecturaUseCase } from './application/use-cases/eliminar-sensor-lectura.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([SensorLecturaOrmEntity])],

  controllers: [SensorLecturaController],

  providers: [
    SensorLecturaPostgresRepository,

    {
      provide: RegistrarLecturaUseCase,
      useFactory: (repository: SensorLecturaPostgresRepository) =>
        new RegistrarLecturaUseCase(repository),
      inject: [SensorLecturaPostgresRepository],
    },

    {
      provide: ObtenerSensorLecturasUseCase,
      useFactory: (repository: SensorLecturaPostgresRepository) =>
        new ObtenerSensorLecturasUseCase(repository),
      inject: [SensorLecturaPostgresRepository],
    },

    {
      provide: ObtenerSensorLecturaUseCase,
      useFactory: (repository: SensorLecturaPostgresRepository) =>
        new ObtenerSensorLecturaUseCase(repository),
      inject: [SensorLecturaPostgresRepository],
    },

    {
      provide: ObtenerLecturasPorSensorUseCase,
      useFactory: (repository: SensorLecturaPostgresRepository) =>
        new ObtenerLecturasPorSensorUseCase(repository),
      inject: [SensorLecturaPostgresRepository],
    },

    {
      provide: ObtenerLecturasPorRangoFechasUseCase,
      useFactory: (repository: SensorLecturaPostgresRepository) =>
        new ObtenerLecturasPorRangoFechasUseCase(repository),
      inject: [SensorLecturaPostgresRepository],
    },

    {
      provide: ActualizarSensorLecturaUseCase,
      useFactory: (repository: SensorLecturaPostgresRepository) =>
        new ActualizarSensorLecturaUseCase(repository),
      inject: [SensorLecturaPostgresRepository],
    },

    {
      provide: EliminarSensorLecturaUseCase,
      useFactory: (repository: SensorLecturaPostgresRepository) =>
        new EliminarSensorLecturaUseCase(repository),
      inject: [SensorLecturaPostgresRepository],
    },
  ],
})
export class SensorLecturasModule {}
