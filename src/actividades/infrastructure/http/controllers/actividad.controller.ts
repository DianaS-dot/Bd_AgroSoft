import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { CreateActividadUseCase } from '../../../application/use-cases/create-actividad.use-case';
import { GetActividadUseCase } from '../../../application/use-cases/get-actividad.use-case';
import { SaveActividadUseCase } from '../../../application/use-cases/save-actividad.use-case';
import { DeleteActividadUseCase } from '../../../application/use-cases/delete-actividad.use-case';
import { CreateActividadDto } from '../dto/create-actividad.dto';
import { SaveActividadDto } from '../dto/save-actividad.dto';

@Controller('actividades')
export class ActividadController {
  constructor(
    private readonly createActividadUseCase: CreateActividadUseCase,
    private readonly getActividadUseCase: GetActividadUseCase,
    private readonly saveActividadUseCase: SaveActividadUseCase,
    private readonly deleteActividadUseCase: DeleteActividadUseCase,
  ) {}

  @Post()
  async create(@Body() createActividadDto: CreateActividadDto) {
    console.log('POST /actividades - Datos recibidos:', createActividadDto);
    const actividad =
      await this.createActividadUseCase.execute(createActividadDto);
    console.log('Actividad creada:', actividad.toPrimitives());
    return actividad.toPrimitives();
  }

  @Get()
  async findAll() {
    const actividades = await this.getActividadUseCase.findAll();
    return actividades.map((actividad) => actividad.toPrimitives());
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const actividad = await this.getActividadUseCase.findById(id);
    return actividad.toPrimitives();
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() saveActividadDto: SaveActividadDto,
  ) {
    const actividad = await this.saveActividadUseCase.execute(
      id,
      saveActividadDto,
    );
    if (!actividad) {
      throw new NotFoundException(`Actividad con id ${id} no encontrada`);
    }
    return actividad.toPrimitives();
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.deleteActividadUseCase.execute(id);
    if (!deleted) {
      throw new NotFoundException(`Actividad con id ${id} no encontrada`);
    }
    return { deleted };
  }
}
