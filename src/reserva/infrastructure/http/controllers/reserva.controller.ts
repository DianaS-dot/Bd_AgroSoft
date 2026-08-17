import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateReservaUseCase } from '../../../application/use-cases/create-reserva.use-case';
import { GetReservaUseCase } from '../../../application/use-cases/get-reserva.use-case';
import { CreateReservaDto } from './dto/create-reserva.dto';

@Controller('reservas')
export class ReservaController {
  constructor(
    private readonly createReservaUseCase: CreateReservaUseCase,
    private readonly getReservaUseCase: GetReservaUseCase,
  ) {}

  @Post()
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.createReservaUseCase.execute(createReservaDto);
  }

  @Get()
  findAll() {
    return this.getReservaUseCase.executeAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getReservaUseCase.execute(id);
  }
}
