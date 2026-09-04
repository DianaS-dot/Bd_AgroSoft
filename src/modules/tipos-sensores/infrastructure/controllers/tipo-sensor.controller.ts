import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { CreateTipoSensorDto } from '../dto/create-tipo-sensor.dto';
import { UpdateTipoSensorDto } from '../dto/update-tipo-sensor.dto';

import { TipoSensor } from '../../domain/entities/tipo-sensor';

import { CrearTipoSensorUseCase } from '../../application/use-cases/crear-tipo-sensor.use-case';
import { ObtenerTiposSensoresUseCase } from '../../application/use-cases/obtener-tipos-sensores.use-case';
import { ObtenerTipoSensorUseCase } from '../../application/use-cases/obtener-tipo-sensor.use-case';
import { ActualizarTipoSensorUseCase } from '../../application/use-cases/actualizar-tipo-sensor.use-case';
import { EliminarTipoSensorUseCase } from '../../application/use-cases/eliminar-tipo-sensor.use-case';

@Controller('tipos-sensores')
export class TipoSensorController {
  constructor(
    private readonly crearTipoSensor: CrearTipoSensorUseCase,
    private readonly obtenerTiposSensores: ObtenerTiposSensoresUseCase,
    private readonly obtenerTipoSensor: ObtenerTipoSensorUseCase,
    private readonly actualizarTipoSensor: ActualizarTipoSensorUseCase,
    private readonly eliminarTipoSensor: EliminarTipoSensorUseCase,
  ) {}

  @Post()
  crear(@Body() dto: CreateTipoSensorDto) {
    const tipoSensor = new TipoSensor({
      nombre: dto.nombre,
      unidad: dto.unidad,
      decimales: dto.decimales,
      descripcion: dto.descripcion,
      imagen: dto.imagen,
      ttlMinutos: dto.ttlMinutos,
    });

    return this.crearTipoSensor.ejecutar(tipoSensor);
  }

  @Get()
  obtenerTodos() {
    return this.obtenerTiposSensores.ejecutar();
  }

  @Get(':id')
  obtenerUno(@Param('id', ParseIntPipe) id: number) {
    return this.obtenerTipoSensor.ejecutar(id);
  }

  @Put(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTipoSensorDto,
  ) {
    const tipoSensor = new TipoSensor({
      id,
      nombre: dto.nombre!,
      unidad: dto.unidad!,
      decimales: dto.decimales!,
      descripcion: dto.descripcion!,
      imagen: dto.imagen!,
      ttlMinutos: dto.ttlMinutos!,
    });

    return this.actualizarTipoSensor.ejecutar(tipoSensor);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.eliminarTipoSensor.ejecutar(id);
  }
}
