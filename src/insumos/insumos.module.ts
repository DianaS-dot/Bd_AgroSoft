import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsumoOrmEntity } from './infrastructure/persistence/insumo.orm-entity';
import { InsumoTypeOrmRepository } from './infrastructure/persistence/insumo-typeorm.repository';
import { INSUMO_REPOSITORY } from './domain/ports/insumo-repository.port';
import { CreateInsumoUseCase } from './application/use-cases/create-insumo.use-case';
import { GetInsumoUseCase } from './application/use-cases/get-insumo.use-case';
import { InsumoController } from './infrastructure/http/controllers/insumo.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([InsumoOrmEntity])
  ],
  controllers: [InsumoController],
  providers: [
    CreateInsumoUseCase,
    GetInsumoUseCase,
    {
      provide: INSUMO_REPOSITORY,
      useClass: InsumoTypeOrmRepository,
    },
  ],
  exports: [CreateInsumoUseCase, GetInsumoUseCase],
})
export class InsumosModule {}
