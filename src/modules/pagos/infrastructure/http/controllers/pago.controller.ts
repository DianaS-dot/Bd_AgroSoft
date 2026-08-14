import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CrearPagoUseCase } from '../../../application/use-cases/crear-pago.use-case';
import { ListarPagosVentaUseCase } from '../../../application/use-cases/listar-pagos-venta.use-case';
import { ObtenerSaldoVentaUseCase } from '../../../application/use-cases/obtener-saldo-venta.use-case';
import { EliminarPagoUseCase } from '../../../application/use-cases/eliminar-pago.use-case';
import { CrearPagoDto } from '../dto/crear-pago.dto';

@Controller('pagos')
export class PagoController {
  constructor(
    private readonly crear: CrearPagoUseCase,
    private readonly listar: ListarPagosVentaUseCase,
    private readonly obtenerSaldo: ObtenerSaldoVentaUseCase,
    private readonly eliminar: EliminarPagoUseCase,
  ) {}

  @Post()
  crearPago(@Body() dto: CrearPagoDto) {
    return this.crear.ejecutar(dto);
  }

  @Get()
  listarPorVenta(@Query('ventaId', ParseIntPipe) ventaId: number) {
    return this.listar.ejecutar(ventaId);
  }

  @Get('saldo/:ventaId')
  obtenerSaldoVenta(@Param('ventaId', ParseIntPipe) ventaId: number) {
    return this.obtenerSaldo.ejecutar(ventaId);
  }

  @Delete(':id')
  eliminarPago(@Param('id', ParseIntPipe) id: number) {
    return this.eliminar.ejecutar(id);
  }
}