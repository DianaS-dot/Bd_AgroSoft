import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsumosModule } from './insumos/insumos.module';
import { AlmacenesModule } from './almacenes/almacenes.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ReservaModule } from './reserva/reserva.module';
import { MovimientosInsumosModule } from './movimientos_insumos/movimientos_insumos.module';
import { ActividadesInsumosReservaModule } from './actividades_insumos_reserva/actividades_insumos_reserva.module';
import { ActividadesInsumosUsoModule } from './actividades_insumos_uso/actividades_insumos_uso.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 1. Configuración de variables de entorno (.env)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // 2. Configuración global de TypeORM para PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT!, 10),
      username: process.env.DB_USERNAME!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,

      // Registro automático de entidades de todos los módulos [2]
      autoLoadEntities: true,

      // Sincronización automática (Solo para desarrollo) [1, 2]
      // Desactivado temporalmente por conflictos con tablas existentes
      synchronize: false,
    }),

    // 3. Importación de módulos específicos
    AuthModule,
    InsumosModule,
    AlmacenesModule,
    CategoriasModule,
    ProveedoresModule,
    ReservaModule,
    MovimientosInsumosModule,
    ActividadesInsumosReservaModule,
    ActividadesInsumosUsoModule,
  ],
})
export class AppModule {}
