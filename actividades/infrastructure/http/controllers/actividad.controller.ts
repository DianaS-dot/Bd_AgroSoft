import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CrearActividadUseCase } from '../../../application/use-cases/crear-actividad.use-case';
import { ObtenerActividadUseCase } from '../../../application/use-cases/obtener-actividad.use-case';
import { ActualizarActividadUseCase } from '../../../application/use-cases/actualizar-actividad.use-case';
import { EliminarActividadUseCase } from '../../../application/use-cases/eliminar-actividad.use-case';
import { CreateActividadDto } from '../dto/create-actividad.dto';
import { UpdateActividadDto } from '../dto/update-actividad.dto';
import { ActividadNoEncontradaError } from '../../../domain/errors/actividad-no-encontrada.error';

@Controller('actividades')
export class ActividadController {
  constructor(
    private readonly crearActividadUseCase: CrearActividadUseCase,
    private readonly obtenerActividadUseCase: ObtenerActividadUseCase,
    private readonly actualizarActividadUseCase: ActualizarActividadUseCase,
    private readonly eliminarActividadUseCase: EliminarActividadUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateActividadDto) {
    const actividad = await this.crearActividadUseCase.execute({
      nombre: dto.nombre,
      descripcion: dto.descripcion || '',
      fechaInicio: new Date(dto.fechaInicio),
      fechaFin: new Date(dto.fechaFin),
      estado: dto.estado,
    });
    return this.mapToResponse(actividad);
  }

  @Get()
  async findAll() {
    const actividades = await this.obtenerActividadUseCase.executeAll();
    return actividades.map((act) => this.mapToResponse(act));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const actividad = await this.obtenerActividadUseCase.executeById(id);
      return this.mapToResponse(actividad);
    } catch (error) {
      if (error instanceof ActividadNoEncontradaError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateActividadDto) {
    try {
      const actividad = await this.actualizarActividadUseCase.execute(id, {
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        fechaInicio: dto.fechaInicio ? new Date(dto.fechaInicio) : undefined,
        fechaFin: dto.fechaFin ? new Date(dto.fechaFin) : undefined,
        estado: dto.estado,
      });
      return this.mapToResponse(actividad);
    } catch (error) {
      if (error instanceof ActividadNoEncontradaError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.eliminarActividadUseCase.execute(id);
    } catch (error) {
      if (error instanceof ActividadNoEncontradaError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  private mapToResponse(actividad: any) {
    return {
      id: actividad.id,
      nombre: actividad.nombre,
      descripcion: actividad.descripcion,
      fechaInicio: actividad.fechaInicio,
      fechaFin: actividad.fechaFin,
      estado: actividad.estado,
    };
  }
}
