import { Body, Controller, Get, Post, Query, ParseIntPipe } from '@nestjs/common';
import { CrearAjusteManualUseCase } from '../../application/use-cases/crear-ajuste-manual.use-case';
import { ListarMovimientosUseCase } from '../../application/use-cases/listar-movimientos.use-case';
import { CrearAjusteManualDto } from '../../application/dto/crear-ajuste-manual.dto';

@Controller('movimientos-produccion')
export class MovimientoProduccionController {
  constructor(
    private readonly crearAjuste: CrearAjusteManualUseCase,
    private readonly listar: ListarMovimientosUseCase,
  ) {}

  @Post('ajuste-manual')
  crearAjusteManual(@Body() dto: CrearAjusteManualDto) {
    return this.crearAjuste.ejecutar(dto);
  }

  @Get()
  listarMovimientos(
    @Query('loteProduccionId') loteProduccionId?: string,
    @Query('ventaId') ventaId?: string,
  ) {
    return this.listar.ejecutar({
      loteProduccionId: loteProduccionId ? Number(loteProduccionId) : undefined,
      ventaId: ventaId ? Number(ventaId) : undefined,
    });
  }
}