import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CrearProductoAgroUseCase } from '../../application/use-cases/crear-producto-agro.use-case';
import { ListarProductosAgroUseCase } from '../../application/use-cases/listar-productos-agro.use-case';
import { ObtenerProductoAgroUseCase } from '../../application/use-cases/obtener-producto-agro.use-case';
import { ActualizarProductoAgroUseCase } from '../../application/use-cases/actualizar-producto-agro.use-case';
import { EliminarProductoAgroUseCase } from '../../application/use-cases/eliminar-producto-agro.use-case';
import { CrearProductoAgroDto } from '../../application/dto/crear-producto-agro.dto';
import { ActualizarProductoAgroDto } from '../../application/dto/actualizar-producto-agro.dto';

@Controller('productos-agro')
export class ProductoAgroController {
  constructor(
    private readonly crear: CrearProductoAgroUseCase,
    private readonly listar: ListarProductosAgroUseCase,
    private readonly obtener: ObtenerProductoAgroUseCase,
    private readonly actualizar: ActualizarProductoAgroUseCase,
    private readonly eliminar: EliminarProductoAgroUseCase,
  ) {}

  @Post()
  crearProducto(@Body() dto: CrearProductoAgroDto) {
    return this.crear.ejecutar(dto);
  }

  @Get()
  listarProductos() {
    return this.listar.ejecutar();
  }

  @Get(':id')
  obtenerProducto(@Param('id', ParseIntPipe) id: number) {
    return this.obtener.ejecutar(id);
  }

  @Put(':id')
  actualizarProducto(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarProductoAgroDto) {
    return this.actualizar.ejecutar(id, dto);
  }

  @Delete(':id')
  eliminarProducto(@Param('id', ParseIntPipe) id: number) {
    return this.eliminar.ejecutar(id);
  }
}