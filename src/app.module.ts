import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './modules/clientes/clientes.module';
import { FacturasModule } from './modules/facturas/facturas.module';
import { ProductosAgroModule } from './modules/productos-agro/productos-agro.module';
import { LotesProduccionModule } from './modules/lotes-produccion/lotes-produccion.module';
import { VentasModule } from './modules/ventas/ventas.module';
import { VentasDetallesModule } from './modules/ventas-detalles/ventas-detalles.module';
import { SharedModule } from './shared/shared.module';
import { PagosModule } from './modules/pagos/pagos.module';
import { MovimientosProduccionModule } from './modules/movimientos_produccion/movimientos-produccion.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // SOLO en desarrollo, nunca en producción
      }),
    }),
    ClientesModule,
    FacturasModule,
    ProductosAgroModule,
    LotesProduccionModule,
    VentasModule,
    VentasDetallesModule,
    SharedModule,
    PagosModule,
    MovimientosProduccionModule,

  ],
})
export class AppModule {}