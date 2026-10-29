import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpaModule } from './epa/epa.module';
import { AdministracionModule } from './administracion/administracion.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123456',
        database: 'epa_admin_db',
        entities: [__dirname + '/**/*.orm-entity{.ts,.js}'],
        synchronize: true, // true solo en desarrollo
      }),
    }),
    EpaModule,
    AdministracionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

