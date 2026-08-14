import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CrearLoteProduccionUseCase } from '../../../application/use-cases/crear-lote-produccion.use-case';
import { ListarLotesProduccionUseCase } from '../../../application/use-cases/listar-lotes-produccion.use-case';
import { ObtenerLoteProduccionUseCase } from '../../../application/use-cases/obtener-lote-produccion.use-case';
import { ActualizarLoteProduccionUseCase } from '../../../application/use-cases/actualizar-lote-produccion.use-case';
import { AjustarStockLoteUseCase } from '../../../application/use-cases/ajustar-stock-lote.use-case';
import { EliminarLoteProduccionUseCase } from '../../../application/use-cases/eliminar-lote-produccion.use-case';
import { CrearLoteProduccionDto } from '../dto/crear-lote-produccion.dto';
import { ActualizarLoteProduccionDto } from '../dto/actualizar-lote-produccion.dto';
import { AjustarStockDto } from '../dto/ajustar-stock.dto';

@Controller('lotes-produccion')
export class LoteProduccionController {
  constructor(
    private readonly crear: CrearLoteProduccionUseCase,
    private readonly listar: ListarLotesProduccionUseCase,
    private readonly obtener: ObtenerLoteProduccionUseCase,
    private readonly actualizar: ActualizarLoteProduccionUseCase,
    private readonly ajustarStock: AjustarStockLoteUseCase,
    private readonly eliminar: EliminarLoteProduccionUseCase,
  ) {}

  @Post()
  crearLote(@Body() dto: CrearLoteProduccionDto) {
    return this.crear.ejecutar(dto);
  }

  @Get()
  listarLotes(@Query('conStock') conStock?: string) {
    return this.listar.ejecutar(conStock === 'true');
  }

  @Get(':id')
  obtenerLote(@Param('id', ParseIntPipe) id: number) {
    return this.obtener.ejecutar(id);
  }

  @Put(':id')
  actualizarLote(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarLoteProduccionDto,
  ) {
    return this.actualizar.ejecutar(id, dto);
  }

  @Patch(':id/stock')
  ajustarStockLote(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AjustarStockDto,
  ) {
    return this.ajustarStock.ejecutar(id, dto);
  }

  @Delete(':id')
  eliminarLote(@Param('id', ParseIntPipe) id: number) {
    return this.eliminar.ejecutar(id);
  }
}
