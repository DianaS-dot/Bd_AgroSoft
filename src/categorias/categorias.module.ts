import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaOrmEntity } from './infrastructure/persistence/categoria.orm-entity';
import { CategoriaTypeOrmRepository } from './infrastructure/persistence/categoria-typeorm.repository';
import { CATEGORIA_REPOSITORY } from './domain/ports/categoria-repository.port';
import { CreateCategoriaUseCase } from './application/use-cases/create-categoria.use-case';
import { GetCategoriaUseCase } from './application/use-cases/get-categoria.use-case';
import { CategoriaController } from './infrastructure/http/controllers/categoria.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoriaOrmEntity])
  ],
  controllers: [CategoriaController],
  providers: [
    CreateCategoriaUseCase,
    GetCategoriaUseCase,
    {
      provide: CATEGORIA_REPOSITORY,
      useClass: CategoriaTypeOrmRepository,
    },
  ],
  exports: [CreateCategoriaUseCase, GetCategoriaUseCase],
})
export class CategoriasModule {}
