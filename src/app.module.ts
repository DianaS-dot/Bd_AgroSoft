import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CultivosModule } from './cultivos/cultivos.module';
import { LotesModule } from './lotes/lotes.module';
import { SublotesModule } from './sublotes/sublotes.module';
import { CultivoHistorialModule } from './cultivo-historial/cultivo-historial.module';

import { SensoresModule } from './modules/sensores/sensores.module';
import { SensorLecturasModule } from './modules/sensor-lecturas/sensor-lecturas.module';
import { SensorAlertasModule } from './modules/sensor-alertas/sensor-alertas.module';
import { TiposSensoresModule } from './modules/tipos-sensores/tipos-sensores.module';
import { IotGlobalConfigModule } from './modules/iot-global-config/iot-global-config.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'sena123',
      database: 'agrosoft',
      autoLoadEntities: true,
      synchronize: true,
    }),

    CultivosModule,
    LotesModule,
    SublotesModule,
    CultivoHistorialModule,

    SensoresModule,
    SensorLecturasModule,
    SensorAlertasModule,
    TiposSensoresModule,
    IotGlobalConfigModule,
  ],
})
export class AppModule {}
