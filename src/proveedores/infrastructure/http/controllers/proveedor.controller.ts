import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateProveedorUseCase } from '../../../application/use-cases/create-proveedor.use-case';
import { GetProveedorUseCase } from '../../../application/use-cases/get-proveedor.use-case';
import { CreateProveedorDto } from './dto/create-proveedor.dto';

@Controller('proveedores')
export class ProveedorController {
  constructor(
    private readonly createProveedorUseCase: CreateProveedorUseCase,
    private readonly getProveedorUseCase: GetProveedorUseCase,
  ) {}

  @Post()
  create(@Body() createProveedorDto: CreateProveedorDto) {
    return this.createProveedorUseCase.execute(createProveedorDto);
  }

  @Get()
  findAll() {
    return this.getProveedorUseCase.executeAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getProveedorUseCase.execute(id);
  }
}
