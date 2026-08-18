import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IotGlobalConfigOrmEntity } from './infrastructure/database/iot-global-config.orm-entity';
import { IotGlobalConfigController } from './infrastructure/controllers/iot-global-config.controller';
import { IotGlobalConfigPostgresRepository } from './infrastructure/repositories/iot-global-config-postgres.repository';

import { CrearIotGlobalConfigUseCase } from './application/use-cases/crear-iot-global-config.use-case';
import { ObtenerIotGlobalConfigsUseCase } from './application/use-cases/obtener-iot-global-configs.use-case';
import { ObtenerIotGlobalConfigUseCase } from './application/use-cases/obtener-iot-global-config.use-case';
import { ObtenerConfigActivaUseCase } from './application/use-cases/obtener-config-activa.use-case';
import { ActualizarIotGlobalConfigUseCase } from './application/use-cases/actualizar-iot-global-config.use-case';
import { EliminarIotGlobalConfigUseCase } from './application/use-cases/eliminar-iot-global-config.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([IotGlobalConfigOrmEntity]),
  ],

  controllers: [
    IotGlobalConfigController,
  ],

  providers: [
    IotGlobalConfigPostgresRepository,

    {
      provide: CrearIotGlobalConfigUseCase,
      useFactory: (repository: IotGlobalConfigPostgresRepository) =>
        new CrearIotGlobalConfigUseCase(repository),
      inject: [IotGlobalConfigPostgresRepository],
    },

    {
      provide: ObtenerIotGlobalConfigsUseCase,
      useFactory: (repository: IotGlobalConfigPostgresRepository) =>
        new ObtenerIotGlobalConfigsUseCase(repository),
      inject: [IotGlobalConfigPostgresRepository],
    },

    {
      provide: ObtenerIotGlobalConfigUseCase,
      useFactory: (repository: IotGlobalConfigPostgresRepository) =>
        new ObtenerIotGlobalConfigUseCase(repository),
      inject: [IotGlobalConfigPostgresRepository],
    },

    {
      provide: ObtenerConfigActivaUseCase,
      useFactory: (repository: IotGlobalConfigPostgresRepository) =>
        new ObtenerConfigActivaUseCase(repository),
      inject: [IotGlobalConfigPostgresRepository],
    },

    {
      provide: ActualizarIotGlobalConfigUseCase,
      useFactory: (repository: IotGlobalConfigPostgresRepository) =>
        new ActualizarIotGlobalConfigUseCase(repository),
      inject: [IotGlobalConfigPostgresRepository],
    },

    {
      provide: EliminarIotGlobalConfigUseCase,
      useFactory: (repository: IotGlobalConfigPostgresRepository) =>
        new EliminarIotGlobalConfigUseCase(repository),
      inject: [IotGlobalConfigPostgresRepository],
    },
  ],
})
export class IotGlobalConfigModule {}
