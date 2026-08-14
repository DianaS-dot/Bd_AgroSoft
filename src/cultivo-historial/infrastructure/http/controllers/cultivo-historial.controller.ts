import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";

import { CreateCultivoHistorialDto } from "../dto/create-cultivo-historial.dto";
import { UpdateCultivoHistorialDto } from "../dto/update-cultivo-historial.dto";

import { CultivoHistorial } from "../../../domain/entities/cultivo-historial";

import { CrearCultivoHistorialUseCase } from "../../../application/use-cases/crear-cultivo-historial.use-case";
import { ObtenerCultivosHistorialUseCase } from "../../../application/use-cases/obtener-cultivos-historial.use-case";
import { ObtenerCultivoHistorialUseCase } from "../../../application/use-cases/obtener-cultivo-historial.use-case";
import { ActualizarCultivoHistorialUseCase } from"../../../application/use-cases/actualizar-cultivo-historial.use-case";
import { EliminarCultivoHistorialUseCase } from "../../../application/use-cases/eliminar-cultivo-historial.use-case";

@Controller("cultivo-historial")
export class CultivoHistorialController {

  constructor(
    private readonly crear: CrearCultivoHistorialUseCase,
    private readonly obtenerTodos: ObtenerCultivosHistorialUseCase,
    private readonly obtenerUno: ObtenerCultivoHistorialUseCase,
    private readonly actualizarUseCase: ActualizarCultivoHistorialUseCase,
    private readonly eliminarUseCase: EliminarCultivoHistorialUseCase,
  ) {}

  @Post()
  crearRegistro(@Body() dto: CreateCultivoHistorialDto) {

    const historial = new CultivoHistorial({

      cultivoId: dto.cultivoId,
      usuarioId: dto.usuarioId,
      motivo: dto.motivo,
      cambios: dto.cambios,

    });

    return this.crear.ejecutar(historial);

  }

  @Get()
  obtener() {

    return this.obtenerTodos.ejecutar();

  }

  @Get(":id")
  obtenerPorId(

    @Param("id", ParseIntPipe)
    id: number,

  ) {

    return this.obtenerUno.ejecutar(id);

  }

  @Put(":id")
  actualizar(

    @Param("id", ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateCultivoHistorialDto,

  ) {

    const historial = new CultivoHistorial({

      id,

      cultivoId: dto.cultivoId!,
      usuarioId: dto.usuarioId!,
      motivo: dto.motivo!,
      cambios: dto.cambios!,

    });

    return this.actualizarUseCase.ejecutar(historial);

  }

  @Delete(":id")
  eliminar(

    @Param("id", ParseIntPipe)
    id: number,

  ) {

    return this.eliminarUseCase.ejecutar(id);

  }

}