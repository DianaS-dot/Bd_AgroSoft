import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentaDetalleOrmEntity } from './infrastructure/persistence/venta-detalle.orm-entity';
import { VentaDetalleTypeOrmRepository } from './infrastructure/persistence/venta-detalle-typeorm.repository';
import { VENTA_DETALLE_REPOSITORY } from './domain/ports/venta-detalle.repository.port';
import { VentaDetalleController } from './infrastructure/http/venta-detalle.controller';
import { CrearVentaDetalleUseCase } from './application/use-cases/crear-venta-detalle.use-case';
import { ListarDetallesVentaUseCase } from './application/use-cases/listar-detalles-venta.use-case';
import { EliminarVentaDetalleUseCase } from './application/use-cases/eliminar-venta-detalle.use-case';
import { AnularVentaCompletaUseCase } from './application/use-cases/anular-venta-completa.use-case';
import { VentasModule } from '../ventas/ventas.module';
import { LotesProduccionModule } from '../lotes-produccion/lotes-produccion.module';
import { MovimientosProduccionModule } from '../movimientos_produccion/movimientos-produccion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VentaDetalleOrmEntity]),
    VentasModule, // provee VENTA_REPOSITORY y ActualizarTotalesVentaUseCase
    LotesProduccionModule, // provee LOTE_PRODUCCION_REPOSITORY
    MovimientosProduccionModule,
  ],
  controllers: [VentaDetalleController],
  providers: [
    { provide: VENTA_DETALLE_REPOSITORY, useClass: VentaDetalleTypeOrmRepository },
    CrearVentaDetalleUseCase,
    ListarDetallesVentaUseCase,
    EliminarVentaDetalleUseCase,
    AnularVentaCompletaUseCase,
  ],
  exports: [VENTA_DETALLE_REPOSITORY],
})
export class VentasDetallesModule {}