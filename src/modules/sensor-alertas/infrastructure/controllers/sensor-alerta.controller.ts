import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";

import { CreateSensorAlertaDto } from "../dto/create-sensor-alerta.dto";

import { SensorAlerta } from "../../domain/entities/sensor-alerta";

import { CrearSensorAlertaUseCase } from "../../application/use-cases/crear-sensor-alerta.use-case";
import { ObtenerSensorAlertasUseCase } from "../../application/use-cases/obtener-sensor-alertas.use-case";
import { ObtenerSensorAlertaUseCase } from "../../application/use-cases/obtener-sensor-alerta.use-case";
import { ObtenerAlertasPorSensorUseCase } from "../../application/use-cases/obtener-alertas-por-sensor.use-case";
import { EliminarSensorAlertaUseCase } from "../../application/use-cases/eliminar-sensor-alerta.use-case";

@Controller("sensor-alertas")
export class SensorAlertaController {

  constructor(
    private readonly crearSensorAlerta: CrearSensorAlertaUseCase,
    private readonly obtenerSensorAlertas: ObtenerSensorAlertasUseCase,
    private readonly obtenerSensorAlerta: ObtenerSensorAlertaUseCase,
    private readonly obtenerAlertasPorSensor: ObtenerAlertasPorSensorUseCase,
    private readonly eliminarSensorAlerta: EliminarSensorAlertaUseCase,
  ) {}

  @Post()
  crear(@Body() dto: CreateSensorAlertaDto) {

    const alerta = new SensorAlerta({
      sensorId: dto.sensorId,
      valor: dto.valor,
      umbral: dto.umbral,
      tipo: dto.tipo,
      fechaAlerta: dto.fechaAlerta,
      loteId: dto.loteId,
      subLoteId: dto.subLoteId,
    });

    return this.crearSensorAlerta.ejecutar(alerta);

  }

  @Get()
  obtenerTodas() {
    return this.obtenerSensorAlertas.ejecutar();
  }

  @Get(":id")
  obtenerUna(
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.obtenerSensorAlerta.ejecutar(id);
  }

  @Get("sensor/:sensorId")
  obtenerPorSensor(
    @Param("sensorId", ParseIntPipe) sensorId: number,
  ) {
    return this.obtenerAlertasPorSensor.ejecutar(sensorId);
  }

  @Delete(":id")
  eliminar(
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.eliminarSensorAlerta.ejecutar(id);
  }

}
