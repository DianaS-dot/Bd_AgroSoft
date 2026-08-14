import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CrearVentaDetalleUseCase } from '../../application/use-cases/crear-venta-detalle.use-case';
import { ListarDetallesVentaUseCase } from '../../application/use-cases/listar-detalles-venta.use-case';
import { EliminarVentaDetalleUseCase } from '../../application/use-cases/eliminar-venta-detalle.use-case';
import { AnularVentaCompletaUseCase } from '../../application/use-cases/anular-venta-completa.use-case';
import { CrearVentaDetalleDto } from '../../application/dto/crear-venta-detalle.dto';

@Controller('ventas-detalles')
export class VentaDetalleController {
  constructor(
    private readonly crear: CrearVentaDetalleUseCase,
    private readonly listar: ListarDetallesVentaUseCase,
    private readonly eliminar: EliminarVentaDetalleUseCase,
    private readonly anularVentaCompleta: AnularVentaCompletaUseCase,
  ) {}

  @Post()
  crearDetalle(@Body() dto: CrearVentaDetalleDto) {
    return this.crear.ejecutar(dto);
  }

  @Get()
  listarPorVenta(@Query('ventaId', ParseIntPipe) ventaId: number) {
    return this.listar.ejecutar(ventaId);
  }

  @Delete(':id')
  eliminarDetalle(@Param('id', ParseIntPipe) id: number, @Query('usuarioId', ParseIntPipe) usuarioId: number) {
    return this.eliminar.ejecutar(id, usuarioId);
  }

  @Patch('anular-venta/:ventaId')
  anularVenta(@Param('ventaId', ParseIntPipe) ventaId: number, @Body('usuarioId', ParseIntPipe) usuarioId: number) {
    return this.anularVentaCompleta.ejecutar(ventaId, usuarioId);
  }
}