import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SaveTelegramFormEstadoUseCase } from '../../../application/use-cases/save-telegram-form-estado.use-case';
import { GetTelegramFormEstadoUseCase } from '../../../application/use-cases/get-telegram-form-estado.use-case';
import { SaveTelegramFormEstadoDto } from '../dto/save-telegram-form-estado.dto';

@Controller('telegram-form-estado')
export class TelegramFormEstadoController {
  constructor(
    private readonly saveTelegramFormEstadoUseCase: SaveTelegramFormEstadoUseCase,
    private readonly getTelegramFormEstadoUseCase: GetTelegramFormEstadoUseCase,
  ) {}

  @Post()
  save(@Body() dto: SaveTelegramFormEstadoDto) {
    return this.saveTelegramFormEstadoUseCase.execute({
      ...dto,
      userId: BigInt(dto.userId),
    });
  }

  @Get(':userId')
  findByUserId(@Param('userId') userId: string) {
    return this.getTelegramFormEstadoUseCase.execute(BigInt(userId));
  }
}