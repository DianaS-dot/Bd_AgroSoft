import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateActividadInsumoUsoUseCase } from '../../../application/use-cases/create-actividad-insumo-uso.use-case';
import { GetActividadInsumoUsoUseCase } from '../../../application/use-cases/get-actividad-insumo-uso.use-case';
import { CreateActividadInsumoUsoDto } from './dto/create-actividad-insumo-uso.dto';

@Controller('actividades-insumos-uso')
export class ActividadInsumoUsoController {
  constructor(
    private readonly createActividadInsumoUsoUseCase: CreateActividadInsumoUsoUseCase,
    private readonly getActividadInsumoUsoUseCase: GetActividadInsumoUsoUseCase,
  ) {}

  @Post()
  create(@Body() createActividadInsumoUsoDto: CreateActividadInsumoUsoDto) {
    return this.createActividadInsumoUsoUseCase.execute(createActividadInsumoUsoDto);
  }

  @Get()
  findAll() {
    return this.getActividadInsumoUsoUseCase.executeAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getActividadInsumoUsoUseCase.execute(id);
  }
}
