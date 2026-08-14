import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoAgroOrmEntity } from './infrastructure/persistence/producto-agro.orm-entity';
import { ProductoAgroTypeOrmRepository } from './infrastructure/persistence/producto-agro-typeorm.repository';
import { PRODUCTO_AGRO_REPOSITORY } from './domain/ports/producto-agro.repository.port';
import { ProductoAgroController } from './infrastructure/http/controllers/producto-agro.controller';
import { CrearProductoAgroUseCase } from './application/use-cases/crear-producto-agro.use-case';
import { ListarProductosAgroUseCase } from './application/use-cases/listar-productos-agro.use-case';
import { ObtenerProductoAgroUseCase } from './application/use-cases/obtener-producto-agro.use-case';
import { ActualizarProductoAgroUseCase } from './application/use-cases/actualizar-producto-agro.use-case';
import { EliminarProductoAgroUseCase } from './application/use-cases/eliminar-producto-agro.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoAgroOrmEntity])],
  controllers: [ProductoAgroController],
  providers: [
    {
      provide: PRODUCTO_AGRO_REPOSITORY,
      useClass: ProductoAgroTypeOrmRepository,
    },
    CrearProductoAgroUseCase,
    ListarProductosAgroUseCase,
    ObtenerProductoAgroUseCase,
    ActualizarProductoAgroUseCase,
    EliminarProductoAgroUseCase,
  ],
  exports: [PRODUCTO_AGRO_REPOSITORY],
})
export class ProductosAgroModule {}
