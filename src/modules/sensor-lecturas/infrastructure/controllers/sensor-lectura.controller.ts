import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";

import { CreateSensorLecturaDto } from "../dto/create-sensor-lectura.dto";

import { SensorLectura } from "../../domain/entities/sensor-lectura";

import { RegistrarLecturaUseCase } from "../../application/use-cases/registrar-lectura.use-case";
import { ObtenerLecturasPorSensorUseCase } from "../../application/use-cases/obtener-lecturas-por-sensor.use-case";
import { ObtenerLecturasPorRangoFechasUseCase } from "../../application/use-cases/obtener-lecturas-por-rango-fechas.use-case";

@Controller("sensor-lecturas")
export class SensorLecturaController {

  constructor(
    private readonly registrarLectura: RegistrarLecturaUseCase,
    private readonly obtenerLecturasPorSensor: ObtenerLecturasPorSensorUseCase,
    private readonly obtenerLecturasPorRangoFechas: ObtenerLecturasPorRangoFechasUseCase,
  ) {}

  @Post()
  registrar(@Body() dto: CreateSensorLecturaDto) {

    const lectura = new SensorLectura({
      sensorId: dto.sensorId,
      valor: dto.valor,
      fechaLectura: dto.fechaLectura,
      unidad: dto.unidad,
      observaciones: dto.observaciones,
    });

    return this.registrarLectura.ejecutar(lectura);

  }

  @Get("sensor/:sensorId")
  obtenerPorSensor(
    @Param("sensorId", ParseIntPipe) sensorId: number,
  ) {
    return this.obtenerLecturasPorSensor.ejecutar(sensorId);
  }

  @Get("sensor/:sensorId/rango")
  obtenerPorRangoFechas(
    @Param("sensorId", ParseIntPipe) sensorId: number,
    @Query("desde") desde: string,
    @Query("hasta") hasta: string,
  ) {
    return this.obtenerLecturasPorRangoFechas.ejecutar(
      sensorId,
      new Date(desde),
      new Date(hasta),
    );
  }

}
