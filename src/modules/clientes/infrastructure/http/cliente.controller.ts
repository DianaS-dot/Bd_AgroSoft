import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CrearClienteUseCase } from '../../application/use-cases/crear-cliente.use-case';
import { ListarClientesUseCase } from '../../application/use-cases/listar-clientes.use-case';
import { ObtenerClienteUseCase } from '../../application/use-cases/obtener-cliente.use-case';
import { ActualizarClienteUseCase } from '../../application/use-cases/actualizar-cliente.use-case';
import { EliminarClienteUseCase } from '../../application/use-cases/eliminar-cliente.use-case';
import { CrearClienteDto } from '../../application/dto/crear-cliente.dto';
import { ActualizarClienteDto } from '../../application/dto/actualizar-cliente.dto';

@Controller('clientes')
export class ClienteController {
  constructor(
    private readonly crear: CrearClienteUseCase,
    private readonly listar: ListarClientesUseCase,
    private readonly obtener: ObtenerClienteUseCase,
    private readonly actualizar: ActualizarClienteUseCase,
    private readonly eliminar: EliminarClienteUseCase,
  ) {}

  @Post()
  crearCliente(@Body() dto: CrearClienteDto) {
    return this.crear.ejecutar(dto);
  }

  @Get()
  listarClientes() {
    return this.listar.ejecutar();
  }

  @Get(':id')
  obtenerCliente(@Param('id', ParseIntPipe) id: number) {
    return this.obtener.ejecutar(id);
  }

  @Put(':id')
  actualizarCliente(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarClienteDto) {
    return this.actualizar.ejecutar(id, dto);
  }

  @Delete(':id')
  eliminarCliente(@Param('id', ParseIntPipe) id: number) {
    return this.eliminar.ejecutar(id);
  }
}