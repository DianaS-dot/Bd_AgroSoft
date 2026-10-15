import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, NotFoundException } from '@nestjs/common';
import { CreateActividadServicioUseCase } from '../../../application/use-cases/create-actividad-servicio.use-case';
import { GetActividadServicioUseCase } from '../../../application/use-cases/get-actividad-servicio.use-case';
import { SaveActividadServicioUseCase } from '../../../application/use-cases/save-actividad-servicio.use-case';
import { DeleteActividadServicioUseCase } from '../../../application/use-cases/delete-actividad-servicio.use-case';
import { CreateActividadServicioDto } from '../dto/create-actividad-servicio.dto';
import { SaveActividadServicioDto } from '../dto/save-actividad-servicio.dto';

@Controller('actividades-servicios')
export class ActividadesServiciosController {
  constructor(
    private readonly createUseCase: CreateActividadServicioUseCase,
    private readonly getUseCase: GetActividadServicioUseCase,
    private readonly saveUseCase: SaveActividadServicioUseCase,
    private readonly deleteUseCase: DeleteActividadServicioUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateActividadServicioDto) {
    const result = await this.createUseCase.execute(dto);
    return result.toPrimitives();
  }

  @Get()
  async findAll() {
    const results = await this.getUseCase.findAll();
    return results.map((r) => r.toPrimitives());
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.getUseCase.findById(id);
    if (!result) {
      throw new NotFoundException(`Servicio de actividad con id ${id} no encontrado`);
    }
    return result.toPrimitives();
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: SaveActividadServicioDto) {
    const result = await this.saveUseCase.execute(id, dto);
    if (!result) {
      throw new NotFoundException(`Servicio de actividad con id ${id} no encontrado`);
    }
    return result.toPrimitives();
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.deleteUseCase.execute(id);
    if (!deleted) {
      throw new NotFoundException(`Servicio de actividad con id ${id} no encontrado`);
    }
    return { deleted };
  }
}
