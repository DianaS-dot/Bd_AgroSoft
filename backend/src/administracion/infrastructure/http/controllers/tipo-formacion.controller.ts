import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateTipoFormacionUseCase } from '../../../application/use-cases/create-tipo-formacion.use-case';
import { GetTipoFormacionUseCase } from '../../../application/use-cases/get-tipo-formacion.use-case';
import { CreateTipoFormacionDto } from '../dto/create-tipo-formacion.dto';

@Controller('tipos-formacion')
export class TipoFormacionController {
  constructor(
    private readonly createTipoFormacionUseCase: CreateTipoFormacionUseCase,
    private readonly getTipoFormacionUseCase: GetTipoFormacionUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateTipoFormacionDto) {
    return this.createTipoFormacionUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.getTipoFormacionUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getTipoFormacionUseCase.execute(id);
  }
}