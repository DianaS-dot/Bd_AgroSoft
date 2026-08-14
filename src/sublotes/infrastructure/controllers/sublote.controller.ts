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

import { CreateSubloteDto } from "../dto/create-sublote.dto";
import { UpdateSubloteDto } from "../dto/update-sublote.dto";

import { Sublote } from "../../domain/entities/sublote";

import { CrearSubloteUseCase } from "../../application/use-cases/crear-sublote.use-case";
import { ObtenerSublotesUseCase } from "../../application/use-cases/obtener-sublotes.use-case";
import { ObtenerSubloteUseCase } from "../../application/use-cases/obtener-sublote.use-case";
import { ActualizarSubloteUseCase } from "../../application/use-cases/actualizar-sublote.use-case";
import { EliminarSubloteUseCase } from "../../application/use-cases/eliminar-sublote.use-case";

@Controller("sublotes")
export class SubloteController {

    constructor(

        private readonly crearSublote:CrearSubloteUseCase,
        private readonly obtenerSublotes:ObtenerSublotesUseCase,
        private readonly obtenerSublote:ObtenerSubloteUseCase,
        private readonly actualizarSublote:ActualizarSubloteUseCase,
        private readonly eliminarSublote:EliminarSubloteUseCase,

    ){}

    @Post()
    crear(@Body() dto:CreateSubloteDto){

        return this.crearSublote.ejecutar(new Sublote(dto));

    }

    @Get()
    obtenerTodos(){

        return this.obtenerSublotes.ejecutar();

    }

    @Get(":id")
    obtenerUno(
        @Param("id",ParseIntPipe) id:number,
    ){

        return this.obtenerSublote.ejecutar(id);

    }

    @Put(":id")
    actualizar(

        @Param("id",ParseIntPipe) id:number,

        @Body() dto:UpdateSubloteDto,

    ){

        return this.actualizarSublote.ejecutar(

            new Sublote({

                id,
                ...dto,

            })

        );

    }

    @Delete(":id")
    eliminar(
        @Param("id",ParseIntPipe) id:number,
    ){

        return this.eliminarSublote.ejecutar(id);

    }

}