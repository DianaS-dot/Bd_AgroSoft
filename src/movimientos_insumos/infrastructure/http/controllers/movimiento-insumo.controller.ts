import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateMovimientoInsumoUseCase } from '../../../application/use-cases/create-movimiento-insumo.use-case';
import { GetMovimientoInsumoUseCase } from '../../../application/use-cases/get-movimiento-insumo.use-case';
import { CreateMovimientoInsumoDto } from './dto/create-movimiento-insumo.dto';

@Controller('movimientos-insumos')
export class MovimientoInsumoController {
  constructor(
    private readonly createMovimientoInsumoUseCase: CreateMovimientoInsumoUseCase,
    private readonly getMovimientoInsumoUseCase: GetMovimientoInsumoUseCase,
  ) {}

  @Post()
  create(@Body() createMovimientoInsumoDto: CreateMovimientoInsumoDto) {
    return this.createMovimientoInsumoUseCase.execute(createMovimientoInsumoDto);
  }

  @Get()
  findAll() {
    return this.getMovimientoInsumoUseCase.executeAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getMovimientoInsumoUseCase.execute(id);
  }
}
