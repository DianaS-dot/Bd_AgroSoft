import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentaOrmEntity } from './infrastructure/persistence/venta.orm-entity';
import { VentaTypeOrmRepository } from './infrastructure/persistence/venta-typeorm.repository';
import { VENTA_REPOSITORY } from './domain/ports/venta.repository.port';
import { VentaController } from './infrastructure/http/venta.controller';
import { CrearVentaUseCase } from './application/use-cases/crear-venta.use-case';
import { ListarVentasUseCase } from './application/use-cases/listar-ventas.use-case';
import { ObtenerVentaUseCase } from './application/use-cases/obtener-venta.use-case';
import { AnularVentaUseCase } from './application/use-cases/anular-venta.use-case';
import { ActualizarTotalesVentaUseCase } from './application/use-cases/actualizar-totales-venta.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([VentaOrmEntity])],
  controllers: [VentaController],
  providers: [
    { provide: VENTA_REPOSITORY, useClass: VentaTypeOrmRepository },
    CrearVentaUseCase,
    ListarVentasUseCase,
    ObtenerVentaUseCase,
    AnularVentaUseCase,
    ActualizarTotalesVentaUseCase,
  ],
  // ActualizarTotalesVentaUseCase se exporta porque ventas_detalles lo necesitará
  // para recalcular subtotal/impuestos/descuento/total cada vez que cambien las líneas.
  exports: [VENTA_REPOSITORY, ActualizarTotalesVentaUseCase],
})
export class VentasModule {}