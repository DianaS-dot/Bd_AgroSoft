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

import { CreateLoteDto } from "../dto/create-lote.dto";
import { UpdateLoteDto } from "../dto/update-lote.dto";

import { Lote } from "../../../domain/entities/lote";

import { CrearLoteUseCase } from "../../../application/use-cases/crear-lote.use-case";
import { ObtenerLotesUseCase } from "../../../application/use-cases/obtener-lotes.use-case";
import { ObtenerLoteUseCase } from "../../../application/use-cases/obtener-lote.use-case";
import { ActualizarLoteUseCase } from "../../../application/use-cases/actualizar-lote.use-case";
import { EliminarLoteUseCase } from "../../../application/use-cases/eliminar-lote.use-case";

@Controller("lotes")
export class LoteController {

  constructor(
    private readonly crearLote: CrearLoteUseCase,
    private readonly obtenerLotes: ObtenerLotesUseCase,
    private readonly obtenerLote: ObtenerLoteUseCase,
    private readonly actualizarLote: ActualizarLoteUseCase,
    private readonly eliminarLote: EliminarLoteUseCase,
  ) {}

  @Post()
  crear(@Body() dto: CreateLoteDto) {

    return this.crearLote.ejecutar(new Lote(dto));

  }

  @Get()
  obtenerTodos() {
    return this.obtenerLotes.ejecutar();
  }

  @Get(":id")
  obtenerUno(
    @Param("id", ParseIntPipe) id:number,
  ) {
    return this.obtenerLote.ejecutar(id);
  }

  @Put(":id")
  actualizar(
    @Param("id", ParseIntPipe) id:number,
    @Body() dto:UpdateLoteDto,
  ) {

    return this.actualizarLote.ejecutar(

      new Lote({
        id,
        ...dto,
      })

    );

  }

  @Delete(":id")
  eliminar(
    @Param("id", ParseIntPipe) id:number,
  ) {

    return this.eliminarLote.ejecutar(id);

  }

}