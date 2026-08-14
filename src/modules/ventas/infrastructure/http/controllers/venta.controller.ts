import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CrearVentaUseCase } from '../../../application/use-cases/crear-venta.use-case';
import { ListarVentasUseCase } from '../../../application/use-cases/listar-ventas.use-case';
import { ObtenerVentaUseCase } from '../../../application/use-cases/obtener-venta.use-case';
import { AnularVentaUseCase } from '../../../application/use-cases/anular-venta.use-case';
import { CrearVentaDto } from '../dto/crear-venta.dto';
import { AnularVentaDto } from '../dto/anular-venta.dto';

@Controller('ventas')
export class VentaController {
  constructor(
    private readonly crear: CrearVentaUseCase,
    private readonly listar: ListarVentasUseCase,
    private readonly obtener: ObtenerVentaUseCase,
    private readonly anular: AnularVentaUseCase,
  ) {}

  @Post()
  crearVenta(@Body() dto: CrearVentaDto) {
    return this.crear.ejecutar(dto);
  }

  @Get()
  listarVentas(@Query('clienteId') clienteId?: string) {
    return this.listar.ejecutar(clienteId ? Number(clienteId) : undefined);
  }

  @Get(':id')
  obtenerVenta(@Param('id', ParseIntPipe) id: number) {
    return this.obtener.ejecutar(id);
  }

  @Patch(':id/anular')
  anularVenta(@Param('id', ParseIntPipe) id: number, @Body() dto: AnularVentaDto) {
    return this.anular.ejecutar(id, dto);
  }
}