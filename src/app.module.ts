import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CultivosModule } from './cultivos/cultivos.module';
import { LotesModule } from './lotes/lotes.module';
import { SublotesModule } from './sublotes/sublotes.module';
import { CultivoHistorialModule } from './cultivo-historial/cultivo-historial.module';

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
  ],
})
export class AppModule {}