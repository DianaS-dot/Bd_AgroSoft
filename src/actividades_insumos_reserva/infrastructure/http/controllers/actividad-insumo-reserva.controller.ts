import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateActividadInsumoReservaUseCase } from '../../../application/use-cases/create-actividad-insumo-reserva.use-case';
import { GetActividadInsumoReservaUseCase } from '../../../application/use-cases/get-actividad-insumo-reserva.use-case';
import { CreateActividadInsumoReservaDto } from './dto/create-actividad-insumo-reserva.dto';

@Controller('actividades-insumos-reserva')
export class ActividadInsumoReservaController {
  constructor(
    private readonly createActividadInsumoReservaUseCase: CreateActividadInsumoReservaUseCase,
    private readonly getActividadInsumoReservaUseCase: GetActividadInsumoReservaUseCase,
  ) {}

  @Post()
  create(@Body() createActividadInsumoReservaDto: CreateActividadInsumoReservaDto) {
    return this.createActividadInsumoReservaUseCase.execute(createActividadInsumoReservaDto);
  }

  @Get()
  findAll() {
    return this.getActividadInsumoReservaUseCase.executeAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getActividadInsumoReservaUseCase.execute(id);
  }
}
