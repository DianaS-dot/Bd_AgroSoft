import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadEjecutadaModule } from './actividad_ejecutada/actividad_ejecutada.module';
import { AdministradorModule } from './administrador/administrador.module';
import { CultivoBaseModule } from './cultivo_base/cultivo_base.module';
import { CultivoRealModule } from './cultivo_real/cultivo_real.module';
import { EvidenciaModule } from './evidencia/evidencia.module';
import { TratamientoModule } from './tratamiento/tratamiento.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ActividadEjecutadaModule,
    AdministradorModule,
    CultivoBaseModule,
    CultivoRealModule,
    EvidenciaModule,
    TratamientoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
