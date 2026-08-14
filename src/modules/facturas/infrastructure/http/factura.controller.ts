import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CrearFacturaUseCase } from '../../application/use-cases/crear-factura.use-case';
import { ListarFacturasUseCase } from '../../application/use-cases/listar-facturas.use-case';
import { ObtenerFacturaUseCase } from '../../application/use-cases/obtener-factura.use-case';
import { ObtenerFacturaPorVentaUseCase } from '../../application/use-cases/obtener-factura-por-venta.use-case';
import { ActualizarFacturaUseCase } from '../../application/use-cases/actualizar-factura.use-case';
import { EliminarFacturaUseCase } from '../../application/use-cases/eliminar-factura.use-case';
import { CrearFacturaDto } from '../../application/dto/crear-factura.dto';
import { ActualizarFacturaDto } from '../../application/dto/actualizar-factura.dto';

@Controller('facturas')
export class FacturaController {
  constructor(
    private readonly crear: CrearFacturaUseCase,
    private readonly listar: ListarFacturasUseCase,
    private readonly obtener: ObtenerFacturaUseCase,
    private readonly obtenerPorVenta: ObtenerFacturaPorVentaUseCase,
    private readonly actualizar: ActualizarFacturaUseCase,
    private readonly eliminar: EliminarFacturaUseCase,
  ) {}

  @Post()
  crearFactura(@Body() dto: CrearFacturaDto) {
    return this.crear.ejecutar(dto);
  }

  @Get()
  listarFacturas() {
    return this.listar.ejecutar();
  }

  @Get(':id')
  obtenerFactura(@Param('id', ParseIntPipe) id: number) {
    return this.obtener.ejecutar(id);
  }

  @Get('venta/:ventaId')
  obtenerPorVentaId(@Param('ventaId', ParseIntPipe) ventaId: number) {
    return this.obtenerPorVenta.ejecutar(ventaId);
  }

  @Put(':id')
  actualizarFactura(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarFacturaDto) {
    return this.actualizar.ejecutar(id, dto);
  }

  @Delete(':id')
  eliminarFactura(@Param('id', ParseIntPipe) id: number) {
    return this.eliminar.ejecutar(id);
  }
}