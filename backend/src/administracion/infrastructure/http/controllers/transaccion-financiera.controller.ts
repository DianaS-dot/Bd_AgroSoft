import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateTransaccionFinancieraUseCase } from '../../../application/use-cases/create-transaccion-financiera.use-case';
import { GetTransaccionFinancieraUseCase } from '../../../application/use-cases/get-transaccion-financiera.use-case';
import { CreateTransaccionFinancieraDto } from '../dto/create-transaccion-financiera.dto';

@Controller('transacciones-financieras')
export class TransaccionFinancieraController {
  constructor(
    private readonly createTransaccionFinancieraUseCase: CreateTransaccionFinancieraUseCase,
    private readonly getTransaccionFinancieraUseCase: GetTransaccionFinancieraUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateTransaccionFinancieraDto) {
    return this.createTransaccionFinancieraUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.getTransaccionFinancieraUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getTransaccionFinancieraUseCase.execute(id);
  }
}