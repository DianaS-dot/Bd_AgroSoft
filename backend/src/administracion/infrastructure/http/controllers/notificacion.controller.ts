import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateNotificacionUseCase } from '../../../application/use-cases/create-notificacion.use-case';
import { GetNotificacionUseCase } from '../../../application/use-cases/get-notificacion.use-case';
import { CreateNotificacionDto } from '../dto/create-notificacion.dto';

@Controller('notificaciones')
export class NotificacionController {
  constructor(
    private readonly createNotificacionUseCase: CreateNotificacionUseCase,
    private readonly getNotificacionUseCase: GetNotificacionUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateNotificacionDto) {
    return this.createNotificacionUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.getNotificacionUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getNotificacionUseCase.execute(id);
  }
}