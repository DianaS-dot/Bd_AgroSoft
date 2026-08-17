import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProveedorOrmEntity } from './infrastructure/persistence/proveedor.orm-entity';
import { ProveedorTypeOrmRepository } from './infrastructure/persistence/proveedor-typeorm.repository';
import { PROVEEDOR_REPOSITORY } from './domain/ports/proveedor-repository.port';
import { CreateProveedorUseCase } from './application/use-cases/create-proveedor.use-case';
import { GetProveedorUseCase } from './application/use-cases/get-proveedor.use-case';
import { ProveedorController } from './infrastructure/http/controllers/proveedor.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProveedorOrmEntity])
  ],
  controllers: [ProveedorController],
  providers: [
    CreateProveedorUseCase,
    GetProveedorUseCase,
    {
      provide: PROVEEDOR_REPOSITORY,
      useClass: ProveedorTypeOrmRepository,
    },
  ],
  exports: [CreateProveedorUseCase, GetProveedorUseCase],
})
export class ProveedoresModule {}
