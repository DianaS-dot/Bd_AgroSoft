import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaOrmEntity } from './infrastructure/persistence/factura.orm-entity';
import { FacturaTypeOrmRepository } from './infrastructure/persistence/factura-typeorm.repository';
import { FACTURA_REPOSITORY } from './domain/ports/factura.repository.port';
import { FacturaController } from './infrastructure/http/controllers/factura.controller';
import { CrearFacturaUseCase } from './application/use-cases/crear-factura.use-case';
import { ListarFacturasUseCase } from './application/use-cases/listar-facturas.use-case';
import { ObtenerFacturaUseCase } from './application/use-cases/obtener-factura.use-case';
import { ObtenerFacturaPorVentaUseCase } from './application/use-cases/obtener-factura-por-venta.use-case';
import { ActualizarFacturaUseCase } from './application/use-cases/actualizar-factura.use-case';
import { EliminarFacturaUseCase } from './application/use-cases/eliminar-factura.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([FacturaOrmEntity])],
  controllers: [FacturaController],
  providers: [
    { provide: FACTURA_REPOSITORY, useClass: FacturaTypeOrmRepository },
    CrearFacturaUseCase,
    ListarFacturasUseCase,
    ObtenerFacturaUseCase,
    ObtenerFacturaPorVentaUseCase,
    ActualizarFacturaUseCase,
    EliminarFacturaUseCase,
  ],
  exports: [FACTURA_REPOSITORY],
})
export class FacturasModule {}