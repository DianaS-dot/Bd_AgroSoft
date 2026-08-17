import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateAlmacenUseCase } from '../../../application/use-cases/create-almacen.use-case';
import { GetAlmacenUseCase } from '../../../application/use-cases/get-almacen.use-case';
import { CreateAlmacenDto } from './dto/create-almacen.dto';

@Controller('almacenes')
export class AlmacenController {
  constructor(
    private readonly createAlmacenUseCase: CreateAlmacenUseCase,
    private readonly getAlmacenUseCase: GetAlmacenUseCase,
  ) {}

  @Post()
  create(@Body() createAlmacenDto: CreateAlmacenDto) {
    return this.createAlmacenUseCase.execute(createAlmacenDto);
  }

  @Get()
  findAll() {
    return this.getAlmacenUseCase.executeAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getAlmacenUseCase.execute(id);
  }
}
