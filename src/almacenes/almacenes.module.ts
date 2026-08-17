import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlmacenOrmEntity } from './infrastructure/persistence/almacen.orm-entity';
import { AlmacenTypeOrmRepository } from './infrastructure/persistence/almacen-typeorm.repository';
import { ALMACEN_REPOSITORY } from './domain/ports/almacen-repository.port';
import { CreateAlmacenUseCase } from './application/use-cases/create-almacen.use-case';
import { GetAlmacenUseCase } from './application/use-cases/get-almacen.use-case';
import { AlmacenController } from './infrastructure/http/controllers/almacen.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlmacenOrmEntity])
  ],
  controllers: [AlmacenController],
  providers: [
    CreateAlmacenUseCase,
    GetAlmacenUseCase,
    {
      provide: ALMACEN_REPOSITORY,
      useClass: AlmacenTypeOrmRepository,
    },
  ],
  exports: [CreateAlmacenUseCase, GetAlmacenUseCase],
})
export class AlmacenesModule {}
