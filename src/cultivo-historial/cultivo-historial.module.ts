import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CultivoHistorialOrmEntity } from "./infrastructure/database/cultivo-historial.orm.entity";

import { CultivoHistorialController } from "./infrastructure/controllers/cultivo-historial.controller";

import { CultivoHistorialRepository } from "./domain/ports/cultivo-historial.repository";
import { CultivoHistorialPostgresRepository } from "./infrastructure/repositories/cultivo-historial-postgres.repository";

import { CrearCultivoHistorialUseCase } from "./application/use-cases/crear-cultivo-historial.use-case";
import { ObtenerCultivosHistorialUseCase } from "./application/use-cases/obtener-cultivos-historial.use-case";
import { ObtenerCultivoHistorialUseCase } from "./application/use-cases/obtener-cultivo-historial.use-case";
import { ActualizarCultivoHistorialUseCase } from "./application/use-cases/actualizar-cultivo-historial.use-case";
import { EliminarCultivoHistorialUseCase } from "./application/use-cases/eliminar-cultivo-historial.use-case";

@Module({

    imports: [

        TypeOrmModule.forFeature([

            CultivoHistorialOrmEntity,

        ]),

    ],

    controllers: [

        CultivoHistorialController,

    ],

    providers: [

        CrearCultivoHistorialUseCase,
        ObtenerCultivosHistorialUseCase,
        ObtenerCultivoHistorialUseCase,
        ActualizarCultivoHistorialUseCase,
        EliminarCultivoHistorialUseCase,

        {
            provide: CultivoHistorialRepository,
            useClass: CultivoHistorialPostgresRepository,
        },

    ],

})
export class CultivoHistorialModule {}