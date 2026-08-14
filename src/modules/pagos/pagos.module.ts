import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagoOrmEntity } from './infrastructure/persistence/pago.orm-entity';
import { PagoTypeOrmRepository } from './infrastructure/persistence/pago-typeorm.repository';
import { PAGO_REPOSITORY } from './domain/ports/pago.repository.port';
import { PagoController } from './infrastructure/http/pago.controller';
import { CrearPagoUseCase } from './application/use-cases/crear-pago.use-case';
import { ListarPagosVentaUseCase } from './application/use-cases/listar-pagos-venta.use-case';
import { ObtenerSaldoVentaUseCase } from './application/use-cases/obtener-saldo-venta.use-case';
import { EliminarPagoUseCase } from './application/use-cases/eliminar-pago.use-case';
import { VentasModule } from '../ventas/ventas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PagoOrmEntity]),
    VentasModule, // provee VENTA_REPOSITORY para validar saldo/estado de la venta
  ],
  controllers: [PagoController],
  providers: [
    { provide: PAGO_REPOSITORY, useClass: PagoTypeOrmRepository },
    CrearPagoUseCase,
    ListarPagosVentaUseCase,
    ObtenerSaldoVentaUseCase,
    EliminarPagoUseCase,
  ],
  exports: [PAGO_REPOSITORY],
})
export class PagosModule {}