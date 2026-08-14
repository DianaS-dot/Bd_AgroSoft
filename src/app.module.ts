import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadHistorialModule } from './actividad_historial/actividad_historial.module';
import { ActividadEjecutadaModule } from './actividad_ejecutada/actividad_ejecutada.module';
import { ActividadesModule } from './actividades/actividades.module';
import { ActividadesEvidenciasModule } from './actividades_evidencias/actividades_evidencias.module';
import { ActividadesHerramientasModule } from './actividades_herramientas/actividades_herramientas.module';
import { ActividadesResponsablesModule } from './actividades_responsables/actividades_responsables.module';
import { ActividadesServiciosModule } from './actividades_servicios/actividades_servicios.module';
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
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
    }),
    ActividadEjecutadaModule,
    ActividadesModule,
    ActividadesResponsablesModule,
    ActividadesEvidenciasModule,
    ActividadesServiciosModule,
    ActividadesHerramientasModule,
    ActividadHistorialModule,
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

